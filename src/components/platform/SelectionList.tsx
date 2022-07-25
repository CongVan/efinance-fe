import { Chip, ChipProps, Space, Stack, Text, Title } from '@mantine/core';
import { FC, useState } from 'react';

export const SelectionList: FC<{ onSelected: (val) => void }> = ({ onSelected }) => {
  const [value, setValue] = useState('shopee');

  const handleChange = (val) => {
    setValue(val);
    onSelected(val);
  };

  return (
    <Stack>
      <Text>Nền tảng:</Text>
      <Chip.Group
        multiple={false}
        defaultValue={'shopee'}
        value={value}
        onChange={handleChange}
      >
        <Chip value="shopee">Shopee</Chip>
        <Chip value="lazada" disabled title="Đang phát triển">
          Lazada
        </Chip>
        <Chip value="tiktok" disabled title="Đang phát triển">
          Tiktok
        </Chip>
      </Chip.Group>
    </Stack>
  );
};
