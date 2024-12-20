import { Button } from '@/components/ui/button';
import LoadingWithOverlay from '@/components/common/loading-overlay';
import { IProduct } from '@/interface/product.interface';
import { useGetSingleProductQuery } from '@/redux/api/productApi';
import { useAppSelector } from '@/redux/hooks';

import { Rating } from '@smastrom/react-rating';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import {
  useAddToCartMutation,
  useGetCartQuery,
} from '@/redux/api/cartApi';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading: isProductLoading } =
    useGetSingleProductQuery(id);
  const product: IProduct = productData?.data || {};

  const { data: cartData } = useGetCartQuery(null);
  const [addToCart, { isLoading: isAddToCartLoading }] =
    useAddToCartMutation();

  const cartItems = cartData?.data[0]?.items || [];

  console.log('cartItems', cartItems);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAddToCart = async (product: IProduct) => {
    if (!isAuthenticated) {
      toast.warning('Please login first!!');
      return navigate('/auth/login');
    }

    if (product.inventoryCount < 1) {
      return toast.warning('Product is not available!!');
    }

    const isAlreadyAdded = cartItems.find(
      (item: any) => item.product._id === product._id,
    );

    if (isAlreadyAdded) {
      return toast.warning('Product already added!');
    }

    const toastId = toast.loading('loading...');

    const cartData = { items: [{ product: product._id }] };
    try {
      await addToCart(cartData).unwrap();
      toast.success('Product added successfully!', { id: toastId });
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to add product!';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      {(isProductLoading || isAddToCartLoading) && <LoadingWithOverlay />}
      <section className="h-full px-1 py-10 md:h-[90vh] md:px-10 md:py-20">
        <div className="flex flex-col h-full gap-10 md:flex-row">
          <div className="flex-1 h-full">
            <img
              className="object-cover w-full h-full rounded"
              src="https://images.pexels.com/photos/927629/pexels-photo-927629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>

          <div className="flex flex-[2] flex-col gap-2 md:gap-5">
            <h1 className="text-3xl font-medium text-[#212529]">
              {product.name}
            </h1>
            <p>{product.description}</p>

            <p className="text-3xl text-gray-700">$ {product.price}</p>

            <div>
              <span>
                <strong className="text-gray-700">Brand:</strong> product
                brand
              </span>
            </div>

            <div>
              <span>
                <strong className="text-gray-700">Stock:</strong>
                {product.inventoryCount}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <Rating style={{ maxWidth: 100 }} value={5} readOnly />
              <span>4.5</span>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>

              <Link to="/cart">
                <Button className="bg-transparent text-neutral-800 ring-1 ring-primary hover:bg-primary hover:text-neutral-50 hover:ring-1">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
