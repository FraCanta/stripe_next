import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "../lib/covertToSubcurrency";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutPage from "@/components/CheckoutPage";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
  const amount = 19.99;

  return (
    <main className="max-w-6xl p-10 m-10 mx-auto text-center text-white border rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-extrabold">Giorgio</h1>
        <h2 className="text-2xl">
          ha richiesto
          <span className="font-bold"> €{amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "eur",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>

      <Link href="/prenotazione">Link a pagina</Link>
    </main>
  );
}
