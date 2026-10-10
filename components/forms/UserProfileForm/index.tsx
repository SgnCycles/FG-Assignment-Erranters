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

  if (deleteError) {
    toast.error("Deleting image failed");
  }

  return (
    <div>
      <form
        className="h-full text-ecru-white"
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
        <div className="flex">
          <div className="flex flex-col w-[30%] items-center">
            <div className="flex flex-col">
              {profileImagePreview ? (
                <div className="w-full flex items-center justify-center">
                  <div className="h-40 w-40 relative place-items-center">
                    <img
                      src={profileImagePreview}
                      alt={initialValues.username}
                      className="h-full w-full object-cover rounded-full"
                    />
                    <button
                      type="button"
                      className="w-7 h-7 absolute bottom-0 right-5"
                      onClick={() => {
                        setProfileImagePreview(null);
                        if (imageUrl) {
                          deleteProfilImage({ image: imageUrl, userId });
                        }
                      }}
                    >
                      <FaXmark className="w-full h-full cursor-pointer fill-red-400 bg-ecru-white hover:bg-red-400 hover:fill-ecru-white rounded-full" />
                    </button>
                  </div>
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
                    onClick={() => {
                      document.getElementById("add-image")!.click();
                    }}
                  >
                    <IoMdAddCircleOutline className="w-full h-full cursor-pointer fill-old-gold bg-apple hover:bg-old-gold hover:fill-apple rounded-full" />
                  </button>
                  <label htmlFor="image" className="hidden">
                    Update the image
                  </label>
                  <input
                    className="hidden"
                    id="add-image"
                    type="file"
                    {...register("profile_image", {
                      onChange: (e) => {
                        const imageFile = e.target.files?.[0];

                        if (imageFile) {
                          setProfileImagePreview(
                            URL.createObjectURL(imageFile),
                          );
                        }
                      },
                    })}
                  />
                </div>
              )}
              {errors.profile_image && (
                <ErrorMessage error={errors.profile_image.message!} />
              )}
            </div>
            <div className="flex flex-col justify-center w-[80%]">
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input className="input" {...register("name")}></input>
                {errors.name && <ErrorMessage error={errors.name.message!} />}
              </div>
              <div className="flex flex-col">
                <label htmlFor="surname">Surname</label>
                <input className="input" {...register("surname")}></input>
                {errors.surname && (
                  <ErrorMessage error={errors.surname.message!} />
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input className="input" {...register("username")}></input>
                {errors.username && (
                  <ErrorMessage error={errors.username.message!} />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col grow ml-10">
            <label htmlFor="bio">Bio</label>
            <textarea className="input" {...register("bio")}></textarea>
            <label htmlFor="interests">Interests</label>
            <textarea className="input" {...register("interests")}></textarea>
            {errors.bio && <ErrorMessage error={errors.bio.message!} />}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="button">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;