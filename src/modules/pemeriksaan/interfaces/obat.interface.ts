import { Pemeriksaan } from '../../../database/typeorm/entities';

export interface IObat {
  id?: string;
  jenis?: string;
  nama?: string;
  harga?: number;
  stok?: number;
  pemeriksaan: Pemeriksaan;
}
