import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT) ?? 6379;
const REDIS_USERNAME = process.env.REDIS_USERNAME ?? "";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? "";

// let cached = (global as any).redis || { conn: null, promise: null };

// export const connectToRedis = async () => {
//     if (cached.conn) return cached.conn;

//     if (!REDIS_HOST) throw new Error("HOST is missing");

//     if (!REDIS_PORT) throw new Error("PORT is missing");

//     if (!REDIS_USERNAME) throw new Error("USERNAME is missing");

//     if (!REDIS_PASSWORD) throw new Error("PASSWORD is missing");

    
//         cached.promise = cached.promise || new Redis({
//             host: "nextchat-annnmol-nextchat.a.aivencloud.com",
//             port: 21555,
//             username: "default",
//             password: "AVNS_EImMGVwW9Pms2hhgihi",
//             maxRetriesPerRequest: 100,
//         }).on("error", (error) => { console.error("Redis Pub Error", error); });

//         cached.conn = cached.promise;

//         return cached.conn;
   
// };

// Create a Redis client
export const redisPubClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest: 100,
}).on("error", (error) => { console.error("Redis Pub Error", error); });
export const redisSubClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest: 100,
}).on("error", (error) => { console.error("Redis Pub Error", error); });

// Export the client and the adapter
// export const redisSubClient = redisPubClient.duplicate();
