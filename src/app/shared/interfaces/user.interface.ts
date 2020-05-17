export interface User {
  uuid?: number;
  name: string;
  email: string;
  password?: string;
  status: boolean;
  status_label: string;
  img?: string;
  token: string;
  webhook_input?: string;
  webhook_output?: string;
  created_at?: any;
  updated_at?: any;

  pivot_relationship?: number;
  pivot_relationship_label?: string;
  pivot_status?: boolean;
  pivot_status_label?: string;

  roles_name: string[];
  permissions: string[];
  roles: string[];
}
