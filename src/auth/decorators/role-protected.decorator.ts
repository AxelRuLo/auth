import { UserRoles } from '@auth/auth/types';
import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from '@auth/common/constants/constants';

export const RoleProtected = (...args: UserRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
