import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { motion } from 'motion/react';

import SectionHeading from '@/components/common/section-heading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router';
import { useUserRegisterMutation } from '@/redux/api/userApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'sonner';
import { UserSchema } from '@/schemas/user.schema';
import { setUser } from '@/redux/features/authSlice';
import LoadingWithOverlay from '@/components/common/loading-overlay';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/back-button';

type TRegisterFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: 'vendor' | 'customer';
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormData>({
    resolver: zodResolver(UserSchema.registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const onSubmit = async (data: TRegisterFormData) => {
    const toastId = toast.loading('loading...');
    try {
      const registerData = { ...data };
      const res = await userRegister(registerData).unwrap();

      const role = res.data?.user?.role;

      dispatch(
        setUser({ user: res.data?.user, token: res.data?.accessToken }),
      );

      toast.success('Register success!', { id: toastId, duration: 2000 });
      navigate(`/dashboard/${role}/home`);
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to register!';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace={true} />;
  }

  return (
    <>
      {isLoading && <LoadingWithOverlay />}
      <div className="relative mt-[80px] flex min-h-screen justify-center bg-gray-50 bg-[url('https://images.pexels.com/photos/927629/pexels-photo-927629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat sm:px-6 md:mt-0 md:py-12 lg:px-8">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex justify-center w-full">
          <motion.div
            className="relative w-full max-w-md p-1 bg-white rounded shadow md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <SectionHeading heading="Register" />
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-green-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    {...register('name')}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-green-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    {...register('email')}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-green-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.password
                          ? 'border-red-500'
                          : 'border-gray-300 focus:border-green-700'
                      } bg-gray-100 px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 ${
                        errors.password
                          ? 'focus:ring-red-500'
                          : 'focus:ring-green-700'
                      } sm:text-sm`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-green-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium text-green-700"
                  >
                    Password Confirm
                  </label>
                  <div className="relative">
                    <input
                      id="passwordConfirm"
                      type={showPasswordConfirm ? 'text' : 'password'}
                      {...register('passwordConfirm')}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.passwordConfirm
                          ? 'border-red-500'
                          : 'border-gray-300 focus:border-green-700'
                      } bg-gray-100 px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 ${
                        errors.passwordConfirm
                          ? 'focus:ring-red-500'
                          : 'focus:ring-green-700'
                      } sm:text-sm`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordConfirmVisibility}
                      className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-green-700"
                    >
                      {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.passwordConfirm && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </motion.div>
              </div>

              <div>
                {/* Register As Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-green-700">
                    Register As
                  </label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="vendor"
                        {...register('role')}
                        className="mr-2 text-green-700 focus:ring-green-700"
                      />
                      Vendor
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="customer"
                        {...register('role')}
                        className="mr-2 text-green-700 focus:ring-green-700"
                      />
                      Customer
                    </label>
                  </div>
                  {errors.role && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.role.message}
                    </p>
                  )}
                </motion.div>
              </div>

              <div>
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </div>
            </form>

            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/auth/login"
                  className="font-medium text-green-700 hover:text-green-800"
                >
                  Login
                </Link>
              </p>
            </motion.div>
            <div className="absolute left-5 top-5">
              <BackButton />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
