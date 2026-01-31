export const formatMoney = (amount) => {
  if (amount === null || amount === undefined) return '';

  return Number(amount).toLocaleString('vi-VN') + 'đ';
};