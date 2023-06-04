export const convertDate = (date: string): string =>
  new Date(date).toLocaleDateString('pl-PL');
