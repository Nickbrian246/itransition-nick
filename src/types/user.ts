import { UserRole } from '@prisma/client';
export interface UserDecoded {
  id: never;
  email: string;
  role: UserRole;
}
