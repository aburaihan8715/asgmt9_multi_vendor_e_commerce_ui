import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SectionHeading from '@/components/common/section-heading';
import { AuthSchema } from '@/schemas/auth.schema';
import { useChangePasswordMutation } from '@/redux/features/auth/authApi';
import LoadingWithOverlay from '@/components/common/loading-overlay';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/back-button';

interface IPasswordChangeFormValues {
  oldPassword: string;
  newPassword: string;
}

const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordChangeFormValues>({
    resolver: zodResolver(AuthSchema.passwordChangeSchema),
  });

  const [changePasswordMutation, { isLoading }] =
    useChangePasswordMutation();

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data: IPasswordChangeFormValues) => {
    const toastId = toast.loading('loading...');
    try {
      await changePasswordMutation(data).unwrap();
      toast.success('Password changed success!', {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to change password!';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      {isLoading && <LoadingWithOverlay />}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 py-10 md:mt-0">
        <div className="relative w-full max-w-lg space-y-6 rounded-lg bg-white p-8 shadow-md">
          <div className="flex justify-center">
            <SectionHeading heading="Change password" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Current Password */}
            <div className="form-group">
              <label htmlFor="oldPassword" className="block text-gray-700">
                Old Password
              </label>
              <div className="relative">
                <input
                  id="oldPassword"
                  type={showPassword.oldPassword ? 'text' : 'password'}
                  {...register('oldPassword')}
                  className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.oldPassword ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('oldPassword')}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="form-group">
              <label htmlFor="newPassword" className="block text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword.newPassword ? 'text' : 'password'}
                  {...register('newPassword')}
                  className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.newPassword ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <Button type="submit">Change Password</Button>
            </div>
          </form>

          <div className="absolute left-5 top-5">
            <BackButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
