import AddFollowerAction from "@/actions/add-follow-action";
import DeleteFollowAction from "@/actions/delete-follow-action";
import { getUserFollowStatus } from "@/lib/supabase/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FollowButtonPropsType } from "./types";
import { toast } from "react-toastify";

const FollowButton = ({
  onFollowSuccess,
  memberId,
  memberIsFollowed,
}: FollowButtonPropsType) => {
  const queryClient = useQueryClient();
  const {
    data: userIsFollowed,
    error: userIsFollowedError,
    isLoading,
  } = useQuery({
    queryKey: ["user-is-followed", memberId],
    queryFn: () => getUserFollowStatus(memberId),
  });

  if (userIsFollowedError) {
    console.error(userIsFollowedError);
  }

  const { mutate: mutateAddFollow } = useMutation({
    mutationFn: ({ userIsFollowed }: { userIsFollowed: boolean }) => {
      if (userIsFollowed) {
        return DeleteFollowAction({ memberId });
      } else {
        return AddFollowerAction({ memberId });
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      onFollowSuccess?.();
      queryClient.invalidateQueries({
        queryKey: ["user-is-followed", memberId],
      });
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  return (
    <button
      className="button-dark-primary"
      onClick={() => mutateAddFollow({ userIsFollowed: !!userIsFollowed })}
      disabled={isLoading}
    >
      {memberIsFollowed ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user-minus preview-icon"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>
          <span className="ml-2">Unfollow</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user-round-plus preview-icon"
          >
            <path d="M2 21a8 8 0 0 1 13.292-6" />
            <circle cx="10" cy="8" r="5" />
            <path d="M19 16v6" />
            <path d="M22 19h-6" />
          </svg>
          <span className="ml-2">Follow</span>
        </>
      )}
    </button>
  );
};

export default FollowButton;