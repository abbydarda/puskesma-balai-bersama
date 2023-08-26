import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ApotekerRepository } from '../apoteker/apoteker.repository';
import { DokterRepository } from '../dokter/dokter.repository';
import { KasirRepository } from '../kasir/kasir.repository';
import { SigninDto } from './dtos';
import { generateToken } from '../../shared/utils';

@Injectable()
export class AuthService {
  private repository: Record<string, any>;

  constructor(
    private readonly dokterRepository: DokterRepository,
    private readonly apotekerRepository: ApotekerRepository,
    private readonly kasirRepository: KasirRepository,
  ) {
    this.repository = {
      dokter: this.dokterRepository,
      apoteker: this.apotekerRepository,
      kasir: this.kasirRepository,
    };
  }

  async signin(dto: SigninDto) {
    const { nip, role } = dto;
    const employeeRole = role.toString().toLowerCase();

    const employee = await this.repository[employeeRole].findOneByProperty({
      condition: { property: 'nip', value: nip },
      include: { poli: true },
    });

    if (!employee) throw new UnauthorizedException('Invalid account');

    const idPoli: number = employee.poli?.id || 0;

    const token = generateToken({ sub: employee.nip, idPoli, role });

    return { token };
  }
}
