import SignUpForm from "@/components/forms/SignUpForm";
import HomepagePoster from "@/components/HomepagePoster";

const SignUpPage = () => {
  return (
    <main className="h-full flex justify-center">
        <div className="flex justify-center items-center">
          <HomepagePoster />
          <SignUpForm />
        </div>
    </main>
  );
};

export default SignUpPage;