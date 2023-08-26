import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Factory } from 'nestjs-seeder';
import { Pemeriksaan } from './pemeriksaan.entity';
import { Poli } from './poli.entity';
import { fakerID_ID as faker } from '@faker-js/faker';

@Entity()
export class Dokter {
  @Column({ generated: 'uuid' })
  id: string;

  @Factory(() => faker.string.numeric(10))
  @PrimaryColumn({ length: 50 })
  nip: string;

  @Factory(() => `Dr. ${faker.person.firstName()} ${faker.person.firstName()}`)
  @Column({ length: 100 })
  nama: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Poli, (poli) => poli.dokter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPoli' })
  poli: Poli;

  @OneToMany(() => Pemeriksaan, (pemeriksaan) => pemeriksaan.dokter)
  pemeriksaan: Pemeriksaan[];
}
