export type FollowButtonPropsType = {
  memberId: string;
  onFollowSuccess?: () => void;
  memberIsFollowed: boolean;
};