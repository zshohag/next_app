"use client";

import React from "react";

const MobileCategoryMenu = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSearchTerm,
}) => {
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Reset search term when category changes
  };

  return (
    <div className="p-4 block md:hidden border-b border-gray-300 bg-white z-20 sticky top-[64px]">
      <h2 className="text-lg font-bold mb-4 mt-2">Categories</h2>
      <ul className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`cursor-pointer mb-2 px-3 py-1 rounded ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {category}
          </li>
        ))}
        <li
          onClick={() => handleCategoryChange("All Categories")}
          className={`cursor-pointer mb-2 px-3 py-1 rounded ${
            selectedCategory === "All Categories"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          All Categories
        </li>
      </ul>
    </div>
  );
};

export default MobileCategoryMenu;
