import Link from "next/link";

const CancelButton = ({link}: {link: string}) => {
  return (
    <Link className="button-light-primary" href={link}>Cancel</Link>
  )
}

export default CancelButton;