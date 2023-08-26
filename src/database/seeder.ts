import {
  Apoteker,
  Dokter,
  GudangObat,
  Kasir,
  Poli,
  PoliTindakan,
  Tindakan,
} from './typeorm/entities';
import {
  ApotekerSeeder,
  DokterSeeder,
  KasirSeeder,
  ObatSeeder,
  PoliSeeder,
  PoliTindakanSeeder,
  TindakanSeeder,
} from './seeders';

import { AppConfig } from '../config/appConfig.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormModule } from './typeorm/typeorm.module';
import { seeder } from 'nestjs-seeder';

seeder({
  imports: [
    AppConfig,
    TypeormModule,
    TypeOrmModule.forFeature([
      Poli,
      Dokter,
      Apoteker,
      Kasir,
      Tindakan,
      PoliTindakan,
      GudangObat,
    ]),
  ],
}).run([
  PoliSeeder,
  TindakanSeeder,
  ApotekerSeeder,
  KasirSeeder,
  ObatSeeder,
  DokterSeeder,
  PoliTindakanSeeder,
]);
