"use client";
import {
  searchPost,
  searchProfile,
  SearchResultPostsType,
  SearchResultProfilesType,
} from "@/lib/supabase/queries";
import Link from "next/link";
import { SetStateAction, useState, useRef, useEffect } from "react";

const SearchBox = () => {
  
  const [input, setInput] = useState<string>("");
  const [searchResultsPosts, setSearchResultsPosts] =
    useState<SearchResultPostsType | null>(null);
  const [searchResultsProfiles, setSearchResultsProfiles] =
    useState<SearchResultProfilesType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleSearchClick = async () => {
    if (!input.trim()) return;
    const { data: postData, error: postError } = await searchPost(input);
    if (postError) throw postError;
    setSearchResultsPosts(postData);
    const { data: profileData, error: profileError } =
      await searchProfile(input);
    if (profileError) throw profileError;
    setSearchResultsProfiles(profileData);
  };

  const clearSearch = () => {
    setInput("");
    setSearchResultsPosts(null);
    setSearchResultsProfiles(null);
  };

  useEffect(() => {
    const shutResultWindow = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSearchResultsPosts(null);
        setSearchResultsProfiles(null);
      }
    };
    document.addEventListener("mousedown", shutResultWindow);
    return () => document.removeEventListener("mousedown", shutResultWindow);
  }, []);

  return (
    <div
      className="relative h-full w-full flex justify-center items-center"
      ref={containerRef}
    >
      <div className="border-casual-white border-3 hover:border-3 hover:border-old-gold focus-within:border-3 focus-within:border-old-gold flex justify-between rounded-4xl mx-4 w-full overflow-hidden">
        <input
          placeholder="Search..."
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchClick();
            if (e.key === "Escape") {
              setSearchResultsPosts(null);
              setSearchResultsProfiles(null);
            }
          }}
          value={input}
          className="p-1 w-full pl-3 border-none outline-none focus:border-mineral-green text-outer-space placeholder:text-outer-space/50 focus:placeholder:text-outer-space placeholder:bg-ecru-white bg-ecru-white "
        />
        <button
          onClick={handleSearchClick}
          className="bg-ecru-white hover:bg-old-gold border-0 px-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search preview-icon stroke-outer-space/50"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          <span className="tooltipText">Search</span>
        </button>
      </div>
      {searchResultsPosts && searchResultsProfiles && (
        <div className="absolute left-0 top-full border-apple border p-2 w-full bg-casual-white flex flex-col z-10 gap-4 font-semibold">
          {searchResultsPosts.map((result, index) => (
            <>
              <Link
                className="flex hover:bg-apple/40"
                key={index}
                href={`/post/${result.slug}`}
                onClick={clearSearch}
              >
                {result.title}
              </Link>
              <hr className="horizontal-rule"></hr>
            </>
          ))}
          {searchResultsProfiles.map((result, index) => (
            <Link
              className="flex items-center hover:bg-apple/40"
              key={index}
              href={`/members/${result.username}`}
              onClick={clearSearch}
            >
              {result.profile_image ? (
                <div className="w-10 h-10 mr-2">
                  <img
                    src={result.profile_image}
                    alt="profile user"
                    className="w-full h-full rounded-full"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 relative rounded-full mr-2">
                  <img
                    src="/images/profileImage_placeholder.png"
                    alt="user placeholder"
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              )}
              {result.username}
            </Link>
          ))}
          {searchResultsPosts.length === 0 &&
            searchResultsProfiles.length === 0 && <p>No matching results</p>}
        </div>
      )}
    </div>
  );
};

export default SearchBox;