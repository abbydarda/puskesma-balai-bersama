import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { ObatService } from './obat.service';

@Controller('obat')
export class ObatController {
  constructor(private readonly obatService: ObatService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.obatService.findAll();
  }
}
