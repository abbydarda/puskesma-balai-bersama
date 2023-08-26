import { Kasir } from '../../database/typeorm/entities';
import { KasirController } from './kasir.controller';
import { KasirRepository } from './kasir.repository';
import { KasirService } from './kasir.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Kasir])],
  providers: [KasirRepository, KasirService],
  exports: [KasirRepository],
  controllers: [KasirController],
})
export class KasirModule {}
