import { Title } from '@mantine/core';
import { Box } from '@mantine/core';

export const AppContainer = ({
  title,
  children,
  extraHeader = null,
  filterContainer = null,
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex' }} mb={16}>
        <Title>{title}</Title>
        {extraHeader && <Box ml="auto">{extraHeader}</Box>}
      </Box>
      {filterContainer && <Box my={'md'}>{filterContainer}</Box>}
      <Box>{children}</Box>
    </Box>
  );
};
