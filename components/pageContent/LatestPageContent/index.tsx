"use client";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import LatestPostsFeed from "@/components/posts/LatestPostsFeed";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const LatestPageContent = () => {

  const latestPageContentRef = useRef<HTMLDivElement | null>( null)

    useGSAP(
    () => {
      if (!latestPageContentRef.current) return;
      gsap.fromTo(
        ".latest",
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
      scope: latestPageContentRef,
      // dependencies: [favouriteCategories],
      revertOnUpdate: true,
    },
  );

  return (
    <div className="latest main-layout" ref={latestPageContentRef}>
      <div className="latest main-layout-heading">
        <h1 className="heading">
          Latest <span className="text-old-gold">Posts</span>
        </h1>
        <div className="hidden lg:flex">
          <CreatePostButton />
        </div>
      </div>
      <div className="latest main-layout-posts-feed ">
        <LatestPostsFeed />
      </div>
    </div>
  );
};

export default LatestPageContent;