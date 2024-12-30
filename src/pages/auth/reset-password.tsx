import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthSchema } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import SubHeading from '@/components/common/sub-heading';
import { Link, useSearchParams } from 'react-router';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import LoadingWithOverlay from '@/components/common/loading-overlay';
import { toast } from 'sonner';
import BackButton from '@/components/common/back-button';

type TResetPasswordFormValues = {
  newPassword: string;
};

const ResetPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordFormValues>({
    resolver: zodResolver(AuthSchema.resetPasswordSchema),
  });

  const [resetPasswordMutation, { isLoading }] =
    useResetPasswordMutation();

  const onSubmit = async (data: TResetPasswordFormValues) => {
    const toastId = toast.loading('loading...');
    try {
      const passwordData = {
        email,
        token,
        newPassword: data.newPassword,
      };

      await resetPasswordMutation(passwordData).unwrap();
      toast.success('Password reset success!', {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to reset password!';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {isLoading && <LoadingWithOverlay />}
      <div className="mt-[80px] flex min-h-screen items-center justify-center bg-gray-100 md:mt-0">
        <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div>
            <SubHeading subHeading="Reset Password" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 space-y-6"
          >
            {/* New Password Input */}
            <div className="relative flex flex-col">
              <label
                htmlFor="new-password"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                {...register('newPassword')}
                className={`mt-1 block w-full rounded-md border p-2 focus:outline-none focus:ring-2 ${
                  errors.newPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute text-gray-600 right-3 top-9 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword?.message}
                </p>
              )}
            </div>

            {/* Reset Password Button */}
            <div>
              <Button className="w-full" type="submit">
                Reset Password
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-primary hover:underline"
            >
              Back to Login
            </Link>
          </div>

          <div className="absolute left-5 top-5">
            <BackButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
