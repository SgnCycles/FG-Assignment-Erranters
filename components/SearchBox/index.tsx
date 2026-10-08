"use client";
import { searchPost, SearchResultType } from "@/lib/supabase/queries";
import Link from "next/link";
import { SetStateAction, useState } from "react";

const SearchBox = () => {

  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultType | null>(
    null,
  );

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    const { data, error } = await searchPost(input);
    console.log("Search", data);
    if (error) throw new Error();
    setSearchResults(data);
  };

  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <div className="border-apple hover:border-old-gold border flex justify-between rounded-2xl mx-4 w-full overflow-hidden">
        <input
          placeholder="Search..."
          onChange={handleChange}
          value={input}
          className="p-1 w-full pl-3 border-0 outline-none focus:border-mineral-green focus:border focus:rounded-l-2xl text-outer-space placeholder:text-outer-space placeholder:bg-ecru-white bg-ecru-white"
        />
        <button
          onClick={handleClick}
          className="tooltip bg-apple hover:bg-old-gold border-0 px-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#faf9f2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search preview-icon"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          <span className="tooltipText">Search</span>
        </button>
      </div>
      {searchResults && (
        <div className="absolute left-0 top-full border-apple border p-2 w-full bg-ecru-white">
          {searchResults.map((result, index) => (
            <Link className="block" key={index} href={`/${result.slug}`}>
              {result.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;