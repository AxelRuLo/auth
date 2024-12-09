import { User } from '@src/user/entities/user.entity';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '@common/constants/constants';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const UserRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    if (!UserRoles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    if (!user) {
      throw new BadRequestException('No se ha encontrado el usuario');
    }
    const isAuthorized = user.roles.some((role) => UserRoles.includes(role));
    if (!isAuthorized) {
      throw new UnauthorizedException(
        'No tienes permisos para acceder a este recurso',
      );
    }
    return true;
  }
}
