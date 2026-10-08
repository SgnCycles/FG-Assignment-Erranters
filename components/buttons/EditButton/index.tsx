import Link from "next/dist/client/link";
import { FaRegEdit } from "react-icons/fa";

type EditButtonProps = {
  slug: string;
  type: "text" | "icon";
};

const EditButton = ({ slug, type = "text" }: EditButtonProps) => {
  return (
    <button className={type === "icon" ? "action-tooltip" : "button-secondary"}>
      <Link href={`/${slug}/edit`}>
        {type === "icon" ? <FaRegEdit size={25}/> : "Edit"}
      </Link>
      <span className="action-tooltipText">Edit Post</span>
    </button>
  );
};

export default EditButton;