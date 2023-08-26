import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GudangObat } from './gudangObat.entity';
import { Pemeriksaan } from './pemeriksaan.entity';

@Entity()
export class PemeriksaanResep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  jumlah?: number;

  @Column({ type: 'text', nullable: true })
  keterangan?: string;

  @Column({ default: 0 })
  subTotal?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Pemeriksaan, (pemeriksaan) => pemeriksaan.pemeriksaanResep, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'noPemeriksaan' })
  pemeriksaan: Pemeriksaan;

  @ManyToOne(() => GudangObat, (gudangObat) => gudangObat.pemeriksaanResep, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idObat' })
  obat: GudangObat;
}
