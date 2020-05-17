import { Permission } from '../permissions/permission.interface';

export interface Role {
  id: number;
  name: string;
  display_name?: string;
  description?: string;

  permissions?: { data: Permission[] };
}
