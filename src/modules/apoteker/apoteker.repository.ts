import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apoteker } from '../../database/typeorm/entities';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ApotekerRepository {
  constructor(
    @InjectRepository(Apoteker) private readonly apoteker: Repository<Apoteker>,
  ) {}

  findAll(): Promise<Apoteker[]> {
    return this.apoteker.find();
  }

  findOneByProperty({
    condition,
  }: {
    condition: {
      property: string;
      value: string | number;
    };
  }): Promise<Apoteker> {
    const queryOptions: FindOneOptions<Apoteker> = {};

    const { property, value } = condition;

    queryOptions.where = {
      [property]: value,
    };

    return this.apoteker.findOne(queryOptions);
  }
}
