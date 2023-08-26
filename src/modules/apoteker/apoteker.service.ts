import { ApotekerRepository } from './apoteker.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApotekerService {
  constructor(private apotekerRepository: ApotekerRepository) {}

  findAll() {
    return this.apotekerRepository.findAll();
  }
}
