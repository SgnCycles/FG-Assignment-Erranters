"use client";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import MyFavouritePostsFeed from "@/components/posts/MyFavouritePostFeed";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const FavouritesPageContent = () => {

  const favouritePageContentRef = useRef<HTMLDivElement | null>( null)

    useGSAP(
    () => {
      if (!favouritePageContentRef.current) return;
      gsap.fromTo(
        ".favourites",
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
      scope: favouritePageContentRef,
      // dependencies: [favouriteCategories],
      revertOnUpdate: true,
    },
  );

  return (
    <div className="favourites main-layout" ref={favouritePageContentRef}>
      <div className="favourites main-layout-heading">
        <h1 className="favourites heading">
          Favourite <span className="text-old-gold">Posts</span>
        </h1>
        <div className="hidden lg:flex favourites">
          <CreatePostButton />
        </div>
      </div>
      <div className="main-layout-posts-feed favourites">
        <MyFavouritePostsFeed />
      </div>
    </div>
  );
};

export default FavouritesPageContent;