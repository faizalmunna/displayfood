import React from "react";
import Select from "react-select";
import "./ProductSearch.scss";

const ProductSearch = ({
  foodList,
  selectedProductName,
  setSelectedProductName,
}) => {
  const options = foodList
    ? foodList.map((food) => ({ label: food.name, value: food.name }))
    : [];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "16px",
    }),
    option: (provided) => ({
        ...provided,
        fontSize: '14px', 
      }),
  };

  return (
    <Select
      className="selectbg"
      styles={customStyles}
      options={options}
      value={selectedProductName}
      onChange={(selectedOption) => setSelectedProductName(selectedOption)}
      isClearable
      placeholder="Enter restaurent name.."
    />
  );
};

export default ProductSearch;
