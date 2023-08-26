import {
  GudangObat,
  Pemeriksaan,
  PemeriksaanResep,
  PemeriksaanTindakan,
} from '../../database/typeorm/entities';

import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPemeriksaan } from './interfaces';
import { IPemeriksaanResep } from './interfaces/pemeriksaanResep.interface';
import { IPemeriksaanTindakan } from './interfaces/pemeriksaanTindakan.interface';

@Injectable()
export class PemeriksaanRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Pemeriksaan)
    private readonly pemeriksaan: Repository<Pemeriksaan>,
  ) {}

  findOneByPk({
    noPemeriksaan,
    include = { resep: false, tindakan: false },
  }: {
    noPemeriksaan: string;
    include?: {
      resep?: boolean;
      tindakan?: boolean;
    };
  }): Promise<Pemeriksaan> {
    const queryOptions: FindOneOptions<Pemeriksaan> = {
      where: {
        noPemeriksaan,
      },
    };

    const relationsToInclude: string[] = [];

    if (include.resep) {
      relationsToInclude.push('pemeriksaanResep', 'pemeriksaanResep.obat');
    }

    if (include.tindakan) {
      relationsToInclude.push(
        'pemeriksaanTindakan',
        'pemeriksaanTindakan.tindakan',
      );
    }

    if (relationsToInclude.length > 0) {
      queryOptions.relations = relationsToInclude;
    }

    return this.pemeriksaan.findOne(queryOptions);
  }

  async saveTransaction({
    pemeriksaan,
    resep,
    tindakan,
    obat,
  }: {
    pemeriksaan: IPemeriksaan;
    resep?: IPemeriksaanResep[];
    tindakan?: IPemeriksaanTindakan[];
    obat?: object[];
  }) {
    const result = await this.dataSource.manager.transaction(
      async (transactionEntityManager) => {
        const savePemeriksaan = await transactionEntityManager.save(
          Pemeriksaan,
          pemeriksaan,
        );

        if (resep) {
          await transactionEntityManager.save(PemeriksaanResep, resep);
        }

        if (tindakan) {
          await transactionEntityManager.save(PemeriksaanTindakan, tindakan);
        }

        if (obat) {
          await transactionEntityManager.save(GudangObat, obat);
        }

        return savePemeriksaan;
      },
    );

    return result;
  }
}
