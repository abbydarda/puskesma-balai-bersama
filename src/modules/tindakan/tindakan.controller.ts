import { AuthGuard, RoleGuard } from '../../shared/guards';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles, User } from '../../shared/decorators/';
import { TindakanService } from './tindakan.service';

@Controller('tindakan')
export class TindakanController {
  constructor(private tindakanService: TindakanService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('dokter')
  @Get('dokter')
  async findTindakanByDokter(@User() user) {
    return await this.tindakanService.findTindakanByDokter(user);
  }
}
