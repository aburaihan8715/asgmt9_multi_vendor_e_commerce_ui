import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/common/section-heading';
import defaultProductImage from '@/assets/images/default_product.jpg';

import { Link } from 'react-router';
import {
  useDecrementQuantityMutation,
  useGetCartQuery,
  useIncrementQuantityMutation,
  useRemoveCartItemMutation,
} from '@/redux/features/cart/cartApi';
import { toast } from 'sonner';
import { IProduct } from '@/interface/product.interface';
import { ICartItem } from '@/interface/cart.interface';

const CartPage = () => {
  const { data: cartData, isLoading: cartIsLoading } =
    useGetCartQuery(null);
  const cartProducts = cartData?.data[0]?.items || [];
  const totalAmount = cartData?.data[0]?.totalAmount;
  const subTotal = cartData?.data[0]?.totalAmount;
  // const shop = cartData?.data[0]?.shop;

  if (cartIsLoading) return <div>Loading...</div>;

  return (
    <section className="px-1 py-10 md:px-10 md:py-20">
      <div className="flex justify-center">
        <SectionHeading heading="Your Bag" />
      </div>
      <div className="mb-5">
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <ul className="flex flex-[4] flex-col justify-center rounded border">
          {cartProducts?.length > 0 &&
            cartProducts?.map((item: any) => (
              <CartProduct key={item?.product?._id} item={item} />
            ))}

          {cartProducts?.length < 1 && (
            <div className="flex justify-center">
              <h3 className="sm:2xl title-font max-w-max border-primary bg-gradient-to-r from-orange-600 via-green-700 to-fuchsia-700 bg-clip-text text-center text-3xl font-bold text-gray-900 text-transparent md:text-3xl">
                No Product Added Yet!!
              </h3>
            </div>
          )}
        </ul>

        <div className="flex-[1]">
          <div className="space-y-2 rounded-md border p-1 md:p-5">
            <h4 className="text-2xl font-medium text-gray-700">
              Order Summary
            </h4>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$ {subTotal?.toFixed(2) || '00.0'}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span>$ 00.0</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping Charge</span>
              <span>$ 00.0</span>
            </div>

            <div className="flex justify-between text-xl font-medium">
              <span>Total</span>
              <span>$ {totalAmount?.toFixed(2) || '0.00'}</span>
            </div>

            <div>
              {cartProducts?.length < 1 ? (
                <div className="w-full cursor-not-allowed">
                  <Button disabled className="w-full cursor-not-allowed">
                    Go For Payment
                  </Button>
                </div>
              ) : (
                <Link to={`/payment/payment-options`} className="w-full">
                  <Button className="w-full">Go For Payment</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;

const CartProduct = ({ item }: { item: ICartItem }) => {
  const quantity = item?.quantity;
  const cartData = item?.product as IProduct;
  const images = cartData?.images || [];
  const coverImage1 = images.length > 0 && images[0];

  const [incrementQuantityMutation] = useIncrementQuantityMutation();
  const [decrementQuantityMutation] = useDecrementQuantityMutation();
  const [removeCartItemMutation] = useRemoveCartItemMutation();

  const handleIncrement = async (productId: string) => {
    const toastId = toast.loading('loading...');
    try {
      await incrementQuantityMutation({ productId, quantity });
      toast.success('Incremented successfully!', {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to increment';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  const handleDecrement = async (productId: string) => {
    const toastId = toast.loading('loading...');
    try {
      await decrementQuantityMutation({ productId, quantity });
      toast.success('Decremented successfully!', {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to decrement';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  const handleRemoveCartItem = async (productId: string) => {
    const toastId = toast.loading('loading...');
    try {
      await removeCartItemMutation(productId);
      toast.success('Deleted successfully!', {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to delete';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      {/* {(isIncrementLoading ||
        isDecrementLoading ||
        isRemoveCartItemLoading) && <LoadingWithOverlay />} */}
      <li className="flex h-full flex-col items-center justify-between gap-10 border-b p-2 md:flex-row">
        <div className="flex-[2]">
          <div className="aspect-[16/9]">
            {/* Set the aspect ratio here */}
            <img
              src={coverImage1 || defaultProductImage}
              alt="product"
              className="h-full w-full rounded object-cover"
            />
          </div>
        </div>

        <div className="flex flex-[5] flex-col gap-4">
          <h4 className="text-xl font-medium md:text-3xl">
            {cartData?.name}
          </h4>
          <p>{cartData.description}</p>
          <div className="text-xl text-gray-700 md:text-3xl">
            $ {cartData?.price}
          </div>

          <div className="flex">
            <div className="flex w-1/3 gap-10">
              <div className="flex gap-3">
                <button
                  onClick={() => handleDecrement(cartData?._id)}
                  className="text-2xl"
                >
                  -
                </button>
                <span className="flex h-10 w-10 items-center justify-center border">
                  {quantity || 1}
                </span>
                <button
                  onClick={() => handleIncrement(cartData?._id)}
                  className="text-2xl"
                >
                  +
                </button>
              </div>

              <div className="flex w-full md:w-auto">
                <Button
                  className="mr-1 border md:mr-20 md:w-auto"
                  onClick={() => handleRemoveCartItem(cartData?._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
