import PostPageSidebar from "@/components/sidebars/PostPageSidebar";
import UserSidebar from "@/components/sidebars/UserSidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <main className="sidebar-layout">
        <PostPageSidebar />
        {children}
        <UserSidebar />
      </main>
  );
};

export default SidebarLayout;