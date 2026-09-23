import Link from "next/link";

const AccountLinks = () => {
  return (

    <div className="flex gap-4">
      <Link className="button-secondary" href="/auth/login">Log In</Link>
      <Link className="button-secondary" href="/auth/signup">Sign Up</Link>
    </div>
  )
}

export default AccountLinks;