"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "@/actions/login-actions";
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
      router.push("/");
    },
  });

  return (
    <div className="mb-4">
      <form
        className="flex flex-col max-w-md m-auto text-left border-2 border-sushi rounded-2xl p-8"
        onSubmit={handleSubmit((values) => mutate(values))}
      >
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
        <button className="p-4 bg-old-gold text-china-ivory font-bold cursor-pointer">
          {isPending ? "Logging in..." : "Log in"}
        </button>
        {error && <ErrorMessage error={error.message} />}
      </form>
      <Link href="/signup">
        Don't have any account?{" "}
        <span className="text-pacifika font-bold">Sign up here</span>
      </Link>
    </div>
  );
};

export default LogInForm;
