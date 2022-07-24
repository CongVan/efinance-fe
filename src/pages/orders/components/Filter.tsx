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

  const [dates, setDates] = useState(null);
  const [filter, setFilter] = useState<{ date: [Date, Date]; verify_status: string }>({
    ...props.filter,
  });
  const [isMounted, setIsMounted] = useState(false);

  const defaultFilter = useMemo(() => {
    return { source: 'shopee', sort: 'date desc' };
  }, []);

  const onChangeDate = (d: [Date | null, Date | null]) => {
    if (!isMounted) return;
    console.log('====================================');
    console.log('date change');
    console.log('====================================');
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
    console.log('====================================');
    console.log('filter');
    console.log('====================================');
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
      <Grid columns={4}>
        <Grid.Col span={1}>
          <DateRangePicker
            locale="vi"
            amountOfMonths={2}
            label={'Thời gian'}
            defaultValue={defaultDate}
            value={dates}
            allowLevelChange={false}
            onChange={onChangeDate}
            // onDropdownClose={() => setFilter({ ...filter, date: dates })}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Select
            width={'80px'}
            label="Đối soát"
            data={[
              { value: 'OK', label: 'Đúng' },
              { value: 'WRONG', label: 'Sai' },
            ]}
            value={filter.verify_status}
            onChange={(v) => setFilter({ ...filter, verify_status: v })}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
