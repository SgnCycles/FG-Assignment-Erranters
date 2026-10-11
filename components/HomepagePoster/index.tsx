const HomepagePoster = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[75%] bg-white/15 backdrop-blur-2xl shadow-xl p-10 relative">
        <div className="absolute z-10 inset-x-0 top-1/3">
          <h1 className="main-heading">
            Erranters
          </h1>
        </div>
        <div className="aspect-square">
          <img
            className="w-full h-full object-cover"
            src="/images/erranters_hiking.png"
          />
        </div>
      </div>
    </div>
  );
};

export default HomepagePoster;