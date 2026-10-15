import Header from "@/components/Header";

const MainAuthLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainAuthLayout;