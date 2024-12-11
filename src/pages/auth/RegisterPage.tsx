import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { motion } from 'motion/react';

import SectionHeading from '@/components/ui/SectionHeading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthSchema } from '@/schemas/auth.schema';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import { Link } from 'react-router';

type TRegisterFormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormData>({
    resolver: zodResolver(AuthSchema.registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const isPending = false;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: TRegisterFormData) => {
    console.log(data);
  };

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="mt-[80px] flex min-h-screen justify-center bg-gray-50 bg-[url('https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261_1280.jpg')] bg-cover bg-center bg-no-repeat sm:px-6 md:mt-0 md:py-12 lg:px-8">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex w-full justify-center">
          <motion.div
            className="w-full max-w-md rounded bg-white p-1 shadow md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex justify-center">
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
                    Username
                  </label>
                  <input
                    id="username"
                    {...register('username')}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm ${
                      errors.username
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm`}
                  />
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.username.message}
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
                      type={showPassword ? 'text' : 'password'}
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
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  Submit
                </button>
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
                  to="/login"
                  className="font-medium text-green-700 hover:text-green-800"
                >
                  Login
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
