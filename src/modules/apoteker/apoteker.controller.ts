import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { ApotekerService } from './apoteker.service';

@Controller('apoteker')
export class ApotekerController {
  constructor(private apotekerService: ApotekerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.apotekerService.findAll();
  }
}
