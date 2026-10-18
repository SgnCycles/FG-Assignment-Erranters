import ShortPost from "../ShortPost";
import { MemberPostsPropsType } from "./types";

const MemberPosts = ({ postData }: MemberPostsPropsType) => {
  return (
    <div className="flex flex-col items-center w-full mt-4">
      <div className="flex flex-col w-[83%]">
        <p className="text-old-gold ml-4 uppercase font-semibold">Activity</p>
        <h2 className="member-heading-secondary ml-4">Published Adventures:</h2>
        <div>
          {postData &&
            postData.map((post, index) => (
              <ShortPost key={index} post={post} showUser={false} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MemberPosts;