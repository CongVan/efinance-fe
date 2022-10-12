import { MIME_TYPES } from '@mantine/dropzone';

import { defaultRangeFilter } from '@/lib/date';

export const ACCEPT_IMPORT_EXCEL = {
  [MIME_TYPES.csv]: [],
  [MIME_TYPES.xls]: [],
  [MIME_TYPES.xlsx]: [],
};

export const PAGE_SIZE = 10;

export const DEFAULT_FILTER_SHOPEE = {
  filter: {
    source: 'shopee',
    ...defaultRangeFilter(),
  },
  page: 1,
  limit: PAGE_SIZE,
};
