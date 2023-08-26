import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PemeriksaanTindakan } from './pemeriksaanTindakan.entity';
import { PoliTindakan } from './poliTindakan.entity';

@Entity()
export class Tindakan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  nama: string;

  @Column()
  harga: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PoliTindakan, (poliTindakan) => poliTindakan.tindakan)
  poliTindakan: PoliTindakan[];

  @OneToMany(
    () => PemeriksaanTindakan,
    (pemeriksaanTindakan) => pemeriksaanTindakan.tindakan,
  )
  pemeriksaanTindakan: PemeriksaanTindakan[];
}
