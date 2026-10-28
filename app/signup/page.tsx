import HomepagePoster from "@/components/HomepagePoster";
import SignUpForm from "@/components/forms/SignUpForm";

const SignUpPage = () => {
  return (
    <main className="h-full flex justify-center flex-1">
      {/* DESKTOP */}
      <div className="hidden lg:flex justify-center items-center">
        <HomepagePoster />
        <SignUpForm />
      </div>
      {/* MOBILE */}
      <div className="flex flex-col lg:hidden justify-center items-center">
        <HomepagePoster />
        <SignUpForm />
      </div>
    </main>
  );
};

export default SignUpPage;