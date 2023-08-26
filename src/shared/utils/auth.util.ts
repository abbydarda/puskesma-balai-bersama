import * as jwt from 'jsonwebtoken';

import { Role } from '../enums/role.enum';

export const generateToken = (payload: {
  sub: string;
  idPoli: number;
  role: Role;
}): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

export const verifyToken = (token: string): string | jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
