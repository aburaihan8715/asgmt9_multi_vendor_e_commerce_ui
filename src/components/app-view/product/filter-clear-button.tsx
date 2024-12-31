import { Button } from '@/components/ui/button';
import { clearFilters } from '@/redux/features/product/product-filter-slice';
import { useAppDispatch } from '@/redux/hooks';

const FilterClearButton = () => {
  const dispatch = useAppDispatch();
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  return (
    <Button onClick={() => handleClearFilters()} className="w-full flex-1">
      Clear filter
    </Button>
  );
};

export default FilterClearButton;
