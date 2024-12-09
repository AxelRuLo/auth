export interface JwtPayload {
  id: string;
}

// MOVE: to user module
export enum UserRoles {
  SUPER_USER = 'super-user',
  ADMIN = 'admin',
  USER = 'user',
}
