import { AddFollowerAction } from "@/actions/add-follow-action";
import { DeleteFollowAction } from "@/actions/delete-follow-action";
import { getUserFollowStatus } from "@/lib/supabase/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type FollowButtonPropsType = {
  memberId: string;
  onFollowSuccess?: () => void;
};

const FollowButton = ({
  onFollowSuccess,
  memberId,
}: FollowButtonPropsType) => {
  const queryClient = useQueryClient();
  const { data: userIsFollowed, error: userIsFollowedError, isLoading } = useQuery({
    queryKey: ["user-is-followed", memberId],
    queryFn: () => getUserFollowStatus(memberId),
  });

  if (userIsFollowedError) {
    console.log(userIsFollowedError);
  }

  const { mutate: mutateAddFollow, error: AddFollowError } = useMutation({
    mutationFn: ({ userIsFollowed }: { userIsFollowed: boolean }) => {
      if (userIsFollowed) {
        return DeleteFollowAction({ memberId });
      } else {
        return AddFollowerAction({ memberId });
      }
    },
    onSuccess: () => {
      onFollowSuccess?.();
      queryClient.invalidateQueries({
        queryKey: ["user-is-followed", memberId],
      });
    },
  });

  return (
    <button
      className="button-dark-primary"
      onClick={() => mutateAddFollow({ userIsFollowed: !!userIsFollowed })}
      disabled={isLoading}
    >
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
    </button>
  );
};

export default FollowButton;
