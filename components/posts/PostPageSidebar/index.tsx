type PostPageSidebarPropsType = {
  postCategory: string;
  setPostCategory: (category: string) => void;
};

const PostPageSidebar = ({
  postCategory,
  setPostCategory,
}: PostPageSidebarPropsType) => {
  return (
    <div className="w-[15%] flex justify-center">
      <ul className="flex flex-col gap-4 mt-10 items-center">
        <li className="w-full">
          <button className={`button ${postCategory === "All" ? "active" : ""}`} onClick={() => setPostCategory("All")}>
            All Posts
          </button>
        </li>
        <li className="w-full">
          <button
            className={`button ${postCategory === "Hiking" ? "active" : ""}`}
            onClick={() => setPostCategory("Hiking")}
          >
            Hiking
          </button>
        </li>
        <li className="w-full">
          <button className={`button ${postCategory === "Cycling" ? "active" : ""}`} onClick={() => setPostCategory("Cycling")}>
            Cycling
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PostPageSidebar;