"use server";
import { LogOut } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";

const AccountLinks = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="flex gap-4">
      {user ? (
        <>
          <Link className="button-secondary" href="/create-post">
            Create Post
          </Link>
          <button
            className="button-secondary"
            onClick={LogOut}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="button-secondary" href="/feed">
            Log In
          </Link>
          <Link className="button-secondary" href="/signup">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default AccountLinks;