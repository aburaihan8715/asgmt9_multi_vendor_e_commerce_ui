import { ProductCheckCategory } from './product-check-category';
import ProductRadioShop from './product-radio-shop';
import ProductRadioPriceRange from './product-radio-price-range';
import FilterClearButton from './filter-clear-button';

const ProductFilterBar = () => {
  return (
    <section className="">
      <div className="flex">
        <h3 className="flex-1 mb-3 text-xl font-semibold">Filters:</h3>
        <FilterClearButton />
      </div>
      <div className="space-y-10">
        <div className="space-y-1">
          <h5 className="font-semibold">Category</h5>
          <ProductCheckCategory />
        </div>

        <div className="space-y-1">
          <h5 className="font-semibold">Shops</h5>
          <ProductRadioShop />
        </div>

        <div className="space-y-1">
          <h5 className="font-semibold">Price Range</h5>
          <ProductRadioPriceRange />
        </div>
      </div>
    </section>
  );
};

export default ProductFilterBar;
