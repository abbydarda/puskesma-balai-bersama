import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class UpdatePemeriksaanResepDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsPositive()
  jumlah: number;
}

export class UpdatePemeriksanDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdatePemeriksaanResepDto)
  resep: UpdatePemeriksaanResepDto[];
}
