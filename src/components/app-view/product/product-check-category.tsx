import { Checkbox } from '@/components/ui/checkbox';

export function ProductCheckCategory() {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="item1" />
        <label
          htmlFor="item1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          item1
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="item2" />
        <label
          htmlFor="item2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          item2
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="item3" />
        <label
          htmlFor="item3"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          item3
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="item4" />
        <label
          htmlFor="item4"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          item4
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="item5" />
        <label
          htmlFor="item5"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          item5
        </label>
      </div>
    </div>
  );
}
