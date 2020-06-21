export interface Log {
  id: string;
  level: string;
  description: string;
  log?: string;
  origin: string;
  date: string;
  quantity: number;
  created_by?: string;
  last_modified_at?: string;
  created_at?: string;
  last_modified_by?: string;
}
