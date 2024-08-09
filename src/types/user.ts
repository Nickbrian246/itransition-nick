import { User, UserRole } from '@prisma/client';
export interface UserDecoded {
  id: never;
  email: string;
  role: UserRole;
}

export interface UserWithOutPassword
  extends Pick<User, 'firstName' | 'email' | 'role'> {}
