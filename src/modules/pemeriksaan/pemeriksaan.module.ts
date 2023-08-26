import {
  GudangObat,
  Pemeriksaan,
  PemeriksaanResep,
  PemeriksaanTindakan,
} from '../../database/typeorm/entities';

import { ApotekerModule } from '../apoteker/apoteker.module';
import { DokterModule } from '../dokter/dokter.module';
import { KasirModule } from '../kasir/kasir.module';
import { Module } from '@nestjs/common';
import { ObatModule } from '../obat/obat.module';
import { PemeriksaanController } from './pemeriksaan.controller';
import { PemeriksaanRepository } from './pemeriksaan.repository';
import { PemeriksaanService } from './pemeriksaan.service';
import { TindakanModule } from '../tindakan/tindakan.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pemeriksaan,
      PemeriksaanTindakan,
      PemeriksaanResep,
      GudangObat,
    ]),
    DokterModule,
    TindakanModule,
    KasirModule,
    ApotekerModule,
    ObatModule,
  ],
  controllers: [PemeriksaanController],
  providers: [PemeriksaanService, PemeriksaanRepository],
})
export class PemeriksaanModule {}
