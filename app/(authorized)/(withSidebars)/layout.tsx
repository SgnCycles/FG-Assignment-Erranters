import PostPageSidebar from "@/components/sidebars/PostPageSidebar";
import UserSidebar from "@/components/sidebars/UserSidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="flex grid-cols-3">
        <PostPageSidebar />
        {children}
        <UserSidebar />
      </div>
  );
};

export default SidebarLayout;