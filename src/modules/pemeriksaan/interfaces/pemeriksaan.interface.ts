import { Apoteker, Dokter, Kasir } from '../../../database/typeorm/entities';

export interface IPemeriksaan {
  namaPasien: string;
  umurPasien: string;
  noPemeriksaan: string;
  tanggal: string;
  total: number;
  dokter?: Dokter;
  kasir?: Kasir;
  apoteker?: Apoteker;
}
