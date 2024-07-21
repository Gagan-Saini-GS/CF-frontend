import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "./input";
import { useSearchContext } from "../../context/searchContext";
import { useTheme } from "../../context/themeContext";

const Searchbar = () => {
  const { theme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearchContext();
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <div
      className={`flex items-center relative ${
        theme === "light" ? "bg-White text-Black/80" : "bg-Black text-White/80"
      }`}
    >
      <Input
        type="text"
        className={`md:block px-2 py-1 rounded-tl rounded-bl border max-w-48 ${
          showSearchInput
            ? "block absolute -left-[200px] top-0 border-r rounded-tr rounded-br"
            : "hidden border-r-0"
        } ${
          theme === "light"
            ? "bg-White text-Black/80 border-Black"
            : "bg-Black text-White/80 border-Gray"
        } `}
        name="product-search"
        placeholder="Search product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div
        className={`p-1 md:rounded-tr md:rounded-br md:border md:border-l-0 cursor-pointer ${
          theme === "light"
            ? "bg-White text-Black/80 md:border-Black"
            : "bg-Black text-White/80 md:border-Gray"
        } `}
      >
        <div className="hidden md:block">
          <IoSearch className="w-6 h-6" />
        </div>
        <div className="md:hidden">
          <IoSearch
            className="w-6 h-6"
            onClick={() => setShowSearchInput((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
