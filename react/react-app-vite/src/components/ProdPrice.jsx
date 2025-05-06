import React from "react";
import product from "../product.json";

const ProdPrice = () => {
  return (
    <p className="fw-semibold" style={{ color: "#27ae60" }}>
      Price: <span style={{ color: "#2ecc71" }}>{product.price}</span>
    </p>
  );
};

export default ProdPrice;
