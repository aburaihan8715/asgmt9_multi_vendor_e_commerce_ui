import { useGetFeaturedProductsQuery } from '@/redux/api/productApi';
import ProductCard from './product-card';
import SubHeading from '@/components/common/sub-heading';
import { useLocation } from 'react-router';
import { IProduct } from '@/interface/product.interface';

const ProductFeaturedList = () => {
  const { data } = useGetFeaturedProductsQuery(null);
  const featuredProducts = data?.data?.result || [];
  const location = useLocation();
  console.log(location.pathname);

  console.log(featuredProducts);

  return (
    <section className="mt-20">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-2 md:px-5 lg:px-10">
        <div className="mb-2">
          <SubHeading subHeading="Featured Products" />
        </div>
        <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
          {featuredProducts.map((product: IProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturedList;
