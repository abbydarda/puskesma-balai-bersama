import { ApotekerModule } from '../apoteker/apoteker.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DokterModule } from '../dokter/dokter.module';
import { KasirModule } from '../kasir/kasir.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DokterModule, KasirModule, ApotekerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
