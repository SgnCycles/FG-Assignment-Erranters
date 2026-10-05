type PostPageSidebarPropsType = {
  setPostCategory: (category: string) => void;
}

const PostPageSidebar = ({setPostCategory} : PostPageSidebarPropsType) => {
  return (
    <div className="w-[10%]">
      <ul className="flex flex-col gap-4 mt-10 items-center w-full">
        <li className="w-full">
          <button className="button w-full" onClick={() => setPostCategory("All")}>All Posts</button>
        </li>
        <li className="w-full">
          <button className="button w-full" onClick={() => setPostCategory("Hiking")}>Hiking</button>
        </li>
        <li className="w-full">
          <button className="button w-full" onClick={() => setPostCategory("Cycling")}>Cycling</button>
        </li>
      </ul>
    </div>
  );
};

export default PostPageSidebar;