import HomepagePoster from "@/components/HomepagePoster";
import SignUpForm from "@/components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="grow flex flex-col justify-around">
      <main className="">
        <h1 className="heading">Sign up to Erranters</h1>
        <SignUpForm />
      </main>
    </div>
  );
}

export default SignUpPage;