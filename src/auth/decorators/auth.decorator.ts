import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRoles } from '@auth/auth/types';
import { RoleProtected } from '@auth/auth/decorators/';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '@auth/auth/guards/user-role.guard';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
