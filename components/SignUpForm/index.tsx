"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "@/actions/signup-actions";
import { signUpSchema } from "@/schemas/schemas";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import ErrorMessage from "../ErrorMessage";
import Link from "next/link";

const SignUpForm = () => {
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: SignUp,
    onSuccess: () => {
      reset();
      // router.push("/");
    },
  });

  return (
    <div className="mb-4">
      <form
        className="flex flex-col max-w-md m-auto text-left border-2 border-sushi rounded-2xl p-8"
        onSubmit={handleSubmit((values) => mutate(values))}
      >
        <label htmlFor="email">Enter a Username</label>
        <input
          className="input"
          {...register("username", {
            required: true,
          })}
          placeholder="Username:"
        />
        {errors.username && <ErrorMessage error={errors.username.message!} />}
        <label htmlFor="email">Enter your Email</label>
        <input
          className="input"
          {...register("email", {
            required: true,
          })}
          placeholder="Email:"
        />
        {errors.email && <ErrorMessage error={errors.email.message!} />}
        <label htmlFor="password">Enter your Password</label>
        <input
          className="input"
          {...register("password", {
            required: true,
          })}
          placeholder="Password:"
          type="password"
        />
        {errors.password && <ErrorMessage error={errors.password.message!} />}
        <label htmlFor="confirmPassword">Confirm Your Password</label>
        <input
          className="input"
          {...register("confirmPassword", {
            required: true,
          })}
          placeholder="Password:"
          type="password"
        />
        {errors.confirmPassword && (
          <ErrorMessage error={errors.confirmPassword.message!} />
        )}
        <button className="p-4 bg-old-gold text-china-ivory font-bold cursor-pointer">
          {isPending ? "Signing Up..." : "Sign Up"}
        </button>
        {isSuccess && <p>Account Created. Please check your email.</p>}
        {error && <ErrorMessage error={error.message} />}
      </form>
      <Link href="/">
        Already have any account?{" "}
        <span className="text-pacifika font-bold">Log in here</span>
      </Link>
    </div>
  );
};

export default SignUpForm;