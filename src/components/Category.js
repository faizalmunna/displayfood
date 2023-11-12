import React from "react";
import "./Category.scss";

const Category = ({ categoryListWithAll, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-list">
      {categoryListWithAll ? (
        categoryListWithAll.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? "selected" : ""}
          >
            {category.name}
          </div>
        ))
      ) : (
        <div>Loading categories...</div>
      )}
    </div>
  );
};

export default Category;
