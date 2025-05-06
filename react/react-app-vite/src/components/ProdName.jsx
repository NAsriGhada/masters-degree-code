import React from "react";
import product from "../product.json";

const ProdName = () => {
  return (
    <h5
      className="fw-bold mb-2"
      style={{
        background: "linear-gradient(to right, #8e44ad, #2980b9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Product Name: <span>{product.name}</span>
    </h5>
  );
};

export default ProdName;
