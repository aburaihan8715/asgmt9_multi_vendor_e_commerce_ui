import { useAppDispatch } from '@/redux/hooks';
import { Input } from '../../ui/input';
import { useDebouncedCallback } from 'use-debounce';
import { setSearchQuery } from '@/redux/features/product-filter-slice';

const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const searchDebounce = useDebouncedCallback((value) => {
    dispatch(setSearchQuery(value));
  }, 500);

  return (
    <div className="z-50 flex justify-center px-4 py-3 bg-primary">
      <Input
        className="max-w-sm border border-accent bg-slate-50"
        type="search"
        name="search"
        id="search"
        onChange={(e) => searchDebounce(e.target.value)}
        placeholder="Search by product name..."
      />
    </div>
  );
};

export default ProductSearch;
