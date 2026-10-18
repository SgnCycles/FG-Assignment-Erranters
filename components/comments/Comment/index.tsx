import DeleteCommentAction from "@/actions/delete-comment-action";
import DeleteButton from "@/components/buttons/DeleteButton";
import { CommentsPropsType } from "./types";
import Link from "next/link";

const Comment = ({
  comment,
  isAuthor,
  userId,
  onDeleteSuccess,
}: CommentsPropsType) => {
  return (
    <div key={comment.id} className="flex justify-between mt-4">
      <div className="flex">
        <div className="mr-3">
          {comment.author.profile_image ? (
            <img
              src={comment.author.profile_image}
              alt="profile user"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 relative rounded-full">
              <img
                src="/images/profileImage_placeholder.png"
                alt="user placeholder"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          )}
        </div>
        <div>
          <div className="w-full flex justify-between">
            <Link
              href={`/members/${comment.author.username}`}
              className="flex cursor-pointer text-left"
            >
              <div className="flex gap-2">
                <span className="font-semibold">{comment.author.username}</span>
                <span className="text-[10px] place-self-center">
                  {new Date(comment.created_at).toLocaleString("sv-Se", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </Link>
          </div>
          <div className="text-base">
            <p>{comment.content}</p>
          </div>
        </div>
      </div>
      {(isAuthor || userId === comment.author.id) && (
        <DeleteButton
          id={comment.id}
          type="icon"
          deleteFunction={DeleteCommentAction}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
    </div>
  );
};

export default Comment;