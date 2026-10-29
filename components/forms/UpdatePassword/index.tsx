"use client";
import UpdatePasswordAction from "@/actions/update-password-action";
import { updateUserPasswordSchema } from "@/schemas/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import CancelButton from "@/components/buttons/CancelButton";
import ErrorMessage from "@/components/ErrorMessage";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => UpdatePasswordAction(values.currentPassword, values.newPassword),
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Password Updated");
      reset();
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  return (
    <div>
      <h2 className="post-heading mt-4 ml-4 md:px-10">User Settings</h2>
      <form
        className="form"
        onSubmit={handleSubmit((values) => mutate(values))}
      >
        <div className="profile-row-password">
          <div className="profile-item-half">
            <label htmlFor="password" className="label">
              Enter your current password:
            </label>
            <input
              type="password"
              className="input"
              {...register("currentPassword", {
                required: true,
              })}
              placeholder="Current Password:"
            />
            {errors.currentPassword && (
              <ErrorMessage error={errors.currentPassword.message!} />
            )}
          </div>
        </div>
        <div className="profile-row-password">
          <div className="profile-item-half">
            <label htmlFor="newPassword" className="label">
              Enter your new password:
            </label>
            <input
              className="input"
              type="password"
              {...register("newPassword", {
                required: true,
              })}
              placeholder="New Password:"
            />
            {errors.newPassword && (
              <ErrorMessage error={errors.newPassword.message!} />
            )}
          </div>
        </div>
        <div className="profile-row-password">
          <div className="profile-item-half">
            <label htmlFor="confirmPassword" className="label">
              Confirm your new password:
            </label>
            <input
              className="input"
              type="password"
              {...register("confirmPassword", {
                required: true,
              })}
              placeholder="Confirm Password:"
            />
            {errors.confirmPassword && (
              <ErrorMessage error={errors.confirmPassword.message!} />
            )}
          </div>
        </div>
        <div className="form-button-layout">
          <CancelButton link="/profile" />
          <button className="button-dark-secondary" disabled={isPending}>
            {isPending ? "Updating password..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
