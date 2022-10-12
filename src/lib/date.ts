import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatToLocalDate = (date) => {
  try {
    const utcDate = dayjs.utc(date);

    if (!utcDate.isValid()) throw new Error(date + ' is not valid');
    if (!utcDate.isUTC()) throw new Error('date is not utc');
    return utcDate.local().format('DD-MM-YYYY HH:mm');
  } catch (error) {
    return '-';
  }
};

export const defaultRange = (): [Date, Date] => {
  const toDay = dayjs().toDate();
  const last30Day = dayjs().subtract(30, 'day').toDate();
  return [last30Day, toDay];
};

export const defaultRangeFilter = (): { start_date: string; end_date: string } => {
  return {
    start_date: formatDateFilter(defaultRange[0]),
    end_date: formatDateFilter(defaultRange[1]),
  };
};

export const formatDateFilter = (date: Date) => dayjs(date).format('YYYY-MM-DD');
