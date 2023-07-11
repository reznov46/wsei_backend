const DEFAULT_PAGE_SIZE = 6;

export const getPageSizeParam = (size?: number) =>
  `pageSize=${size ?? DEFAULT_PAGE_SIZE}`;

export const getPageParam = (size: number) => `page=${size}`;
export const getCreatedByParam = (id: string) => `createdBy=${id}`;
