import { baseApi } from '@/redux/base-api';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: '/api/v1/orders/create-payment-intent',
        method: 'POST',
        body: data,
      }),
    }),

    addOrder: builder.mutation({
      query: (data) => ({
        url: '/api/v1/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['orders', 'carts'],
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useAddOrderMutation } =
  orderApi;
