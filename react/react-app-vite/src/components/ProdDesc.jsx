import React from "react";
import product from "../product.json";

const ProdDesc = () => {
  return (
    <p className="text-muted">
      <strong style={{ color: "#e91e63" }}>Description:</strong>{" "}
      {product.description}
    </p>
  );
};

export default ProdDesc;
