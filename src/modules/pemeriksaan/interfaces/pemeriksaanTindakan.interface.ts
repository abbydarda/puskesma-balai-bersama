import { Tindakan } from '../../../database/typeorm/entities';

export interface IPemeriksaanTindakan {
  id?: string;
  subTotal?: number;
  tindakan: Tindakan;
}
