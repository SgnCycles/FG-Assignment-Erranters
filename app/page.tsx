import HomepagePoster from "@/components/HomepagePoster";
import LogInForm from "@/components/LogInForm";

export default function Home() {
  return (
    <div className="h-full flex flex-col bg-mineral-green">
      <main className="h-full flex flex-col justify-center">
        <h1 className="main-heading">Erranters</h1>
        <div className="grow grid grid-cols-2">
          <HomepagePoster />
          <LogInForm />
        </div>
      </main>
    </div>
  );
}