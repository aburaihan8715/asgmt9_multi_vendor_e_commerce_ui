import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeading from '@/components/common/section-heading';
import { FaPlusSquare } from 'react-icons/fa';

import { UserSchema } from '@/schemas/user.schema';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  useGetSingleUserQuery,
  useUpdateProfileMutation,
} from '@/redux/api/userApi';
import LoadingWithOverlay from '@/components/common/loading-overlay';
import { toast } from 'sonner';
import { updateProfile } from '@/redux/features/authSlice';
import { useNavigate } from 'react-router';
import { IUser } from '@/interface/user.interface';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/back-button';

// Interface for the form data
interface IUpdateProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UpdateProfilePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const id = useAppSelector((state) => state.auth?.user?._id);
  const { data, isLoading: singleUserLoading } = useGetSingleUserQuery(id);
  const user: IUser = useMemo(() => data?.data || {}, [data]);
  const navigate = useNavigate();

  const [updateProfileMutation, { isLoading: updateUserLoading }] =
    useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateProfileFormData>({
    resolver: zodResolver(UserSchema.updateProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: IUpdateProfileFormData) => {
    const toastId = toast.loading('loading...');
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      if (file) {
        formData.append('file', file);
      }

      // NOTE: only for login purpose
      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });

      const res = await updateProfileMutation(formData).unwrap();
      const updatedUser = res?.data;

      dispatch(updateProfile(updatedUser));
      toast.success('Update success!', { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
    } catch (error: any) {
      console.log(error);
      const message = error.data.message || 'Failed to update profile!';
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Generate a preview URL for the selected file
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  return (
    <>
      {singleUserLoading || (updateUserLoading && <LoadingWithOverlay />)}
      <div className="flex items-center justify-center min-h-screen py-10 bg-gray-100 md:mt-0">
        <div className="relative w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center">
            <SectionHeading heading="Update your profile" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name" className="text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                disabled
                {...register('email')}
                className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="text-gray-700">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                {...register('phone')}
                className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.phone ? 'border-red-500' : ''
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address" className="text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                {...register('address')}
                className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.address ? 'border-red-500' : ''
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address?.message}
                </p>
              )}
            </div>

            <div className="">
              {/* Show the preview if a file is selected */}
              {preview ? (
                <img
                  src={preview}
                  alt="User photo preview"
                  width={96}
                  height={96}
                  className="object-cover w-24 h-24 mb-4 rounded-full"
                />
              ) : (
                <img
                  src={
                    user && user?.profilePhoto
                      ? user?.profilePhoto
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                  }
                  alt="User photo"
                  width={96}
                  height={96}
                  className="object-cover w-24 h-24 mb-4 rounded-full"
                />
              )}

              <input
                type="file"
                accept="image/*"
                id="photo"
                onChange={handleFileChange}
                className="hidden w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-green-700 hover:file:bg-green-100"
              />
              <label
                htmlFor="photo"
                className="flex items-center gap-2 ml-2 text-xl text-gray-700 cursor-pointer w-fit"
              >
                <FaPlusSquare />
                <span>Image</span>
              </label>
            </div>

            <div className="text-right">
              <Button type="submit">Save update</Button>
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

export default UpdateProfilePage;
