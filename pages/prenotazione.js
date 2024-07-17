import React, { useState, useEffect } from "react";
import clientPromise from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

function Prenotazione({ products, currentPage }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);

  if (loading) {
    return <div className="container py-20 mx-auto">Caricamento...</div>;
  }

  return (
    <div className="w-[90%] flex flex-col gap-10 py-20 mx-auto">
      <h1>Prenotazione</h1>
      {/* Renderizza i dati */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {products.map((product, i) => (
          <ul key={i}>
            <li key={product.id} className="flex flex-col gap-4">
              <div className="relative aspect-square">
                <Image
                  src={
                    product.poster
                      ? product.poster
                      : "https://placehold.co/600x400/orange/white/png"
                  }
                  fill
                  alt=""
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="text-md text-black/50">{product.genres}</p>
              <h1 className="text-xl font-bold text-black">{product.title}</h1>
              <h2>Director(s): {product.directors}</h2>
              <p className="">{product.fullplot}</p>
              <div className="w-full h-[0.02rem] bg-black/30"></div>
              <p>Cast: {product.cast ? product.cast.join(", ") : ""}</p>
            </li>
          </ul>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Link
          href={`/prenotazione?page=${currentPage - 1}`}
          className={`${
            currentPage === 1
              ? "disabled opacity-30 cursor-none bg-black py-3 px-4 text-white font-bold"
              : "bg-black py-3 px-4 text-white font-bold"
          }`}
        >
          Previous
        </Link>
        <Link
          href={`/prenotazione?page=${currentPage + 1}`}
          className="px-4 py-3 font-bold text-white bg-black"
        >
          Next
        </Link>
      </div>
    </div>
  );
}

export default Prenotazione;

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const page = parseInt(context.query.page) || 1;
    const limit = 6; // Numero di elementi per pagina
    const skip = (page - 1) * limit;

    const products = await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)), // Conversione dei dati MongoDB in oggetti JavaScript
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data from MongoDB", error);
    return {
      props: {
        products: [],
        currentPage: 1,
      },
    };
  }
}
