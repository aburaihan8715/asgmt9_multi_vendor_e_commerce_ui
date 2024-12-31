import { baseApi } from '@/redux/base-api';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation({
      query: (loginData) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: loginData,
      }),
    }),

    // change password
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/api/v1/auth/change-password',
        method: 'POST',
        body: passwordData,
      }),
    }),

    // forget password
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: '/api/v1/auth/forget-password',
        method: 'POST',
        body: email,
      }),
    }),

    // reset password
    resetPassword: builder.mutation({
      query: ({ token, ...bodyData }) => ({
        url: '/api/v1/auth/reset-password',
        method: 'POST',
        body: bodyData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
