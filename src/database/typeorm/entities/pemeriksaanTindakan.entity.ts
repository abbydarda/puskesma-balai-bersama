import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Pemeriksaan } from './pemeriksaan.entity';
import { Tindakan } from './tindakan.entity';

@Entity()
export class PemeriksaanTindakan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  subTotal?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => Pemeriksaan,
    (pemeriksaan) => pemeriksaan.pemeriksaanTindakan,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'noPemeriksaan' })
  pemeriksaan: Pemeriksaan;

  @ManyToOne(() => Tindakan, (tindakan) => tindakan.pemeriksaanTindakan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idTindakan' })
  tindakan: Tindakan;
}
