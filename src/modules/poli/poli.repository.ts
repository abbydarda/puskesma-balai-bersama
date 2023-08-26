import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Poli } from '../../database/typeorm/entities';

@Injectable()
export class PoliRepository {
  constructor(
    @InjectRepository(Poli)
    private readonly poli: Repository<Poli>,
  ) {}

  async findAll({
    include = { tindakan: false },
  }: {
    include?: { tindakan: boolean };
  }): Promise<Poli[]> {
    const queryOptions: FindManyOptions<Poli> = {};

    if (include.tindakan) {
      queryOptions.relations = ['poliTindakan', 'poliTindakan.tindakan'];
    }

    const result = await this.poli.find(queryOptions);

    return result;
  }
}
