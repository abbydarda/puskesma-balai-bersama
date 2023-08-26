import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GudangObat } from '../../database/typeorm/entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class ObatRepository {
  constructor(
    @InjectRepository(GudangObat) private readonly obat: Repository<GudangObat>,
  ) {}

  findAll(): Promise<GudangObat[]> {
    return this.obat.find();
  }

  findAllByPk(ids: string[]): Promise<GudangObat[]> {
    return this.obat.find({
      where: {
        id: In(ids),
      },
    });
  }
}
