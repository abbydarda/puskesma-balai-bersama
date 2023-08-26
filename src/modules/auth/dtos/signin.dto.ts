import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';

import { Role } from '../../../shared/enums';

export class SigninDto {
  @IsNotEmpty()
  @IsNumberString()
  nip: string;

  @IsEnum(Role, {
    message:
      'role must be one of the following values: DOKTER, APOTEKER, KASIR',
  })
  role: Role;
}
