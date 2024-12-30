import { IProduct } from '@/interface/product.interface';
import ProductCard from './product/product-card';

const FlashSaleCard = ({ product }: { product: IProduct }) => {
  return <ProductCard product={product} />;
};

export default FlashSaleCard;
