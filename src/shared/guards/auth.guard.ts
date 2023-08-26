import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { Observable } from 'rxjs';
import { Request } from 'express';
import { verifyToken } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Invalid token');

    const payload = verifyToken(token);

    if (!payload) throw new UnauthorizedException('Invalid token');

    request['user'] = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
