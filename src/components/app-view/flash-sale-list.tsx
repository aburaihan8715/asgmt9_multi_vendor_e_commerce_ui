import SubHeading from '@/components/common/sub-heading';
import FlashSaleCard from './flash-sale-card';
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import { IProduct } from '@/interface/product.interface';

const FlashSaleList = () => {
  const { data } = useGetAllProductsQuery({});
  const products: IProduct[] = data?.data?.result || [];
  return (
    <section className="mt-20">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-2 md:px-5 lg:px-10">
        <div className="mb-2">
          <SubHeading subHeading="Flash Sale" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
          {products.map((product) => (
            <FlashSaleCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSaleList;
