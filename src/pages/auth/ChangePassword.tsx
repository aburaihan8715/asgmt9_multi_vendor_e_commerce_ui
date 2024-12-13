import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SectionHeading from '@/components/ui/SectionHeading';
import { AuthSchema } from '@/schemas/auth.schema';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import { toast } from 'sonner';

interface IPasswordChangeFormValues {
  oldPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
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
      <div className="mx-auto mt-12 bg-white rounded-md md:p-8">
        <div className="flex justify-center">
          <SectionHeading heading="Change Password" />
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
                className="absolute inset-y-0 flex items-center text-gray-500 right-3"
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
                className="absolute inset-y-0 flex items-center text-gray-500 right-3"
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
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 md:w-fit"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
