import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Poli } from '../typeorm/entities/poli.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PoliSeeder implements Seeder {
  constructor(
    @InjectRepository(Poli) private readonly poliRepository: Repository<Poli>,
  ) {}

  async seed(): Promise<any> {
    const poli = [
      {
        nama: 'Poli Umum',
      },
      {
        nama: 'Poli Gigi dan Mulut',
      },
    ];
    return this.poliRepository.save(poli);
  }

  async drop(): Promise<any> {
    return this.poliRepository.query(
      'TRUNCATE TABLE "poli" RESTART IDENTITY CASCADE',
    );
  }
}
