import CardProduct from "@/components/CardProduct";
import React, { useState, useEffect } from "react";

function Products() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await fetch("/api/getProducts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPrices(data);
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[1040px] items-center mx-auto">
        {prices &&
          prices.map((price) => <CardProduct price={price} key={price.id} />)}
      </div>
    </div>
  );
}

export default Products;
