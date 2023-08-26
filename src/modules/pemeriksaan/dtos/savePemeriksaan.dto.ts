import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class SavePemeriksaanResepDto {
  @IsNotEmpty()
  @IsUUID()
  idObat: string;

  @IsNotEmpty()
  @IsString()
  keterangan: string;
}

class SavePemeriksaanTindakanDto {
  @IsNotEmpty()
  @IsUUID()
  idTindakan: string;
}

export class SavePemeriksaanDto {
  @IsNotEmpty()
  @IsString()
  namaPasien: string;

  @IsNotEmpty()
  @IsPositive()
  umurPasien: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SavePemeriksaanResepDto)
  resep: SavePemeriksaanResepDto[];

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SavePemeriksaanTindakanDto)
  tindakan: SavePemeriksaanTindakanDto[];
}
