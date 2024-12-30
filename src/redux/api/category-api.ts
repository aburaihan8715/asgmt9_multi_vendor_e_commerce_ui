import { baseApi } from '@/redux/api/baseApi';

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/api/v1/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),

    getAllCategories: builder.query({
      query: () => {
        return {
          url: `/api/v1/categories`,
          method: 'GET',
        };
      },
      providesTags: ['categories'],
    }),

    getSingleCategory: builder.query({
      query: (id) => {
        return {
          url: `/api/v1/categories/${id}`,
          method: 'GET',
        };
      },
    }),

    updateCategory: builder.mutation({
      query: ({ id, dataForUpdate }) => {
        return {
          url: `/api/v1/categories/${id}`,
          method: 'PATCH',
          body: dataForUpdate,
        };
      },
      invalidatesTags: ['categories'],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
