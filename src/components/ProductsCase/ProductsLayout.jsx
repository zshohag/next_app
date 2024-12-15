"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CategorySidebar from "./CategorySidebar";
import MobileCategoryMenu from "./MobileCategoryMenu";
import ProductsGrid from "./ProductsGrid";

const ProductsLayout = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories"); // Default is "All Categories"

  // Extract unique categories from products
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Filter products based on selected category
  const filteredByCategory =
    selectedCategory !== "All Categories"
      ? products.filter((product) => product.category === selectedCategory)
      : products;

  // Further filter products based on search term
  const filteredProducts = filteredByCategory.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Mobile Menu */}
      <MobileCategoryMenu
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSearchTerm={setSearchTerm}
      />

      {/* Sidebar for categories */}
      <div className="hidden md:block md:w-1/4">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSearchTerm={setSearchTerm} // Pass setSearchTerm to handle search reset
        />
      </div>

      {/* Main Content Area */}

      <main className="flex-1 p-4">
        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
        />

        {/* Products Grid */}
        <div className="mt-4">
          <ProductsGrid products={filteredProducts} />
        </div>
      </main>
    </div>
  );
};

export default ProductsLayout;
