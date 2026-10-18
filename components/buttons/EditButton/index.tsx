import Link from "next/dist/client/link";
import { EditButtonPropsType } from "./types";

const EditButton = ({ slug, type = "text" }: EditButtonPropsType) => {
  return (
    <button className={type === "icon" ? "postReactionButtons" : "button-secondary"}>
      <Link href={`/post/${slug}/edit`}>
        {type === "icon" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-pen preview-icon stroke-outer-space/50 hover:stroke-apple"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
        ) : (
          "Edit"
        )}
      </Link>
      <span className="action-tooltipText">Edit</span>
    </button>
  );
};

export default EditButton;