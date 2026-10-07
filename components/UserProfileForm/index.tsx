"use client";
import { type Tables } from "@/lib/supabase/database.types";
import { userProfileSchema } from "@/schemas/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import EditUserProfile from "@/actions/edit-user-profile-action";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../ErrorMessage";

const UserProfileForm = ({
  initialValues,
  userId,
}: {
  initialValues: Pick<
    Tables<"Profiles">,
    "name" | "surname" | "username" | "bio" | "profile_image"
  >;
  userId: string;
}) => {
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
      profile_image: initialValues.profile_image || undefined,
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: EditUserProfile,
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
              profile_image: imageForm,
            },
            userId,
          });
        })}
      >
        {initialValues.profile_image && (
          <div>
            <img
              src={initialValues.profile_image}
              alt={initialValues.username}
            />
          </div>
        )}
        <label htmlFor="image">Update the image</label>
        <input className="input" type="file" {...register("profile_image")} />
        {errors.profile_image && <ErrorMessage error={errors.profile_image.message!} />}
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
        {errors.bio && <ErrorMessage error={errors.bio.message!} />}
        <button className="button">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfileForm;