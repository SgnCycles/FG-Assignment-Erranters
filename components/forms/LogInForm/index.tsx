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
    <div className="login-signup-element">
      <div className="login-signup-layout">
        <h2 className="login-signup-heading">member access</h2>
        <form
          className="login-signup-form"
          onSubmit={handleSubmit((values) => mutate(values))}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="label">
              Enter your Email
            </label>
            <input
              className="login-input"
              {...register("email", {
                required: true,
              })}
              placeholder="Email:"
            />
            {errors.email && <ErrorMessage error={errors.email.message!} />}
          </div>
          <div>
            <label htmlFor="password" className="label">
              Enter your Password
            </label>
            <div className="relative">
              <input
                className="login-input"
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
              <div className="flex justify-between">
                <div className="flex justify-center items-center">
                  <input className="input cursor-pointer accent-apple" type="checkbox" />
                  <label htmlFor="rememberMe" className="text-sm ml-1">
                    Remember Me
                  </label>
                </div>
                <button className="text-xs font-semibold cursor-pointer hover:text-red-500">Forgot Password?</button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className="login-button tracking-widest">
              {isPending ? "Logging in..." : "Log in"}
            </button>
          </div>
          {error && <ErrorMessage error={error.message} />}
        </form>
        <div className="p-8 text-base text-center flex flex-col justify-center">
          <h2 className="mb-2">Don't have any account?</h2>
          <Link
            href="/signup"
            className="signup-button"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;