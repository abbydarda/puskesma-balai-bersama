import { Injectable } from '@nestjs/common';
import { KasirRepository } from './kasir.repository';

@Injectable()
export class KasirService {
  constructor(private kasirRepository: KasirRepository) {}

  findAll() {
    return this.kasirRepository.findAll();
  }
}
