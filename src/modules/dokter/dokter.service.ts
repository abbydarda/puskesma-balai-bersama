import { DokterRepository } from './dokter.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DokterService {
  constructor(private dokterRepository: DokterRepository) {}

  async findAll() {
    const dokter = await this.dokterRepository.findAll();
    return dokter;
  }
}
