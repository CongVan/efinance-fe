import { Badge, Code, Group, Title } from '@mantine/core';
import { Box } from '@mantine/core';

export const AppContainer = ({
  title,
  count = null,
  children,
  extraHeader = null,
  filterContainer = null,
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex' }} mb={16}>
        <Group>
          <Title order={2}>{title}</Title>
          {count != null && <Badge size="xl">{count}</Badge>}
        </Group>

        {extraHeader && <Box ml="auto">{extraHeader}</Box>}
      </Box>
      {filterContainer && <Box my={'md'}>{filterContainer}</Box>}
      <Box>{children}</Box>
    </Box>
  );
};
