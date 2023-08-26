import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kasir } from '../../database/typeorm/entities';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class KasirRepository {
  constructor(
    @InjectRepository(Kasir) private readonly kasir: Repository<Kasir>,
  ) {}

  findAll(): Promise<Kasir[]> {
    return this.kasir.find();
  }

  findOneByProperty({
    condition,
  }: {
    condition: {
      property: string;
      value: string | number;
    };
  }): Promise<Kasir> {
    const queryOptions: FindOneOptions<Kasir> = {};

    const { property, value } = condition;

    queryOptions.where = {
      [property]: value,
    };

    return this.kasir.findOne(queryOptions);
  }
}
