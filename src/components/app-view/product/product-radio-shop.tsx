import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IShop } from '@/interface/shop.interface';
import { setShopValue } from '@/redux/features/product/product-filter-slice';
import { useGetAllShopsQuery } from '@/redux/features/shop/shop-api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

interface IItem {
  label: string;
  value: string;
}
const ProductRadioShop = () => {
  const dispatch = useAppDispatch();
  const { shopValue } = useAppSelector(
    (state: RootState) => state.productFilter,
  );
  const { data: shopData, isLoading: isShopLoading } =
    useGetAllShopsQuery(null);

  const shops = shopData?.data || [];

  const itemsData = shops?.map((item: IShop) => {
    return {
      label: item.name,
      value: item._id,
    };
  });

  if (isShopLoading) {
    return 'loading shops...';
  }

  return (
    <RadioGroup
      value={shopValue || ''}
      onValueChange={(value) => dispatch(setShopValue(value))}
    >
      {itemsData?.map((item: IItem) => (
        <div key={item?.label} className="flex items-center space-x-2">
          <RadioGroupItem value={item.value} id={item?.label} />
          <Label htmlFor={item?.label}>{item?.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ProductRadioShop;
