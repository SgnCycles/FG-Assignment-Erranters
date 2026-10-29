"use client";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import ForYouPostsFeed from "@/components/posts/ForYouPostFeed";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const ForYouPageContent = () => {

  const forYouPageContentRef = useRef<HTMLDivElement | null>( null)

    useGSAP(
    () => {
      if (!forYouPageContentRef.current) return;
      gsap.fromTo(
        ".forYou",
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
      scope: forYouPageContentRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div className="forYou main-layout" ref={forYouPageContentRef}>
      <div className="forYou main-layout-heading">
        <h1 className="heading">
          People you <span className="text-old-gold">follow</span>
        </h1>
        <div className="hidden lg:flex forYou">
          <CreatePostButton />
        </div>
      </div>
      <div className="main-layout-posts-feed forYou">
        <ForYouPostsFeed />
      </div>
    </div>
  );
};

export default ForYouPageContent;