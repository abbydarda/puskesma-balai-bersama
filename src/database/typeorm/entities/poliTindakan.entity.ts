import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Poli } from './poli.entity';
import { Tindakan } from './tindakan.entity';

@Entity()
export class PoliTindakan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Poli, (poli) => poli.poliTindakan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPoli' })
  poli: Poli;

  @ManyToOne(() => Tindakan, (tindakan) => tindakan.poliTindakan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idTindakan' })
  tindakan: Tindakan;
}
