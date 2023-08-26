import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { KasirService } from './kasir.service';

@Controller('kasir')
export class KasirController {
  constructor(private kasirService: KasirService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.kasirService.findAll();
  }
}
