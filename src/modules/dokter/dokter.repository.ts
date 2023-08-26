import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Dokter } from '../../database/typeorm/entities';

@Injectable()
export class DokterRepository {
  constructor(
    @InjectRepository(Dokter)
    private readonly dokter: Repository<Dokter>,
  ) {}

  findAll(): Promise<Dokter[]> {
    return this.dokter.find();
  }

  async findOneByProperty({
    condition,
    include = { poli: false },
  }: {
    condition: {
      property: string;
      value: string;
    };
    include?: {
      poli: boolean;
    };
  }): Promise<Dokter> {
    const queryOptions: FindOneOptions<Dokter> = {};

    if (include.poli) {
      queryOptions.relations = ['poli'];
    }

    if (condition) {
      const { property, value } = condition;

      if (property === 'idPoli') {
        queryOptions.where = {
          poli: {
            id: value,
          },
        };
        if (!queryOptions.relations) {
          queryOptions.relations = ['poli'];
        }
      } else {
        queryOptions.where = {
          [property]: value,
        };
      }
    }

    return this.dokter.findOne(queryOptions);
  }
}
