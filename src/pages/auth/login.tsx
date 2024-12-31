import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeading from '@/components/common/section-heading';
import { motion } from 'motion/react';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthSchema } from '@/schemas/auth.schema';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import { setUser } from '@/redux/features/auth/authSlice';
import LoadingWithOverlay from '@/components/common/loading-overlay';
import { Button } from '@/components/ui/button';

import BackButton from '@/components/common/back-button';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(AuthSchema.loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    const toastId = toast.loading('loading...');
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const role = res.data?.user?.role;

      const navigateTo =
        location?.state?.from?.pathname || `/${role}/dashboard`;
      dispatch(
        setUser({ user: res.data?.user, token: res.data?.accessToken }),
      );

      toast.success('login success!', { id: toastId, duration: 2000 });
      navigate(`${navigateTo}`);
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to login';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace={true} />;
  }

  return (
    <>
      {isLoading && <LoadingWithOverlay />}
      <div className="mt-[80px] flex min-h-screen justify-center bg-gray-50 bg-[url('https://images.pexels.com/photos/5475752/pexels-photo-5475752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat sm:px-6 md:mt-0 md:py-12 lg:px-8">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex w-full justify-center">
          <motion.div
            className="relative w-full max-w-md rounded-lg bg-white p-1 shadow-lg md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex justify-center">
              <SectionHeading heading="Login" />
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-green-700"
                    >
                      Email
                    </label>
                    <Link
                      to="/auth/forget-password"
                      className="text-sm text-green-700 hover:text-green-800"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-green-700'
                    } bg-gray-100 px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'focus:ring-red-500'
                        : 'focus:ring-green-700'
                    } sm:text-sm`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
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
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-green-700"
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
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link
                  to="/auth/register"
                  className="font-medium text-green-700 hover:text-green-800"
                >
                  Register
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

export default LoginPage;
