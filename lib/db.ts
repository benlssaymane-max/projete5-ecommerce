import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/novalux';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI in environment variables.');
}

type CachedMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: CachedMongoose | undefined;
}

const cached: CachedMongoose = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: 'novalux' });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}