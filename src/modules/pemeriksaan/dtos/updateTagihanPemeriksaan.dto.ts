import { IsEnum, IsNotEmpty } from 'class-validator';

import { StatusBayar } from '../../../shared/enums';

export class UpdateTagihanPemeriksaanDto {
  @IsNotEmpty()
  @IsEnum(StatusBayar)
  statusBayar: StatusBayar;
}
