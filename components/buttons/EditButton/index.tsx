import Link from "next/dist/client/link";
import { FaRegEdit } from "react-icons/fa";
import { EditButtonPropsType } from "./types";

const EditButton = ({ slug, type = "text" }: EditButtonPropsType) => {
  return (
    <button className={type === "icon" ? "action-tooltip" : "button-secondary"}>
      <Link href={`/post/${slug}/edit`}>
        {type === "icon" ? <FaRegEdit size={23}/> : "Edit"}
      </Link>
      <span className="action-tooltipText">Edit</span>
    </button>
  );
};

export default EditButton;