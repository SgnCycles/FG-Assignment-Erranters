"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "@/actions/login-action";
import { logInSchema } from "@/schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ErrorMessage";
import Link from "next/link";

const LogInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(logInSchema) });

  const { mutate, error, isPending } = useMutation({
    mutationFn: LogIn,
    onSuccess: () => {
      router.push("/feed");
    },
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-white/15 backdrop-blur-2xl shadow-xl p-10 rounded-4xl">
        <form
          className="flex flex-col max-w-md m-auto text-left rounded-2xl p-8 bg-old-gold"
          onSubmit={handleSubmit((values) => mutate(values))}
        >
          <label htmlFor="email" className="label">Enter your Email</label>
          <input
            className="input"
            {...register("email", {
              required: true,
            })}
            placeholder="Email:"
          />
          {errors.email && <ErrorMessage error={errors.email.message!} />}
          <label htmlFor="password" className="label">Enter your Password</label>
          <input
            className="input"
            {...register("password", {
              required: true,
            })}
            placeholder="Password:"
            type="password"
          />
          {errors.password && <ErrorMessage error={errors.password.message!} />}
          <button className="button">
            {isPending ? "Logging in..." : "Log in"}
          </button>
          {error && <ErrorMessage error={error.message} />}
        </form>
        <div className="mt-4">
          <Link href="/signup">
            Don't have any account?{" "}
            <span className="text-ecru-white font-bold hover:text-old-gold">Sign up here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
