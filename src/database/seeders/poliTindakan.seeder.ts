import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { PoliTindakan } from '../typeorm/entities/poliTindakan.entity';
import { Poli } from '../typeorm/entities/poli.entity';
import { Tindakan } from '../typeorm/entities/tindakan.entity';

@Injectable()
export class PoliTindakanSeeder implements Seeder {
  constructor(
    @InjectRepository(PoliTindakan)
    private readonly poliTindakanRepository: Repository<PoliTindakan>,
    @InjectRepository(Poli) private readonly poliRepository: Repository<Poli>,
    @InjectRepository(Tindakan)
    private readonly tindakanRepository: Repository<Tindakan>,
  ) {}

  async seed(): Promise<any> {
    const poliTindakanData = [
      {
        poli: await this.poliRepository.findOne({
          where: { nama: 'Poli Umum' },
        }),
        tindakan: await this.tindakanRepository.findOne({
          where: { nama: 'Konsultasi Umum' },
        }),
      },
      {
        poli: await this.poliRepository.findOne({
          where: { nama: 'Poli Umum' },
        }),
        tindakan: await this.tindakanRepository.findOne({
          where: { nama: 'Bedah Ringan' },
        }),
      },
      {
        poli: await this.poliRepository.findOne({
          where: { nama: 'Poli Gigi dan Mulut' },
        }),
        tindakan: await this.tindakanRepository.findOne({
          where: { nama: 'Konsultasi Umum' },
        }),
      },
      {
        poli: await this.poliRepository.findOne({
          where: { nama: 'Poli Gigi dan Mulut' },
        }),
        tindakan: await this.tindakanRepository.findOne({
          where: { nama: 'Scalling' },
        }),
      },
      {
        poli: await this.poliRepository.findOne({
          where: { nama: 'Poli Gigi dan Mulut' },
        }),
        tindakan: await this.tindakanRepository.findOne({
          where: { nama: 'Tambal Gigi' },
        }),
      },
    ];

    return this.poliTindakanRepository.save(poliTindakanData);
  }

  async drop(): Promise<any> {
    return this.poliTindakanRepository.query(
      'TRUNCATE TABLE poli_tindakan RESTART IDENTITY CASCADE',
    );
  }
}
