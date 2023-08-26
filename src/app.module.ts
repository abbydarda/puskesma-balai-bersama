import { ApotekerModule } from './modules/apoteker/apoteker.module';
import { AppConfig } from './config/appConfig.module';
import { AuthModule } from './modules/auth/auth.module';
import { DokterModule } from './modules/dokter/dokter.module';
import { KasirModule } from './modules/kasir/kasir.module';
import { Module } from '@nestjs/common';
import { ObatModule } from './modules/obat/obat.module';
import { PemeriksaanModule } from './modules/pemeriksaan/pemeriksaan.module';
import { PoliModule } from './modules/poli/poli.module';
import { TindakanModule } from './modules/tindakan/tindakan.module';
import { TypeormModule } from './database/typeorm/typeorm.module';

@Module({
  imports: [
    AppConfig,
    TypeormModule,
    AuthModule,
    DokterModule,
    ApotekerModule,
    KasirModule,
    PoliModule,
    TindakanModule,
    PemeriksaanModule,
    ObatModule,
  ],
})
export class AppModule {}
