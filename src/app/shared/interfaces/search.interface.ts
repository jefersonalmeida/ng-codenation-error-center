export class Search {
  userId?: string;
  companyId?: string;
  key?: string;
  initDate?: string | number;
  endDate?: string | number;
  search?: string = null;
  orderBy?: string = null;
  sortedBy?: string = null;
  current_page?: number = 0;
  per_page?: number = 20;

  count?: number;
  total?: number;
  total_pages?: number;
}
