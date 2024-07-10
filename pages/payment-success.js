import { useRouter } from "next/router";

export default function PaymentSuccess() {
  const router = useRouter();
  const { amount } = router.query;

  return (
    <main className="max-w-6xl p-10 m-10 mx-auto text-center text-white border rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-extrabold">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="p-2 mt-5 text-4xl font-bold text-purple-500 bg-white rounded-md">
          €{amount}
        </div>
      </div>
    </main>
  );
}
