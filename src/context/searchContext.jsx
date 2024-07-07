import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
