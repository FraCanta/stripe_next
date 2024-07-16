import Image from "next/image";
import Link from "next/link";
import React from "react";

function CardProduct({ price }) {
  const handleSubscription = async (e) => {
    e.preventDefault();
    const { data } = await fetch(
      "/api/payment",
      {
        priceId: price.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };

  return (
    <div className="h-full bg-white border card">
      <div className="card-body !p-2">
        <h2 className="card-title !justify-center font-bold text-[20px] fxl:text-3xl">
          {price.nickname}
        </h2>
        <div className="justify-center mt-4 border-t card-actions">
          <p className=" py-4 font-bold text-[16px]">
            {(price.unit_amount / 100).toLocaleString("it-IT", {
              style: "currency",
              currency: "eur",
            })}
          </p>
          <button
            className="mt-8 flex w-full justify-center uppercase rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm"
            onClick={handleSubscription}
          >
            prenota ora
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
