"use client";
import { UpdatePasswordAction } from "@/actions/update-password-action";
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

  const { mutate, error, isPending } = useMutation({
    mutationFn: (values: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => UpdatePasswordAction(values.currentPassword, values.newPassword),
    onSuccess: () => {
      reset();
      toast.success("Password Updated");
    },
  });

  return (
    <div>
      <h2 className="post-heading mt-4 ml-4 pl-10">User Settings</h2>
      <form
        className="form"
        onSubmit={handleSubmit((values) => mutate(values))}
      >
        <div className="profile-row">
          <div className="profile-item-long">
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

        <div className="profile-row">
          <div className="profile-item-long">
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
        <div className="profile-row">
          <div className="profile-item-long">
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
        {error && <ErrorMessage error={error.message} />}
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