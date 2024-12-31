import { baseApi } from '@/redux/base-api';

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (data) => ({
        url: '/api/v1/shops',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['shops'],
    }),

    getAllShops: builder.query({
      query: () => {
        return {
          url: `/api/v1/shops`,
          method: 'GET',
        };
      },
      providesTags: ['shops'],
    }),

    getSingleShop: builder.query({
      query: (id) => {
        return {
          url: `/api/v1/shops/${id}`,
          method: 'GET',
        };
      },
    }),

    updateShop: builder.mutation({
      query: ({ id, dataForUpdate }) => {
        return {
          url: `/api/v1/shops/${id}`,
          method: 'PATCH',
          body: dataForUpdate,
        };
      },
      invalidatesTags: ['shops'],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetAllShopsQuery,
  useGetSingleShopQuery,
  useUpdateShopMutation,
} = shopApi;
