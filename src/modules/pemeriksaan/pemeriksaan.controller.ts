import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PemeriksaanService } from './pemeriksaan.service';
import { Roles, User } from '../../shared/decorators';
import { AuthGuard, RoleGuard } from '../../shared/guards';
import {
  SavePemeriksaanDto,
  UpdatePemeriksanDto,
  UpdateTagihanPemeriksaanDto,
} from './dtos';

@Controller('pemeriksaan')
export class PemeriksaanController {
  constructor(private pemeriksaanService: PemeriksaanService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('dokter')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async savePemeriksaan(@User() user, @Body() dto: SavePemeriksaanDto) {
    return await this.pemeriksaanService.savePemeriksaan(user, dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('apoteker')
  @Get('resep/:noPemeriksaan')
  @HttpCode(HttpStatus.OK)
  async findResep(@Param('noPemeriksaan') noPemeriksaan: string) {
    return await this.pemeriksaanService.findResep(noPemeriksaan);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('apoteker')
  @Put('resep/:noPemeriksaan')
  @HttpCode(HttpStatus.OK)
  async updateResep(
    @User() user,
    @Body() dto: UpdatePemeriksanDto,
    @Param('noPemeriksaan') noPemeriksaan: string,
  ) {
    return await this.pemeriksaanService.updateResep(user, dto, noPemeriksaan);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('kasir')
  @Get('tagihan/:noPemeriksaan')
  @HttpCode(HttpStatus.OK)
  async findTagihanByNoPemeriksaan(
    @Param('noPemeriksaan') noPemeriksaan: string,
  ) {
    return await this.pemeriksaanService.findTagihanPemeriksaan(noPemeriksaan);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('kasir')
  @Put('tagihan/status/:noPemeriksaan')
  @HttpCode(HttpStatus.OK)
  async updateTagihanPemeriksaan(
    @User() user,
    @Body() dto: UpdateTagihanPemeriksaanDto,
    @Param('noPemeriksaan') noPemeriksaan: string,
  ) {
    return await this.pemeriksaanService.updateTagihanPemeriksaanStatus(
      user,
      dto,
      noPemeriksaan,
    );
  }
}
