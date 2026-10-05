import Link from "next/dist/client/link";
import { FaRegEdit } from "react-icons/fa";

type EditButtonProps = {
  slug: string;
  type: "text" | "icon";
};

const EditButton = ({ slug, type = "text" }: EditButtonProps) => {
  return (
    <button className={type === "icon" ? "cursor-pointer" : "button-secondary"}>
      <Link href={`/${slug}/edit`}>
        {type === "icon" ? <FaRegEdit size={25}/> : "Edit"}
      </Link>
    </button>
  );
};

export default EditButton;
