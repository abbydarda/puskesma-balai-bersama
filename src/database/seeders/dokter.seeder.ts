import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, FactoryValue, Seeder } from 'nestjs-seeder';
import { Dokter } from '../typeorm/entities/dokter.entity';
import { Repository } from 'typeorm';
import { Poli } from '../typeorm/entities';
import { faker } from '@faker-js/faker';

@Injectable()
export class DokterSeeder implements Seeder {
  constructor(
    @InjectRepository(Dokter)
    private readonly dokterRepository: Repository<Dokter>,
    @InjectRepository(Poli)
    private readonly poliRepository: Repository<Poli>,
  ) {}

  async seed(): Promise<any> {
    const idPoli = (
      await this.poliRepository.find({ select: { id: true } })
    ).map((item) => item.id);

    const dokter = DataFactory.createForClass(Dokter).generate(5);

    const id = idPoli[faker.number.int({ min: 0, max: idPoli.length - 1 })];

    const dokterWithId: Record<string, FactoryValue>[] = dokter.map((item) => ({
      ...item,
      poli: id,
    }));

    return this.dokterRepository.save(dokterWithId);
  }

  async drop(): Promise<any> {
    return this.dokterRepository.query('TRUNCATE TABLE dokter CASCADE');
  }
}
