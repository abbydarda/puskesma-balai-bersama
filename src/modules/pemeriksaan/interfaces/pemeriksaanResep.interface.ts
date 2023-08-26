import { GudangObat, Pemeriksaan } from '../../../database/typeorm/entities';

export interface IPemeriksaanResep {
  id?: string;
  keterangan?: string;
  jumlah?: number;
  subTotal?: number;
  obat?: GudangObat;
  pemeriksaan?: Pemeriksaan;
}
