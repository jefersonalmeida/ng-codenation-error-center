export type Entity<T> = {
  [id in string | number]: T;
};

export interface EntityIdUUID<T> {
  [id: string]: T;
}

export interface EntityUUID<T> {
  [uuid: string]: T;
}
