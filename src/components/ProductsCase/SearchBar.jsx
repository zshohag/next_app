"use client";

import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, selectedCategory }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-4  ">
        {" "}
        {selectedCategory ? `${selectedCategory} Products` : "All Products"}
      </h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded"
      />
    </div>
  );
};

export default SearchBar;
