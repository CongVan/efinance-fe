export const formatCurrency = (number = 0) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(number);

export const formatNumber = (number = 0) =>
  new Intl.NumberFormat('en-US', { style: 'decimal' })
    .format(number)
    .replaceAll(',', '.');
