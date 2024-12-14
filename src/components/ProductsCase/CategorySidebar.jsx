// "use client";

// import React, { useEffect } from "react";

// const CategorySidebar = ({
//   categories,
//   selectedCategory,
//   setSelectedCategory,
//   setSearchTerm,
// }) => {
//   useEffect(() => {
//     // Scroll the page to the top when the selected category changes
//     window.scrollTo(0, 0);
//   }, [selectedCategory]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setSearchTerm(""); // Reset search term when category changes
//   };

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="p-4 border-r border-gray-300 hidden md:block sticky top-[60px] h-screen overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4">Categories</h2>
//         <ul className="space-y-2">
//           {categories.map((category) => (
//             <li
//               key={category}
//               onClick={() => handleCategoryChange(category)}
//               className={`cursor-pointer px-3 py-1 rounded ${
//                 selectedCategory === category
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               {category}
//             </li>
//           ))}
//           <li
//             onClick={() => handleCategoryChange("All Categories")}
//             className={`cursor-pointer px-3 py-1 rounded ${
//               selectedCategory === "All Categories"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-black"
//             }`}
//           >
//             All Categories
//           </li>
//         </ul>
//       </div>

//       {/* Mobile Menu */}
//       <div className="block md:hidden fixed top-[64px] left-0 w-full bg-white z-20 border-b border-gray-300">
//         <div className="p-4">
//           <h2 className="text-lg font-bold mb-4">Categories</h2>
//           <ul className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <li
//                 key={category}
//                 onClick={() => handleCategoryChange(category)}
//                 className={`cursor-pointer mb-2 px-3 py-1 rounded ${
//                   selectedCategory === category
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-black"
//                 }`}
//               >
//                 {category}
//               </li>
//             ))}
//             <li
//               onClick={() => handleCategoryChange("All Categories")}
//               className={`cursor-pointer mb-2 px-3 py-1 rounded ${
//                 selectedCategory === "All Categories"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               All Categories
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CategorySidebar;

"use client";

import React from "react";

const CategorySidebar = ({
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
    <>
      {/* Mobile Menu */}
      <div className="block md:hidden  border-b border-gray-300 bg-white sticky top-0 z-20">
        <h2 className="text-lg font-bold mb-4 mt-2 ">Categories</h2>
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

      {/* Desktop Sidebar */}
      <div className="p-4 border-r border-gray-300 hidden md:block sticky top-[64px] h-screen overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`cursor-pointer px-3 py-1 rounded ${
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
            className={`cursor-pointer px-3 py-1 rounded ${
              selectedCategory === "All Categories"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            All Categories
          </li>
        </ul>
      </div>
    </>
  );
};

export default CategorySidebar;
