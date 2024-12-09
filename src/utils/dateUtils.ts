// Convert UK date format (DD/MM/YYYY) to ISO format (YYYY-MM-DD)
export const ukToIsoDate = (date: string): string => {
  const [day, month, year] = date.split('/').map(Number);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

// Convert ISO date format (YYYY-MM-DD) to UK date format (DD/MM/YYYY)
export const isoToUkDate = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};
