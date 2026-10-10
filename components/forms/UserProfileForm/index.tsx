"use client";
import { type Tables } from "@/lib/supabase/database.types";
import { userProfileSchema } from "@/schemas/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import EditUserProfile from "@/actions/edit-user-profile-action";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ErrorMessage";
import { FaXmark } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import DeleteProfileImageAction from "@/actions/delete-profile-image-action";
import { useState } from "react";
import { toast } from "react-toastify";

const UserProfileForm = ({
  initialValues,
  userId,
}: {
  initialValues: Pick<
    Tables<"Profiles">,
    "name" | "surname" | "username" | "bio" | "profile_image" | "interests"
  >;
  userId: string;
}) => {
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    initialValues.profile_image,
  );

  const userProfileImageSchema = userProfileSchema
    .omit({ profile_image: true })
    .extend({
      profile_image: z
        .unknown()
        .transform((value) => {
          return value as FileList;
        })
        .optional(),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userProfileImageSchema),
    defaultValues: {
      name: initialValues.name || undefined,
      surname: initialValues.surname || undefined,
      username: initialValues.username,
      bio: initialValues.bio || undefined,
      interests: initialValues.interests || undefined,
      profile_image: initialValues.profile_image || undefined,
    },
  });

  const imageUrl = initialValues.profile_image
    ? initialValues.profile_image.split("/Profile-Images/")[1]
    : null;

  const { mutate, error } = useMutation({
    mutationFn: EditUserProfile,
    onSuccess: () => {
      toast.success("Profile updated");
    },
  });

  const { mutate: deleteProfilImage, error: deleteError } = useMutation({
    mutationFn: DeleteProfileImageAction,
  });

  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((values) => {
          let imageForm = undefined;

          if (
            values.profile_image &&
            typeof values.profile_image !== "string" &&
            values.profile_image.length > 0
          ) {
            imageForm = new FormData();
            imageForm.append("image", values.profile_image[0]);
          }

          mutate({
            userData: {
              name: values.name,
              surname: values.surname,
              username: values.username,
              bio: values.bio,
              interests: values.interests,
              profile_image: imageForm,
            },
            userId,
          });
        })}
      >
        {profileImagePreview ? (
          <div className="h-40 w-40 relative">
            <img
              src={profileImagePreview}
              alt={initialValues.username}
              className="h-full w-full object-cover rounded-full"
            />
            <button
              type="button"
              className="w-5 h-5 bg-red-400 absolute right-0"
              onClick={() => {
                setProfileImagePreview(null);
                if (imageUrl) {
                  deleteProfilImage({ image: imageUrl, userId });
                }
              }}
            >
              <FaXmark className="w-full h-full fill-ecru-white hover:fill-red-400 hover:bg-ecru-white cursor-pointer" />
            </button>
          </div>
        ) : (
          <div className="h-40 w-40 relative rounded-full">
            <img
              src="/images/profileImage_placeholder.png"
              alt={initialValues.username}
              className="h-full w-full object-cover rounded-full"
            />
            <button
              type="button"
              className="w-7 h-7 absolute bottom-0 right-5"
              // onClick={() => {
              //   setProfileImagePreview(null);
              //   if (imageUrl) {
              //     deleteProfilImage({ image: imageUrl, userId });
              //   }
              // }}
            >
              <IoMdAddCircleOutline className="w-full h-full cursor-pointer fill-old-gold bg-apple rounded-full" />
            </button>
          </div>
        )}
        <label htmlFor="image" className="invisible">
          Update the image
        </label>
        <input
          className="input"
          type="file"
          {...register("profile_image", {
            onChange: (e) => {
              const imageFile = e.target.files?.[0];

              if (imageFile) {
                setProfileImagePreview(URL.createObjectURL(imageFile));
              }
            },
          })}
        />
        {errors.profile_image && (
          <ErrorMessage error={errors.profile_image.message!} />
        )}
        <label htmlFor="name">Name</label>
        <input className="input" {...register("name")}></input>
        {errors.name && <ErrorMessage error={errors.name.message!} />}
        <label htmlFor="surname">Surname</label>
        <input className="input" {...register("surname")}></input>
        {errors.surname && <ErrorMessage error={errors.surname.message!} />}
        <label htmlFor="username">Username</label>
        <input className="input" {...register("username")}></input>
        {errors.username && <ErrorMessage error={errors.username.message!} />}
        <label htmlFor="bio">Bio</label>
        <input className="input" {...register("bio")}></input>
        <label htmlFor="interests">Interests</label>
        <input className="input" {...register("interests")}></input>
        {errors.bio && <ErrorMessage error={errors.bio.message!} />}
        <div className="flex justify-end">
          <button className="button">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
