import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRoles } from '@src/auth/types';
import { RoleProtected } from '@auth/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '@auth/guards/user-role.guard';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
