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

import { Apoteker } from './apoteker.entity';
import { Dokter } from './dokter.entity';
import { Kasir } from './kasir.entity';
import { PemeriksaanResep } from './pemeriksaanResep.entity';
import { PemeriksaanTindakan } from './pemeriksaanTindakan.entity';
import { StatusBayar } from '../../../shared/enums';

@Entity()
export class Pemeriksaan {
  @Column({ generated: 'uuid' })
  id: number;

  @PrimaryColumn({ length: 100, unique: true })
  noPemeriksaan: string;

  @Column()
  tanggal: Date;

  @Column()
  namaPasien: string;

  @Column()
  umurPasien: string;

  @Column({ default: 0 })
  total?: number;

  @Column({ default: StatusBayar['BELUM BAYAR'] })
  statusBayar: StatusBayar;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Dokter, (dokter) => dokter.pemeriksaan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'nipDokter' })
  dokter: Dokter;

  @ManyToOne(() => Apoteker, (apoteker) => apoteker.pemeriksaan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'nipApoteker' })
  apoteker: Apoteker;

  @ManyToOne(() => Kasir, (kasir) => kasir.pemeriksaan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nipKasir' })
  kasir: Kasir;

  @OneToMany(
    () => PemeriksaanTindakan,
    (pemeriksaanTindakan) => pemeriksaanTindakan.pemeriksaan,
  )
  pemeriksaanTindakan: PemeriksaanTindakan[];

  @OneToMany(
    () => PemeriksaanResep,
    (pemeriksaanResep) => pemeriksaanResep.pemeriksaan,
  )
  pemeriksaanResep: PemeriksaanResep[];
}
