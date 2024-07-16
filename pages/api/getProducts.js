import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const prices = await stripe.prices.list({ limit: 7 });
      res.status(200).json(prices.data.reverse());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prices" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
