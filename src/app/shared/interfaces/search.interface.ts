export class Search {
  init?: string | number;
  end?: string | number;
  search?: string = null;
  order?: string = null;
  sort?: string = null;

  number?: number = 0;
  size?: number = 20;

  level?: string;

  totalElements?: number;
  totalPages?: number;
}
