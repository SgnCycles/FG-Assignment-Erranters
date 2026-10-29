"use client";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import HomePostsFeed from "@/components/posts/HomePostsFeed";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const ProfileHomepageContent = () => {

  const homepageContentRef = useRef<HTMLDivElement | null>( null)

    useGSAP(
    () => {
      if (!homepageContentRef.current) return;
      gsap.fromTo(
        ".homepage",
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
      scope: homepageContentRef,
      // dependencies: [favouriteCategories],
      revertOnUpdate: true,
    },
  );

  return (
    <div className="homepage main-layout" ref={homepageContentRef}>
      <div className="homepage main-layout-heading">
        <h1 className="heading">
          Posts from <span className="text-old-gold">Erranters</span>
        </h1>
        <div className="hidden lg:flex homepage">
          <CreatePostButton />
        </div>
      </div>
      <div className="main-layout-posts-feed homepage">
        <HomePostsFeed />
      </div>
    </div>
  );
};

export default ProfileHomepageContent;