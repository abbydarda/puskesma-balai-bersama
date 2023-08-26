import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Dokter } from './dokter.entity';
import { PoliTindakan } from './poliTindakan.entity';

@Entity()
export class Poli {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  nama: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Dokter, (dokter) => dokter.poli)
  dokter: Dokter[];

  @OneToMany(() => PoliTindakan, (poliTindakan) => poliTindakan.poli)
  poliTindakan: PoliTindakan[];
}
