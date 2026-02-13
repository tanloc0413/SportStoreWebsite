export const formatMoney = (amount) => {
  if (amount === null || amount === undefined) return '';

  return Number(amount).toLocaleString('vi-VN') + 'đ';
};

export const formatDateVN = (dateStr) => {
  const date = new Date(dateStr);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} - ${day}/${month}/${year}`;
};

export function formatMoneyVN(value) {
  if (value == null || isNaN(value)) return '';

  const abs = Math.abs(value);

  const format = (num, unit) => {
    const result = (num).toFixed(1).replace(/\.0$/, '');
    return `${result} ${unit}`.trim();
  };

  if (abs >= 1_000_000_000) {
    return format(value / 1_000_000_000, 'tỷ');
  }

  if (abs >= 1_000_000) {
    return format(value / 1_000_000, 'triệu');
  }

  if (abs >= 1_000) {
    return format(value / 1_000, 'k');
  }

  return value.toString();
}
