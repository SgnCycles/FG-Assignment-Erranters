import HomepagePoster from "@/components/HomepagePoster";
import LogInForm from "@/components/forms/LogInForm";

export default function Home() {
  return (
      <main className="h-full flex justify-center">
        <div className="flex justify-center items-center">
          <HomepagePoster />
          <LogInForm />
        </div>
      </main>
  );
}