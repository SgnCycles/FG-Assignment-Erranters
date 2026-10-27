"use client";
import EditUserProfile from "@/actions/edit-user-profile-action";
import DeleteProfileImageAction from "@/actions/delete-profile-image-action";
import DeleteCoverImageAction from "@/actions/delete-cover-image-action";
import { userProfileSchema } from "@/schemas/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import { FaXmark } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import CancelButton from "@/components/buttons/CancelButton";
import DeleteAccountDialogue from "@/components/DeleteAccountDialogue";
import ErrorMessage from "@/components/ErrorMessage";
import UpdatePassword from "../UpdatePassword";
import type { userProfileProps } from "@/types/types";

const UserProfileForm = ({
  userProfile,
}: {
  userProfile: userProfileProps;
}) => {
  const initialValues: userProfileProps = {
    id: userProfile.id,
    name: userProfile.name,
    surname: userProfile.surname,
    username: userProfile.username,
    bio: userProfile.bio,
    interests: userProfile.interests,
    profile_image: userProfile.profile_image,
    headline: userProfile.headline,
    location: userProfile.location,
    cover_image: userProfile.cover_image,
  };

  const userId = userProfile.id;

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    initialValues.profile_image,
  );
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    initialValues.cover_image,
  );

  const headlineLength = 140;
  const [headlineText, setHeadlineText] = useState<string>(
    initialValues.headline ?? "",
  );

  const handleHeadlineTextLenght = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    if (value.length <= headlineLength) {
      setHeadlineText(value);
    }
  };

  const userProfileImageSchema = userProfileSchema
    .omit({ profile_image: true })
    .extend({
      profile_image: z
        .unknown()
        .transform((value) => {
          return value as FileList;
        })
        .optional(),
      cover_image: z
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
      headline: initialValues.headline || undefined,
      location: initialValues.location || undefined,
      cover_image: initialValues.cover_image || undefined,
    },
  });

  const imageUrl = initialValues.profile_image
    ? initialValues.profile_image.split("/Profile-Images/")[1]
    : null;

  const coverImageUrl = initialValues.cover_image
    ? initialValues.cover_image.split("/Cover-Images/")[1]
    : null;

  const { mutate } = useMutation({
    mutationFn: EditUserProfile,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Profile updated");
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  const { mutate: deleteProfileImage } = useMutation({
    mutationFn: DeleteProfileImageAction,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Profile image removed");
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  const { mutate: deleteCoverImage } = useMutation({
    mutationFn: DeleteCoverImageAction,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Cover image removed");
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  return (
    <div className="flex flex-col border border-ecru-white bg-casual-white rounded-4xl">
      <form
        className="form"
        onSubmit={handleSubmit((values) => {
          let imageForm = undefined;
          let coverImageForm = undefined;

          if (
            values.profile_image &&
            typeof values.profile_image !== "string" &&
            values.profile_image.length > 0
          ) {
            imageForm = new FormData();
            imageForm.append("image", values.profile_image[0]);
          }

          if (
            values.cover_image &&
            typeof values.cover_image !== "string" &&
            values.cover_image.length > 0
          ) {
            coverImageForm = new FormData();
            coverImageForm.append("image", values.cover_image[0]);
          }

          mutate({
            userData: {
              name: values.name,
              surname: values.surname,
              username: values.username,
              bio: values.bio,
              interests: values.interests,
              profile_image: imageForm,
              headline: values.headline,
              location: values.location,
              cover_image: coverImageForm,
            },
            userId,
          });
        })}
      >
        <div>
          <div className="flex flex-col">
            <div className="h-50 relative rounded-tl-4xl rounded-tr-4xl">
              {/* TO DO: add in the UI the max size of the images */}
              {coverImagePreview ? (
                <div className="h-full w-full relative place-items-center rounded-tl-4xl rounded-tr-4xl">
                  <img
                    src={coverImagePreview}
                    alt="Cover"
                    className="h-full w-full object-cover rounded-tl-4xl rounded-tr-4xl"
                  />
                  <button
                    type="button"
                    className="w-7 h-7 absolute bottom-2 right-5"
                    onClick={() => {
                      setCoverImagePreview(null);
                      if (coverImageUrl) {
                        deleteCoverImage({ image: coverImageUrl, userId });
                      }
                    }}
                  >
                    <FaXmark className="w-full h-full cursor-pointer fill-outer-space bg-old-gold hover:bg-red-400 hover:fill-ecru-white rounded-full" />
                  </button>
                </div>
              ) : (
                <div className="h-50 relative bg-gray-600 rounded-tl-4xl rounded-tr-4xl">
                  <button
                    type="button"
                    className="flex py-2 px-4 bg-ecru-white text-outer-space  text-sm rounded-4xl gap-2 absolute z-10 bottom-4 right-4 cursor-pointer hover:bg-old-gold"
                    onClick={() => {
                      document.getElementById("add-cover-image")!.click();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-camera preview-icon"
                    >
                      <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                    Change cover
                  </button>
                  <label htmlFor="image" className="hidden">
                    Update the cover image
                  </label>
                  <input
                    className="hidden"
                    id="add-cover-image"
                    type="file"
                    {...register("cover_image", {
                      onChange: (e) => {
                        const coverImageFile = e.target.files?.[0];

                        if (coverImageFile) {
                          setCoverImagePreview(
                            URL.createObjectURL(coverImageFile),
                          );
                        }
                      },
                    })}
                  />
                </div>
              )}
              {errors.cover_image && (
                <ErrorMessage error={errors.cover_image.message!} />
              )}
            </div>
            <div className="flex flex-col h-20">
              {/* TO DO: add in the UI the max size of the images */}
              {profileImagePreview ? (
                <div className="h-40 w-40 flex items-center justify-center -translate-y-20 translate-x-15 z-10 rounded-full border-4 border-ecru-white bg-ecru-white">
                  <div className="h-full w-full relative place-items-center">
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
                          deleteProfileImage({ image: imageUrl, userId });
                        }
                      }}
                    >
                      <FaXmark className="w-full h-full cursor-pointer fill-outer-space bg-old-gold hover:bg-red-400 hover:fill-ecru-white rounded-full" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-40 w-40 flex items-center justify-center -translate-y-20 translate-x-15 z-10 rounded-full border-4 border-ecru-white bg-ecru-white">
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
            <h2 className="post-heading mt-4 ml-4">Profile Settings</h2>
            <div className="profile-row">
              <div className="profile-item-long">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input className="input" {...register("name")}></input>
                {errors.name && <ErrorMessage error={errors.name.message!} />}
              </div>
              <div className="profile-item-long">
                <label htmlFor="surname" className="label">
                  Surname
                </label>
                <input className="input" {...register("surname")}></input>
                {errors.surname && (
                  <ErrorMessage error={errors.surname.message!} />
                )}
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-item-long">
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input className="input" {...register("username")}></input>
                {errors.username && (
                  <ErrorMessage error={errors.username.message!} />
                )}
              </div>
              <div className="profile-item-long">
                <label htmlFor="location" className="label">
                  Location
                </label>
                <input className="input" {...register("location")}></input>
                {errors.location && (
                  <ErrorMessage error={errors.location.message!} />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="profile-item-full">
              <label htmlFor="headline" className="label">
                Headline
              </label>
              <div className="relative">
                <TextareaAutosize
                  className="input grow w-full "
                  {...register("headline")}
                  onChange={(e) => {
                    handleHeadlineTextLenght(e);
                  }}
                />
                <span className="absolute top-1/4 right-2 text-outer-space/50">
                  {headlineText.length}/{headlineLength}
                </span>
              </div>
            </div>
            <div className="profile-item-full">
              <label htmlFor="bio" className="label">
                Bio
              </label>
              <TextareaAutosize
                className="input grow w-full"
                {...register("bio")}
              />
            </div>
            <div className="profile-item-full">
              <label htmlFor="interests" className="label">
                Interests
              </label>
              <TextareaAutosize
                className="input grow w-full"
                {...register("interests")}
              />
              {errors.bio && <ErrorMessage error={errors.bio.message!} />}
            </div>
          </div>
          <div className="form-button-layout pr-8">
            <CancelButton link="/feed" />
            <button className="button-dark-primary">Update Profile</button>
          </div>
        </div>
      </form>
      <UpdatePassword />
      <DeleteAccountDialogue userId={userId} />
    </div>
  );
};

export default UserProfileForm;