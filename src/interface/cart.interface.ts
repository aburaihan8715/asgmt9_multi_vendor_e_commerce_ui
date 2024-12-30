import { IProduct } from './product.interface';
import { IShop } from './shop.interface';
import { IUser } from './user.interface';

export interface ICartItem {
  product: string | IProduct;
  quantity: number;
}

export interface ICart {
  _id: string;
  user: string | IUser;
  shop: string | IShop;
  items: ICartItem[];
  totalItems?: number;
  totalAmount?: number;
  isDeleted?: boolean;
}
