import * as _ from 'lodash';

import { Apoteker, Dokter, Kasir } from '../../database/typeorm/entities';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IObat,
  IPemeriksaan,
  IPemeriksaanResep,
  IPemeriksaanTindakan,
} from './interfaces';
import {
  SavePemeriksaanDto,
  UpdatePemeriksanDto,
  UpdateTagihanPemeriksaanDto,
} from './dtos';

import { ApotekerRepository } from '../apoteker/apoteker.repository';
import { DokterRepository } from '../dokter/dokter.repository';
import { KasirRepository } from '../kasir/kasir.repository';
import { ObatRepository } from '../obat/obat.repository';
import { PemeriksaanRepository } from './pemeriksaan.repository';
import { StatusBayar } from '../../shared/enums';
import { TindakanRepository } from '../tindakan/tindakan.repository';
import { generateNoPemeriksaan } from '../../shared/utils';

@Injectable()
export class PemeriksaanService {
  constructor(
    private pemeriksaanRepository: PemeriksaanRepository,
    private dokterRepository: DokterRepository,
    private apotekerRepository: ApotekerRepository,
    private kasirRepository: KasirRepository,
    private tindakanRepository: TindakanRepository,
    private obatRepository: ObatRepository,
  ) {}

  async savePemeriksaan(user, dto: SavePemeriksaanDto) {
    const { resep, tindakan, ...pemeriksaan } = dto;

    const dokter = await this.dokterRepository.findOneByProperty({
      condition: {
        property: 'nip',
        value: user.nip,
      },
    });

    const dataPemeriksaan: IPemeriksaan = this.createDataPemeriksaan(
      pemeriksaan,
      dokter,
    );

    const dataResep = await this.createDataResep(dataPemeriksaan, resep);

    const dataTindakan = await this.createDataTindakan(
      dataPemeriksaan,
      tindakan,
    );

    const totalTindakan = dataTindakan.reduce(
      (acc, item) => acc + item.subTotal,
      0,
    );
    dataPemeriksaan.total = totalTindakan;

    const savePemeriksaan = await this.pemeriksaanRepository.saveTransaction({
      pemeriksaan: dataPemeriksaan,
      resep: dataResep,
      tindakan: dataTindakan,
    });

    const result = _.omit(savePemeriksaan, ['dokter']);

    return result;
  }

  async findResep(noPemeriksaan: string) {
    const pemeriksaanExists = await this.pemeriksaanRepository.findOneByPk({
      noPemeriksaan,
      include: {
        resep: true,
      },
    });

    if (!pemeriksaanExists) throw new NotFoundException('Data not found');

    const { pemeriksaanResep, ...pemeriksaan } = pemeriksaanExists;

    const resep = pemeriksaanResep.map(({ obat, ...dataResep }) => ({
      ...dataResep,
      idObat: obat.id,
      jenisObat: obat.jenis,
      namaObat: obat.nama,
      hargaObat: obat.harga,
      stokObat: obat.stok,
    }));

    return {
      ...pemeriksaan,
      resep,
    };
  }

  async updateResep(user, dto: UpdatePemeriksanDto, noPemeriksaan: string) {
    const { resep } = dto;

    const pemeriksaanExists = await this.pemeriksaanRepository.findOneByPk({
      noPemeriksaan,
      include: {
        resep: true,
        tindakan: true,
      },
    });

    if (!pemeriksaanExists) throw new NotFoundException('Data not found');

    const apoteker = await this.apotekerRepository.findOneByProperty({
      condition: {
        property: 'nip',
        value: user.nip,
      },
    });

    const dataPemeriksaan = this.createDataPemeriksaan(
      pemeriksaanExists,
      apoteker,
    );

    const dataResep = await this.createDataResep(dataPemeriksaan, resep);

    const { pemeriksaanTindakan } = pemeriksaanExists;

    const totalTagihanObat = dataResep.reduce((total, item) => {
      return total + item.subTotal;
    }, 0);

    const totalTagihanTindakan = pemeriksaanTindakan.reduce((total, item) => {
      return total + item.subTotal;
    }, 0);

    const totalTagihan = totalTagihanTindakan + totalTagihanObat;

    dataPemeriksaan.total = totalTagihan;

    const dataObat = this.createDataObat(dataResep);

    const updatePemeriksaan = await this.pemeriksaanRepository.saveTransaction({
      pemeriksaan: dataPemeriksaan,
      resep: dataResep,
      obat: dataObat,
    });

    const result = _.omit(updatePemeriksaan, [
      'pemeriksaanResep',
      'apoteker',
      'pemeriksaanTindakan',
    ]);

    return result;
  }

