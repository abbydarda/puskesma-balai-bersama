import { GudangObat } from '../../database/typeorm/entities';
import { Module } from '@nestjs/common';
import { ObatController } from './obat.controller';
import { ObatRepository } from './obat.repository';
import { ObatService } from './obat.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GudangObat])],
  controllers: [ObatController],
  providers: [ObatService, ObatRepository],
  exports: [ObatRepository],
})
export class ObatModule {}
