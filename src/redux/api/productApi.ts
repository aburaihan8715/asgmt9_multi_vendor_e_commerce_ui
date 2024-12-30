import { baseApi } from '@/redux/api/baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE PRODUCT
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/api/v1/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),

    // GET ALL PRODUCTS
    getAllProducts: builder.query({
      query: ({
        searchQuery,
        page,
        limit,
        sortValue,
        priceRangeValue,
      }) => {
        let queryString = `/api/v1/products`;

        const params = new URLSearchParams();

        if (searchQuery) params.append('searchTerm', searchQuery);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);

        if (sortValue) {
          if (sortValue === 'asc') {
            params.append('sort', 'name');
          } else if (sortValue === 'desc') {
            params.append('sort', '-name');
          } else if (sortValue === 'price-high') {
            params.append('sort', '-price');
          } else if (sortValue === 'price-low') {
            params.append('sort', 'price');
          } else if (sortValue === 'default') {
            params.append('sort', '');
          }
        }

        if (priceRangeValue) {
          if (priceRangeValue === 'default') {
            params.append('price[gt]', '0');
          } else if (priceRangeValue === '1-30') {
            const minValue = priceRangeValue.split('-')[0];
            const maxValue = priceRangeValue.split('-')[1];
            params.append('price[gte]', minValue);
            params.append('price[lte]', maxValue);
          } else if (priceRangeValue === '30-60') {
            const minValue = priceRangeValue.split('-')[0];
            const maxValue = priceRangeValue.split('-')[1];
            params.append('price[gte]', minValue);
            params.append('price[lte]', maxValue);
          } else if (priceRangeValue === '60-100') {
            const minValue = priceRangeValue.split('-')[0];
            const maxValue = priceRangeValue.split('-')[1];
            params.append('price[gte]', minValue);
            params.append('price[lte]', maxValue);
          } else if (priceRangeValue === '100-plus') {
            const value = priceRangeValue.split('-')[0];
            params.append('price[gte]', value);
          }
        }

        if (params.toString()) queryString += `?${params.toString()}`;

        return {
          url: queryString,
          method: 'GET',
        };
      },
      providesTags: ['products'],
    }),

    // GET FEATURED PRODUCTS
    getFeaturedProducts: builder.query({
      query: () => {
        return {
          url: '/api/v1/products/featured-products',
          method: 'GET',
        };
      },
      providesTags: ['products'],
    }),

    // GET SINGLE PRODUCT
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/api/v1/products/${id}`,
          method: 'GET',
        };
      },
    }),

    // UPDATE PRODUCT
    updateProduct: builder.mutation({
      query: ({ id, dataForUpdate }) => {
        return {
          url: `/api/v1/products/${id}`,
          method: 'PATCH',
          body: dataForUpdate,
        };
      },
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useGetFeaturedProductsQuery,
} = productApi;
