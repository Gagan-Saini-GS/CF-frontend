import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "./input";
import { Navigate } from "react-router-dom";

const Searchbar = () => {
  const [searchFlag, setSearchFlag] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center">
      {searchFlag && (
        <Navigate to={"/products/search-results/" + searchQuery} />
      )}
      <Input
        type="text"
        className="hidden md:block px-2 py-1 rounded-tl rounded-bl border border-Black border-r-0 max-w-48 bg-Light"
        name="product-search"
        placeholder="Search product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setSearchFlag(true);
        }}
      />
      <div
        className="p-1 md:rounded-tr md:rounded-br md:border md:border-Black md:border-l-0 md:bg-Light cursor-pointer"
        onClick={() => setSearchFlag(true)}
      >
        <IoSearch className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Searchbar;
