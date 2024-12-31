import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setSortValue } from '@/redux/features/product/product-filter-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { FaSortAlphaDownAlt } from 'react-icons/fa';

export function ProductSort() {
  const dispatch = useAppDispatch();
  const { sortValue } = useAppSelector(
    (state: RootState) => state.productFilter,
  );

  return (
    <Select
      value={sortValue || ''}
      onValueChange={(value) => dispatch(setSortValue(value))}
    >
      <SelectTrigger className="w-[180px]">
        <FaSortAlphaDownAlt />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="price-high">Price: high to low</SelectItem>
          <SelectItem value="price-low">Price: low to high</SelectItem>
          <SelectItem value="asc">Title: A to Z</SelectItem>
          <SelectItem value="desc">Title: Z to A</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
