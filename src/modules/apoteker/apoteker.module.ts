import { Apoteker } from '../../database/typeorm/entities';
import { ApotekerRepository } from './apoteker.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApotekerController } from './apoteker.controller';
import { ApotekerService } from './apoteker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apoteker])],
  providers: [ApotekerRepository, ApotekerService],
  exports: [ApotekerRepository],
  controllers: [ApotekerController],
})
export class ApotekerModule {}
