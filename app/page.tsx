import HomepagePoster from "@/components/HomepagePoster";
import LogInForm from "@/components/LogInForm";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <main className="h-full flex flex-col justify-center">
        <h1 className="heading">Welcome to Erranters</h1>
        <div className="flex justify-around grow">
          <HomepagePoster />
          <LogInForm />
        </div>
      </main>
    </div>
  );
}