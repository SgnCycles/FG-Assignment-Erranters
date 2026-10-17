import PostPageSidebar from "@/components/sidebars/PostPageSidebar";
import UserSidebar from "@/components/sidebars/UserSidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <main className="flex grow grid-cols-3 mt-10">
        <PostPageSidebar />
        {children}
        <UserSidebar />
      </main>
  );
};

export default SidebarLayout;