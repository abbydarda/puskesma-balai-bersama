import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Factory } from 'nestjs-seeder';
import { Pemeriksaan } from './pemeriksaan.entity';
import { fakerID_ID as faker } from '@faker-js/faker';

@Entity()
export class Apoteker {
  @Column({ generated: 'uuid' })
  id: number;

  @Factory(() => faker.string.numeric(10))
  @PrimaryColumn({ length: 50 })
  nip: string;

  @Factory(() => `Apt. ${faker.person.firstName()} ${faker.person.firstName()}`)
  @Column({ length: 100 })
  nama: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Pemeriksaan, (pemeriksaan) => pemeriksaan.apoteker)
  pemeriksaan: Pemeriksaan[];
}
