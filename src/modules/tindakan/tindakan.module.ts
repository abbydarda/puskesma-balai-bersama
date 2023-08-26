import { Module } from '@nestjs/common';
import { Tindakan } from '../../database/typeorm/entities';
import { TindakanController } from './tindakan.controller';
import { TindakanRepository } from './tindakan.repository';
import { TindakanService } from './tindakan.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tindakan])],
  controllers: [TindakanController],
  providers: [TindakanService, TindakanRepository],
  exports: [TindakanRepository],
})
export class TindakanModule {}
