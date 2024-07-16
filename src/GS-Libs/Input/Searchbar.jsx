import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "./input";
import { useSearchContext } from "../../context/searchContext";

const Searchbar = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <div className="flex items-center relative">
      <Input
        type="text"
        className={`md:block px-2 py-1 rounded-tl rounded-bl border border-Black max-w-48 bg-Light ${
          showSearchInput
            ? "block absolute -left-[200px] top-0 border-r rounded-tr rounded-br"
            : "hidden border-r-0"
        } `}
        name="product-search"
        placeholder="Search product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="p-1 md:rounded-tr md:rounded-br md:border md:border-Black md:border-l-0 md:bg-Light cursor-pointer">
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
