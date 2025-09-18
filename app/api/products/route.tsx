import { connectDB } from "@/lib/mongoose";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  desc: String,
  qty: Number,
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return Response.json(products);
}
export async function POST(request) {
   try {
    await connectDB();

    const body = await request.json();
    const product = await Product.create(body);

    return Response.json(product, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}