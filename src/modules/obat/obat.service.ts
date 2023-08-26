import { Injectable } from '@nestjs/common';
import { ObatRepository } from './obat.repository';

@Injectable()
export class ObatService {
  constructor(private readonly obatRepository: ObatRepository) {}

  async findAll() {
    return await this.obatRepository.findAll();
  }
}
