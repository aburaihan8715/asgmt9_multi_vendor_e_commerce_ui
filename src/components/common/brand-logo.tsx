import { LuShoppingBasket } from 'react-icons/lu';

const BrandLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <p className="text-2xl text-white">
        <LuShoppingBasket />
      </p>
      <p className="text-2xl font-semibold text-transparent text-gray-700 bg-gradient-to-r from-accent via-white to-fuchsia-700 bg-clip-text">
        EasyBuy
      </p>
    </div>
  );
};

export default BrandLogo;
