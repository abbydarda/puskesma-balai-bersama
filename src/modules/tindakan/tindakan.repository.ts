import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { Tindakan } from '../../database/typeorm/entities';

@Injectable()
export class TindakanRepository {
  constructor(
    @InjectRepository(Tindakan)
    private readonly tindakan: Repository<Tindakan>,
  ) {}

  async findAll({
    include = { poli: false },
    condition,
  }: {
    include?: { poli: boolean };
    condition?: { property: string; value: string };
  }): Promise<Tindakan[]> {
    const queryOptions: FindManyOptions<Tindakan> = {};

    if (include.poli) {
      queryOptions.relations = ['poliTindakan', 'poliTindakan.poli'];
    }

    if (condition) {
      const { property, value } = condition;

      if (property === 'idPoli') {
        queryOptions.relations = ['poliTindakan', 'poliTindakan.poli'];
        queryOptions.where = {
          poliTindakan: {
            poli: {
              id: value,
            },
          },
        };
      } else {
        queryOptions.where = {
          [property]: value,
        };
      }
    }

    const tindakanList = await this.tindakan.find(queryOptions);

    return tindakanList;
  }

  async findAllByPk(ids: string[]): Promise<Tindakan[]> {
    return await this.tindakan.find({
      where: {
        id: In(ids),
      },
    });
  }
}
