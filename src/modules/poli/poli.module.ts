import { Module } from '@nestjs/common';
import { Poli } from '../../database/typeorm/entities';
import { PoliRepository } from './poli.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Poli])],
  providers: [PoliRepository],
  exports: [PoliRepository],
})
export class PoliModule {}
