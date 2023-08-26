import { Dokter } from '../../database/typeorm/entities';

import { DokterController } from './dokter.controller';
import { DokterRepository } from './dokter.repository';
import { DokterService } from './dokter.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dokter])],
  providers: [DokterRepository, DokterService],
  controllers: [DokterController],
  exports: [DokterRepository],
})
export class DokterModule {}
