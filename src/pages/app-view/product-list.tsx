import ProductCard from '@/components/app-view/product/product-card';
import ProductFilterBar from '@/components/app-view/product/product-filter-bar';
import Pagination from '@/components/common/pagination';
import ProductSearch from '@/components/app-view/product/product-search';
import { ProductSort } from '@/components/app-view/product/product-sort';
import SubHeading from '@/components/common/sub-heading';
import { IProduct } from '@/interface/product.interface';
import { useGetAllProductsQuery } from '@/redux/api/productApi';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useState } from 'react';

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchQuery, sortValue, priceRangeValue } = useAppSelector(
    (state: RootState) => state.productFilter,
  );

  // console.log(priceRangeValue);

  const itemsPerPage = 10;
  const { data: productData, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchQuery,
    sortValue,
    priceRangeValue,
  });
  const result = productData?.data?.result;
  const meta = productData?.data?.meta;
  const products = result || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return 'loading...';
  }
  return (
    <>
      <div className="sticky top-[80px] z-10 hidden bg-white shadow-md md:block">
        <ProductSearch />
      </div>

      <section className="mt-20">
        <div className="w-full px-2 mx-auto max-w-7xl sm:px-2 md:px-5 lg:px-10">
          <div className="flex gap-10">
            <div className="flex-1">
              <ProductFilterBar />
            </div>
            <div className="flex-[3]">
              <div className="flex justify-between mb-2">
                <SubHeading subHeading="All Products" />
                <ProductSort />
              </div>
              <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                {products.map((product: IProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <div className="flex justify-start">
                <Pagination
                  currentPage={currentPage}
                  totalPages={meta?.totalPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
