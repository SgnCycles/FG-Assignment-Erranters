import GoBackButton from "@/components/buttons/GoBackButton";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="h-full">
      <section className="h-full flex flex-col justify-between items-center">
        <div className="grow flex flex-col justify-center items-center">
          <div className="flex flex-col heading items-center">
            <h1 className="">Page not found</h1>
            <span>head home</span>
          </div>
          <div className="p-10">
            <img
              src="/images/page-not-found.jpg"
              alt="page not found"
              className="max-h-100 w-auto border-4 border-casual-white"
            />
          </div>
        </div>
        <div className="flex flex-col w-full items-end pr-10">
          <GoBackButton />
          <Link href="/" className="go-to-start-button">Go to Start page</Link>
        </div>
      </section>
    </main>
  );
}