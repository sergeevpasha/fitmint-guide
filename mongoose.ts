import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: '.env.local' });

declare let global: any;

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = { conn: null, promise: null };
    global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            socketTimeoutMS: 1000
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then(cachedMongoose => cachedMongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
