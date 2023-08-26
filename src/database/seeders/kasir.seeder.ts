import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Kasir } from '../typeorm/entities/kasir.entity';

@Injectable()
export class KasirSeeder implements Seeder {
  constructor(
    @InjectRepository(Kasir)
    private readonly kasirRepository: Repository<Kasir>,
  ) {}

  async seed(): Promise<any> {
    const kasir = DataFactory.createForClass(Kasir).generate(5);
    return this.kasirRepository.save(kasir);
  }

  async drop(): Promise<any> {
    return this.kasirRepository.query('TRUNCATE TABLE kasir CASCADE');
  }
}
