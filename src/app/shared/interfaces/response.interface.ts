export interface ResponseEntity<T> {
  data: T;
  errors: string[];
}

export interface ResponsePageable<T> {
  number: number;
  size: number;
  totalPages: number;
  content: T[];
  totalElements: number;
}
