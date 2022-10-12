export const formatCurrency = (number = 0) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(number);

export const formatNumber = (number = 0) =>
  new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(number);

export const formatPercentage = (number = 0) =>
  new Intl.NumberFormat('vi-VN', { style: 'percent' }).format(number / 100);
