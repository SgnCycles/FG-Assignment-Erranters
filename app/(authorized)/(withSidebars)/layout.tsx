import PostPageSidebar from "@/components/sidebars/PostPageSidebar";
import UserSidebar from "@/components/sidebars/UserSidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="sidebar-layout">
      <div className="hidden lg:flex justify-center w-[15%] px-10">
        <PostPageSidebar />
      </div>
      <div className="grow">{children}</div>
      <div className="hidden lg:flex w-[25%] pr-10 lg:items-start">
        <UserSidebar />
      </div>
    </main>
  );
};

export default SidebarLayout;