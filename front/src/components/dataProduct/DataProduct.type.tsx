
import { Companie, companieClass } from '../companie/Companie.type'
import { User, userClass } from '../user/User.type'
import { Product, productClass } from '../product/Product.type'

export interface DataProduct {
  id: string;
  website: string;
  category: string;
  productName: string;
  note: string;
  createdAt: Date;
  companie: Companie;
  user: User;
  product: Product;
}

export const dataProductClass: DataProduct = {
  id: '',
  website: '',
  productName: '',
  note: '',
  category: '',
  createdAt: new Date(),
  companie: companieClass,
  user: userClass,
  product: productClass
}
