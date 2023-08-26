import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PemeriksaanResep } from './pemeriksaanResep.entity';

@Entity()
export class GudangObat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  nama: string;

  @Column({ length: 100 })
  jenis: string;

  @Column()
  harga: number;

  @Column()
  stok: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => PemeriksaanResep,
    (pemeriksaanResep) => pemeriksaanResep.obat,
    {
      lazy: true,
    },
  )
  pemeriksaanResep: PemeriksaanResep[];
}
