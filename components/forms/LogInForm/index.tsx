"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "@/actions/login-action";
import { logInSchema } from "@/schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const LogInForm = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(logInSchema) });

  const { mutate, error, isPending } = useMutation({
    mutationFn: LogIn,
    onSuccess: () => {
      reset();
      router.push("/feed");
    },
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="p-10 font-cantarell">
        <form
          className="flex flex-col w-lg m-auto text-left p-8 bg-old-gold"
          onSubmit={handleSubmit((values) => mutate(values))}
        >
          <label htmlFor="email" className="label">
            Enter your Email
          </label>
          <input
            className="input"
            {...register("email", {
              required: true,
            })}
            placeholder="Email:"
          />
          {errors.email && <ErrorMessage error={errors.email.message!} />}
          <label htmlFor="password" className="label">
            Enter your Password
          </label>
          <div className="relative">
            <input
              className="input w-full"
              {...register("password", {
                required: true,
              })}
              placeholder="Password:"
              type={showPassword ? "text" : "password"}
            />
            {showPassword ? (
              <AiFillEye
                className="eye-icon"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <AiFillEyeInvisible
                className="eye-icon"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
            {errors.password && (
              <ErrorMessage error={errors.password.message!} />
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button className="button w-full">
              {isPending ? "Logging in..." : "Log in"}
            </button>
          </div>
          {error && <ErrorMessage error={error.message} />}
        </form>
        <div className="mt-4 text-base text-center">
          <Link href="/signup" className="text-ecru-white">
            Don't have any account?{" "}
            <span className="font-bold text-apple hover:text-old-gold">
              Sign up here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;