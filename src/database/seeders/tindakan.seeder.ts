import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Tindakan } from '../typeorm/entities/tindakan.entity';

@Injectable()
export class TindakanSeeder implements Seeder {
  constructor(
    @InjectRepository(Tindakan)
    private readonly tindakanRepository: Repository<Tindakan>,
  ) {}

  async seed(): Promise<any> {
    const tindakan = [
      {
        nama: 'Konsultasi Umum',
        harga: 25000,
      },
      {
        nama: 'Bedah Ringan',
        harga: 75000,
      },
      {
        nama: 'Scalling',
        harga: 60000,
      },
      {
        nama: 'Tambal Gigi',
        harga: 100000,
      },
    ];

    return this.tindakanRepository.save(tindakan);
  }

  async drop(): Promise<any> {
    return this.tindakanRepository.query(
      'TRUNCATE TABLE tindakan RESTART IDENTITY CASCADE',
    );
  }
}
