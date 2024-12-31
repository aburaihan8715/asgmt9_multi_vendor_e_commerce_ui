import { ProductRadioCategory } from './product-radio-category';
import ProductRadioShop from './product-radio-shop';
import ProductRadioPriceRange from './product-radio-price-range';
import FilterClearButton from './filter-clear-button';

const ProductFilterBar = () => {
  return (
    <section className="">
      <div className="flex">
        <h3 className="mb-3 flex-1 text-xl font-semibold">Filters:</h3>
      </div>
      <div className="space-y-10">
        <div className="space-y-1">
          <h5 className="font-semibold">Category</h5>
          <ProductRadioCategory />
        </div>

        <div className="space-y-1">
          <h5 className="font-semibold">Shops</h5>
          <ProductRadioShop />
        </div>

        <div className="space-y-1">
          <h5 className="font-semibold">Price Range</h5>
          <ProductRadioPriceRange />
        </div>
        <div>
          <FilterClearButton />
        </div>
      </div>
    </section>
  );
};

export default ProductFilterBar;
