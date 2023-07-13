const DEFAULT_PAGE_SIZE = 8;

export const getPageSizeParam = (size: number = DEFAULT_PAGE_SIZE) =>
  `pageSize=${size}`;
export const getPageNumParam = (num: number = 0) => `page=${num}`;
export const getCreatedByParam = (id: string) => `createdBy=${id}`;
export const getCategoryIdParam = (id: string) => `categoryId=${id}`;
