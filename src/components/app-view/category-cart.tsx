import { IProduct } from '@/interface/product.interface';
import ProductCard from './product/product-card';

const CategoryCard = ({ product }: { product: IProduct }) => {
  return <ProductCard product={product} />;
};

export default CategoryCard;
