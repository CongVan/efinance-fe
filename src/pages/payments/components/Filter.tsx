import { Grid, Select } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { FC, useEffect, useMemo, useState } from 'react';

import { defaultRange, formatDateFilter } from '@/lib/date';
const buildRangeFromFilter = (filter): [Date, Date] => {
  const { start_date, end_date } = filter;
  let [startDate, endDate] = defaultRange();

  if (start_date) {
    startDate = dayjs(start_date, 'YYYY-MM-dd').toDate();
  }
  if (end_date) {
    endDate = dayjs(end_date, 'YYYY-MM-dd').toDate();
  }

  return [startDate, endDate];
};
export const Filter: FC<{ filter: any; onChange: (f) => void }> = (props) => {
  const defaultDate = useMemo(() => {
    return buildRangeFromFilter(props.filter);
  }, [props.filter]);

  const [dates, setDates] = useState(defaultDate);
  const [filter, setFilter] = useState<{ date: [Date, Date] }>({
    ...props.filter,
  });
  const [isMounted, setIsMounted] = useState(false);

  const defaultFilter = useMemo(() => {
    return { source: 'shopee', sort: 'date desc' };
  }, []);

  const onChangeDate = (d: [Date | null, Date | null]) => {
    if (!isMounted) return;
    setDates(d);
    if (d[0] === null || d[1] === null) {
      return;
    }
    const f = { ...filter, date: d };
    setFilter(f);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const { date, ...f } = filter;
    const filterParams = {
      ...defaultFilter,
      ...f,
      start_date: formatDateFilter(dates[0]),
      end_date: formatDateFilter(dates[1]),
    };
    props.onChange && props.onChange(filterParams);
  }, [filter]);

  return (
    <>
      <Grid>
        <Grid.Col sm={4} md={3}>
          <DateRangePicker
            locale="vi"
            amountOfMonths={2}
            label={'Thời gian tải lên'}
            defaultValue={defaultDate}
            value={dates}
            allowLevelChange={false}
            onChange={onChangeDate}

            // onDropdownClose={() => setFilter({ ...filter, date: dates })}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
