"use client";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import MyPostsFeed from "@/components/posts/MyPostsFeed";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const MyPostsPageContent = () => {

  const myPostsPageContentRef = useRef<HTMLDivElement | null>( null)

    useGSAP(
    () => {
      if (!myPostsPageContentRef.current) return;
      gsap.fromTo(
        ".myPosts",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.5,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    },
    {
      scope: myPostsPageContentRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div className="myPosts main-layout" ref={myPostsPageContentRef}>
      <div className="myPosts main-layout-heading">
        <h1 className="heading">
          Latest <span className="text-old-gold">Posts</span>
        </h1>
        <div className="hidden lg:flex">
          <CreatePostButton />
        </div>
      </div>
      <div className="myPosts main-layout-posts-feed ">
        <MyPostsFeed />
      </div>
    </div>
  );
};

export default MyPostsPageContent;