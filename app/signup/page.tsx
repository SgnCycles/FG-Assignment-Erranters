import SignUpForm from "@/components/forms/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="grow flex flex-col justify-around bg-mineral-green">
      <main className="flex flex-col h-full justify-center">
        <h1 className="heading text-ecru-white font-bebas-neue text-4xl">
          Sign up to Erranters
        </h1>
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUpPage;