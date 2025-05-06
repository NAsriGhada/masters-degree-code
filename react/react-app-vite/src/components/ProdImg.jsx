import React from "react";
import product from "../product.json";

const ProdImg = () => {
  return (
    <img
      src={product.image}
      alt={product.name}
      className="img-fluid rounded-top"
    />
  );
};
export default ProdImg;
