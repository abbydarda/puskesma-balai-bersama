import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { DokterService } from './dokter.service';

@Controller('dokter')
export class DokterController {
  constructor(private dokterService: DokterService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.dokterService.findAll();
  }
}
