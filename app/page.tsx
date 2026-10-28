import HomepagePoster from "@/components/HomepagePoster";
import LogInForm from "@/components/forms/LogInForm";

export default function Home() {
  return (
    <main className="flex justify-center flex-1">
      {/* DESKTOP */}
      <div className="hidden lg:flex justify-center items-center">
        <HomepagePoster />
        <LogInForm />
      </div>
      {/* MOBILE */}
        <div className="flex flex-col lg:hidden justify-center items-center">
        <HomepagePoster />
        <LogInForm />
      </div>
    </main>
  );
}