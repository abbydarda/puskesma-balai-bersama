import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { GudangObat } from '../typeorm/entities/gudangObat.entity';

@Injectable()
export class ObatSeeder implements Seeder {
  constructor(
    @InjectRepository(GudangObat)
    private readonly gudangObatRepository: Repository<GudangObat>,
  ) {}

  async seed(): Promise<any> {
    const gudangObat = [
      {
        nama: 'Paracetamol',
        jenis: 'Tablet',
        harga: 15000,
        stok: 200,
      },
      {
        nama: 'Amoxicillin',
        jenis: 'Kapsul',
        harga: 25000,
        stok: 150,
      },
      {
        nama: 'Cetirizine',
        jenis: 'Tablet',
        harga: 18000,
        stok: 100,
      },
      {
        nama: 'Ibuprofen',
        jenis: 'Sirup',
        harga: 30000,
        stok: 80,
      },
      {
        nama: 'Omeprazole',
        jenis: 'Tablet',
        harga: 35000,
        stok: 120,
      },
      {
        nama: 'Loratadine',
        jenis: 'Tablet',
        harga: 22000,
        stok: 90,
      },
      {
        nama: 'Hydrocortisone',
        jenis: 'Salep',
        harga: 40000,
        stok: 60,
      },
      {
        nama: 'Metformin',
        jenis: 'Tablet',
        harga: 28000,
        stok: 180,
      },
      {
        nama: 'Insulin',
        jenis: 'Injeksi',
        harga: 55000,
        stok: 30,
      },
      {
        nama: 'Morphine',
        jenis: 'Injeksi',
        harga: 80000,
        stok: 10,
      },
    ];

    return this.gudangObatRepository.save(gudangObat);
  }

  async drop(): Promise<any> {
    return this.gudangObatRepository.query(
      'TRUNCATE TABLE gudang_obat RESTART IDENTITY CASCADE',
    );
  }
}
