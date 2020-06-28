export interface ResponseEntity<T> {
  data: T;
}

export interface ResponsePageable<T> {
  number: number;
  size: number;
  totalPages: number;
  data: T[];
  totalElements: number;
}
