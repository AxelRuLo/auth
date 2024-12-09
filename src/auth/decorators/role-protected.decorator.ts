import { UserRoles } from '@src/auth/types';
import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from '@common/constants/constants';

export const RoleProtected = (...args: UserRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
