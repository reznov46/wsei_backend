import { ProductCategory } from './ProductCategory';

export interface Product {
  id: string;
  name: string;
  price: number;
  isDeleted: boolean;
  description: string;
  fullDescription: string;
  createdAt: string;
  createdBy: string;
  productCategory: ProductCategory;
}
