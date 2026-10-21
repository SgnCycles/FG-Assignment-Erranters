// "use client";
// import {
//   getAllPostsCount,
//   getHomePosts,
//   HomePostsType,
// } from "@/lib/supabase/queries";
// import { useQuery } from "@tanstack/react-query";
// import { createClient } from "@/lib/supabase/browserClient";
// import { useEffect, useState } from "react";
// import ShortPost from "@/components/posts/ShortPost";
// import SortingButton from "@/components/buttons/SortingButton";
// import { usePostCategoryContext } from "@/context/postCategoryContext";
// import type { PostCategoryContextType } from "@/types/types";
// import Pagination from "@/components/Pagination";

// const HomePostsFeed = ({ posts }: { posts: HomePostsType }) => {
//   // pagination development
//   const [postAmount, setPostAmount] = useState<number>(0);
//   const [postsPaginate, setPostsPaginate] = useState<HomePostsType[] | null>(
//     null,
//   );
//   const [pageNumber, setPageNumber] = useState<number>(0);
//   const postsPerPage = 10;
//   const pagesVisited = pageNumber * postsPerPage;

//   useEffect(() => {
//     const supabase = createClient();
//     const fetchPostAmount = async () => {
//       const { count: postAmount } = await getAllPostsCount(supabase);

//       if (postAmount !== null) {
//         setPostAmount(postAmount);
//       }
//     };
//     fetchPostAmount();
//   }, []);

//   const pageCount = Math.ceil(postAmount / postsPerPage);
//   const changePage = ({ selected}: {selected: number}) => {
//     setPageNumber(selected);
//   };

//   // pagination development

//   const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
//   const [sortingOrder, setSortingOrder] = useState<boolean>(false);
//   const supabase = createClient();
//   const { data } = useQuery({
//     queryKey: ["home-posts", sortingOrder],
//     queryFn: async () => {
//       const { data, error } = await getHomePosts(supabase, sortingOrder);
//       if (error) throw new Error();
//       return data;
//     },
//     initialData: posts,
//   });

//   const filteredPosts =
//     postCategory === "All"
//       ? data
//       : data?.filter((post) => post.category === postCategory);

//   return (
//     <div className="grow">
//       <SortingButton
//         type="light"
//         sortingOrder={sortingOrder}
//         setSortingOrder={setSortingOrder}
//       />
//       {filteredPosts?.map((post, index) => (
//         <ShortPost key={index} post={post} showUser={true} />
//       ))}
//       <Pagination pageCount={pageCount} changePage={changePage}/>
//     </div>
//   );
// };

// export default HomePostsFeed;

"use client";
import {
  getAllPostsCount,
  getHomePosts,
  HomePostsType,
} from "@/lib/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useEffect, useState } from "react";
import ShortPost from "@/components/posts/ShortPost";
import SortingButton from "@/components/buttons/SortingButton";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";
import Pagination from "@/components/Pagination";

const HomePostsFeed = ({ posts }: { posts: HomePostsType }) => {
  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const [postAmount, setPostAmount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  useEffect(() => {
    const supabase = createClient();
    const fetchPostAmount = async () => {
      const { count: postAmount } = await getAllPostsCount(supabase);

      if (postAmount !== null) {
        setPostAmount(postAmount);
      }
    };
    fetchPostAmount();
  }, []);

  const pageCount = Math.ceil(postAmount / postsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const supabase = createClient();
  const { data } = useQuery({
    queryKey: ["home-posts", sortingOrder, pageNumber],
    queryFn: async () => {
      const { data, error } = await getHomePosts(
        supabase,
        sortingOrder,
        pagesVisited,
        postsPerPage,
      );
      if (error) throw new Error();
      return data;
    },
    initialData: posts,
  });

  const filteredPosts =
    postCategory === "All"
      ? data
      : data?.filter((post) => post.category === postCategory);

  return (
    <div className="grow">
      <SortingButton
        type="light"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {filteredPosts?.map((post, index) => (
        <ShortPost key={index} post={post} showUser={true} />
      ))}
      {filteredPosts.length > 0 && (
        <Pagination pageCount={pageCount} changePage={changePage} />
      )}
    </div>
  );
};

export default HomePostsFeed;
