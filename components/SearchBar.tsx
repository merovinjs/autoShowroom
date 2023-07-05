"use client";
import { useState } from "react";
import React from "react";
import { SearchManufacturer } from "./index";

const SearchBar = () => {
  const [manifacturer, setManifacturer] = useState("");
  const handleSearch = () => {};
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manifacturer={manifacturer}
          setManifacturer={setManifacturer}
        />
      </div>
    </form>
  );
};

export default SearchBar;