  async findTagihanPemeriksaan(noPemeriksaan: string) {
    const pemeriksaan = await this.pemeriksaanRepository.findOneByPk({
      noPemeriksaan,
      include: {
        resep: true,
        tindakan: true,
      },
    });

    if (!pemeriksaan) throw new NotFoundException('Data not found');

    const { pemeriksaanResep, pemeriksaanTindakan, ...dataPemeriksaan } =
      pemeriksaan;

    const dataResep = pemeriksaanResep.map(({ obat, ...resep }) => ({
      ...resep,
      idObat: obat.id,
      namaObat: obat.nama,
      jenisObat: obat.jenis,
      hargaObat: obat.harga,
    }));

    const dataTindakan = pemeriksaanTindakan.map(
      ({ tindakan, ...itemTindakan }) => ({
        ...itemTindakan,
        idTindakan: tindakan.id,
        namTindakan: tindakan.nama,
        hargaTindakan: tindakan.harga,
      }),
    );

    const result = {
      ...dataPemeriksaan,
      resep: dataResep,
      tindakan: dataTindakan,
    };

    return result;
  }

  async updateTagihanPemeriksaanStatus(
    user,
    dto: UpdateTagihanPemeriksaanDto,
    noPemeriksaan: string,
  ) {
    const { statusBayar } = dto;
    const pemeriksaan = await this.pemeriksaanRepository.findOneByPk({
      noPemeriksaan,
    });

    if (!pemeriksaan) throw new NotFoundException('Data not found');

    pemeriksaan.statusBayar = StatusBayar[statusBayar];

    const kasir = await this.kasirRepository.findOneByProperty({
      condition: {
        property: 'nip',
        value: user.nip,
      },
    });

    const dataPemeriksaan = this.createDataPemeriksaan(pemeriksaan, kasir);

    const updateTagihanStatus =
      await this.pemeriksaanRepository.saveTransaction({
        pemeriksaan: dataPemeriksaan,
      });

    return updateTagihanStatus;
  }

  private createDataPemeriksaan(
    pemeriksaan,
    user: Dokter | Kasir | Apoteker,
  ): IPemeriksaan {
    const noPemeriksaan = pemeriksaan.noPemeriksaan || generateNoPemeriksaan();
    const role = user.constructor.name.toLowerCase();

    return {
      ...pemeriksaan,
      [role]: user,
      noPemeriksaan,
      tanggal: new Date().toISOString(),
    };
  }

  private async createDataResep(
    dataPemeriksaan,
    resep,
  ): Promise<IPemeriksaanResep[]> {
    const idObatList = resep.map((obat) => obat.idObat).filter(Boolean);

    if (idObatList.length > 0) {
      const dataObatList = await this.obatRepository.findAllByPk(idObatList);

      if (dataObatList.length !== idObatList.length) {
        throw new BadRequestException('Invalid data obat');
      }
    }

    const pemeriksaanResep = dataPemeriksaan.pemeriksaanResep;

    return resep.map((item) => {
      let subTotal: number = 0;

      if (item.id) {
        const pemeriksaanResepItem = pemeriksaanResep.find(
          (pr) => pr.id === item.id,
        );

        if (!pemeriksaanResepItem) {
          throw new BadRequestException('Invalid data resep');
        }

        const { obat } = pemeriksaanResepItem;

        if (obat.stok < item.jumlah) {
          throw new BadRequestException(`Insufficient stock for ${obat.nama}`);
        }

        subTotal = item.jumlah * obat.harga;
      }

      return {
        pemeriksaan: dataPemeriksaan,
        id: item.id,
        jumlah: item.jumlah,
        keterangan: item.keterangan,
        obat: item.idObat,
        subTotal,
      };
    });
  }

  private async createDataTindakan(
    dataPemeriksaan,
    tindakan,
  ): Promise<IPemeriksaanTindakan[]> {
    const idTindakan = tindakan.map((item) => item.idTindakan);
    const dataTindakan = await this.tindakanRepository.findAllByPk(idTindakan);

    if (dataTindakan.length < tindakan.length) {
      throw new BadRequestException('Invalid data tindakan');
    }

    return tindakan.map((item) => ({
      pemeriksaan: dataPemeriksaan,
      tindakan: item.idTindakan,
      subTotal: dataTindakan.find((t) => item.idTindakan === t.id)?.harga,
    }));
  }

  private createDataObat(resep): IObat[] {
    return resep.map((item) => {
      const { pemeriksaan, ...resep } = item;
      const { pemeriksaanResep } = pemeriksaan;
      const foundResep = pemeriksaanResep.find(
        (resepItem) => resepItem.id === resep.id,
      );

      if (foundResep.jumlah > 0) resep.jumlah = 0;

      foundResep.obat.stok = foundResep.obat.stok - resep.jumlah;

      const data = foundResep.obat;

      return { pemeriksaan, ...data };
    });
  }
}
