import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Apoteker } from '../typeorm/entities/apoteker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApotekerSeeder implements Seeder {
  constructor(
    @InjectRepository(Apoteker)
    private readonly apotekerRepository: Repository<Apoteker>,
  ) {}

  async seed(): Promise<any> {
    const apoteker = DataFactory.createForClass(Apoteker).generate(5);
    return this.apotekerRepository.save(apoteker);
  }

  async drop(): Promise<any> {
    return this.apotekerRepository.query('TRUNCATE TABLE apoteker CASCADE');
  }
}
