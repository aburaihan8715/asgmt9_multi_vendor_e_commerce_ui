import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { setPriceRangeValue } from '@/redux/features/product/product-filter-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

const priceRanges = [
  { id: 'item1', value: 'default', label: '(default)' },
  { id: 'item2', value: '1-30', label: '(1-30)' },
  { id: 'item3', value: '30-60', label: '(30-60)' },
  { id: 'item4', value: '60-100', label: '(60-100)' },
  { id: 'item5', value: '100-plus', label: '(100+)' },
];

const ProductRadioPriceRange = () => {
  const dispatch = useAppDispatch();
  const { priceRangeValue } = useAppSelector(
    (state: RootState) => state.productFilter,
  );

  return (
    <RadioGroup
      value={priceRangeValue || ''}
      onValueChange={(value) => dispatch(setPriceRangeValue(value))}
    >
      {priceRanges.map((range) => (
        <div key={range.id} className="flex items-center space-x-2">
          <RadioGroupItem value={range.value} id={range.id} />
          <Label htmlFor={range.id}>{range.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ProductRadioPriceRange;
