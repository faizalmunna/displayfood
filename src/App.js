import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodlist } from "./features/foodlist/foodListSlice";
import { getCategory } from "./features/foodlist/categoryListSlice";
import ProductSearch from "./components/ProductSearch";
import Pagination from "./components/Pagination";
import Category from "./components/Category";
import FoodCard from "./components/FoodCard";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getFoodlist());
      await dispatch(getCategory());
      setSelectedCategory("all");
    };

    fetchData();
  }, [dispatch]);

  const foodList = useSelector((state) => state.foodlist.data.foods);
  const categoryList = useSelector((state) => state.category.data);

  const categoryListWithAll = [
    { id: "all", name: "Show All" },
    ...categoryList,
  ];

  const filteredByCategory =
    selectedCategory !== null && selectedCategory !== "all"
      ? foodList.filter((food) => food.categoryId === selectedCategory)
      : selectedCategory === "all"
      ? foodList
      : [];

  const filteredFoodList = selectedProductName
    ? filteredByCategory.filter(
        (food) => food.name === selectedProductName.label
      )
    : filteredByCategory;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoodList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handlePromotion(promotion) {
    let imageSrc = "";
    let randomText = "";
    let styleClass = "";

    switch (promotion) {
      case "1+1":
        randomText = "1+1";
        styleClass = "plusOne";

        break;
      case "gift":
        imageSrc = require("./assets/gift.svg").default;
        styleClass = "giftItem";
        break;
      case "discount":
        randomText = "%";
        styleClass = "percentage";
        break;
      default:
        break;
    }

    return (
      <div className={styleClass}>
        {imageSrc === "" ? (
          ""
        ) : (
          <img src={imageSrc} alt={`${promotion} Promotion Image`} />
        )}
        <div>{randomText}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="appInner-wrapper">
        <div className="search-wrapper">
          <ProductSearch
            foodList={foodList}
            selectedProductName={selectedProductName}
            setSelectedProductName={setSelectedProductName}
          />
        </div>
        <div className="category-wrapper">
          <Category
            categoryListWithAll={categoryListWithAll}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="food-wrapper">
        <FoodCard currentItems={currentItems} handlePromotion={handlePromotion} />
        </div>
        {filteredFoodList.length > itemsPerPage && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredFoodList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default App;
