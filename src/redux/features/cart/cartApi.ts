import { baseApi } from '@/redux/base-api';

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add to cart mutation
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/api/v1/carts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['carts'],
    }),

    // Get cart items
    getCart: builder.query({
      query: () => ({
        url: `/api/v1/carts`,
        method: 'GET',
      }),
      providesTags: ['carts'],
    }),

    // Increment quantity mutation
    incrementQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/api/v1/carts/increment/${productId}`,
        method: 'PATCH',
        body: { quantity: quantity + 1 }, // Update quantity
      }),
      invalidatesTags: ['carts'],
    }),

    // Decrement quantity mutation
    decrementQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/api/v1/carts/decrement/${productId}`,
        method: 'PATCH',
        body: { quantity: quantity - 1 }, // Update quantity
      }),
      invalidatesTags: ['carts'],
    }),

    // Remove item
    removeCartItem: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/carts/remove/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['carts'],
    }),

    // Delete a cart item (soft delete)
    clearCart: builder.mutation({
      query: (cartId) => ({
        url: `/api/v1/carts/${cartId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['carts'],
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useAddToCartMutation,
  useGetCartQuery,
  useIncrementQuantityMutation,
  useDecrementQuantityMutation,
  useClearCartMutation,
  useRemoveCartItemMutation,
} = cartApi;
