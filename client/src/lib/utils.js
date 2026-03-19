export function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₸';
}

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} мин`;
  if (mins === 0) return `${hours} ч`;
  return `${hours} ч ${mins} мин`;
}

export function getLocalizedField(obj, field, locale) {
  const key = `${field}${locale === 'kz' ? 'Kz' : 'Ru'}`;
  return obj[key] || obj[`${field}Ru`] || '';
}

export function getLevelColor(level) {
  switch (level) {
    case 'BEGINNER': return 'text-accent-green';
    case 'INTERMEDIATE': return 'text-accent-blue';
    case 'ADVANCED': return 'text-accent-red';
    default: return 'text-text-secondary';
  }
}
