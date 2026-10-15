const UserSidebar = ({ username }: { username?: string }) => {
  return (
    <div className="w-[10%]">
      <h2>User sidebar</h2>
      <div className="text-ecru-white font-semibold p-2 flex justify-end">
        Hi, {username}!
      </div>
    </div>
  );
};

export default UserSidebar;