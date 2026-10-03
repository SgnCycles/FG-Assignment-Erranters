const PostPageSidebar = () => {
  return (
    <div className="w-[10%]">
      <ul className="flex flex-col gap-4 mt-10 items-center">
        <li>
          <button className="button">All Posts</button>
        </li>
        <li>
          <button className="button">Hiking</button>
        </li>
        <li>
          <button className="button">Cycling</button>
        </li>
      </ul>
    </div>
  );
};

export default PostPageSidebar;