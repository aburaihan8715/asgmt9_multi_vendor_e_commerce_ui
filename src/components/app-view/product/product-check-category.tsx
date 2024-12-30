import { Checkbox } from '@/components/ui/checkbox';
import { ICategory } from '@/interface/category.interface';
import { useGetAllCategoriesQuery } from '@/redux/api/category-api';

interface IItem {
  label: string;
  value: string;
}

export function ProductCheckCategory() {
  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery(null);

  const categories = categoryData?.data || [];

  const checkedItemsData = categories?.map((item: ICategory) => {
    return {
      label: item.name,
      value: item._id,
    };
  });

  const items = checkedItemsData?.map((item: IItem) => {
    return (
      <div key={item.label} className="flex items-center space-x-2">
        <Checkbox id={item.label} />
        <label
          htmlFor={item.label}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {item.label}
        </label>
      </div>
    );
  });

  if (isCategoryLoading) {
    return 'loading category...';
  }

  return <div className="space-y-2">{items}</div>;
}
