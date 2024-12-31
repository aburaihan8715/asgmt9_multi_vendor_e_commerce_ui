import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ICategory } from '@/interface/category.interface';
import { useGetAllCategoriesQuery } from '@/redux/features/category/category-api';
import { setCategoryValue } from '@/redux/features/product/product-filter-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

interface IItem {
  label: string;
  value: string;
}

export function ProductRadioCategory() {
  const dispatch = useAppDispatch();
  const { categoryValue } = useAppSelector(
    (state: RootState) => state.productFilter,
  );
  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery(null);

  const categories = categoryData?.data || [];

  const itemsData = categories?.map((item: ICategory) => {
    return {
      label: item.name,
      value: item._id,
    };
  });

  if (isCategoryLoading) {
    return 'loading category...';
  }

  return (
    <RadioGroup
      value={categoryValue || ''}
      onValueChange={(value) => dispatch(setCategoryValue(value))}
    >
      {itemsData?.map((item: IItem) => (
        <div key={item?.label} className="flex items-center space-x-2">
          <RadioGroupItem value={item.value} id={item?.label} />
          <Label htmlFor={item?.label}>{item?.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
