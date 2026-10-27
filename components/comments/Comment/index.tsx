"use client";
import DeleteCommentAction from "@/actions/delete-comment-action";
import type { CommentsPropsType } from "./types";
import Link from "next/link";
import { useState } from "react";
import AddSubCommentForm from "@/components/forms/SubCommentForm";
import DeleteButton from "@/components/buttons/DeleteButton";

const Comment = ({
  comment,
  isAuthor,
  userId,
  postId,
  slug,
  onDeleteSuccess,
}: CommentsPropsType) => {
  
  const [replyOpen, setReplyOpen] = useState<boolean>(false);

  return (
    <div key={comment.id} className="flex mt-4 w-full justify-between">
      <div className="flex flex-1 min-w-0">
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
        <div className="flex-1 min-w-0">
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
            <div>
              {comment.parent_id === null && (
                <button
                  type="button"
                  className="reply-button"
                  onClick={() => setReplyOpen(!replyOpen)}
                >
                  reply
                  {replyOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-up preview-icon"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-down preview-icon"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </button>
              )}
              {replyOpen && (
                <AddSubCommentForm
                  postId={postId}
                  parentId={comment.id}
                  slug={slug}
                  setReplyOpen={setReplyOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {(isAuthor || userId === comment.author.id) && (
        <div className="flex justify-center">
          <DeleteButton
            id={comment.id}
            type="icon"
            deleteFunction={DeleteCommentAction}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;