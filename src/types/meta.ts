export interface Meta<T> {
  data: T;
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total_rows: number;
  sort: string;
  total_pages: number;
}
