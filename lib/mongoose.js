import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// declare global {
//   var mongooseCache: {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
//   }
// }

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached?.conn) return cached.conn;

  if (!cached?.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });   
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
