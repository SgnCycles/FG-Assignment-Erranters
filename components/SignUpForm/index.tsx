"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "@/actions/signup-action";
import { signUpSchema } from "@/schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ErrorMessage";
import Link from "next/link";

const SignUpForm = () => {
  
  const router = useRouter();
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
      router.push("/");
    },
  });

  return (
    <div className="bg-mineral-green">
      <form
        className="flex flex-col max-w-md m-auto text-left bg-old-gold rounded-2xl p-8"
        onSubmit={handleSubmit((values) => mutate(values))}
      >
        <label className="label" htmlFor="email">Enter a Username:</label>
        <input
          className="input"
          {...register("username", {
            required: true,
          })}
          placeholder="Username:"
        />
        {errors.username && <ErrorMessage error={errors.username.message!} />}
        <label className="label" htmlFor="email">Enter your Email:</label>
        <input
          className="input"
          {...register("email", {
            required: true,
          })}
          placeholder="Email:"
        />
        {errors.email && <ErrorMessage error={errors.email.message!} />}
        <label className="label" htmlFor="password">Enter your Password:</label>
        <input
          className="input"
          {...register("password", {
            required: true,
          })}
          placeholder="Password:"
          type="password"
        />
        {errors.password && <ErrorMessage error={errors.password.message!} />}
        <label className="label" htmlFor="confirmPassword">Confirm Your Password:</label>
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
        <button className="button">
          {isPending ? "Signing Up..." : "Sign Up"}
        </button>
        {isSuccess && <p>Account Created. Please check your email.</p>}
        {error && <ErrorMessage error={error.message} />}
      </form>
      <div className="flex justify-center mt-4 text-ecru-white">
        <Link href="/">
          Already have any account?{" "}
          <span className="text-apple hover:text-old-gold font-bold">Log in here</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;