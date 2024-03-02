import dotenv from 'dotenv';
import Redis from "ioredis";
dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT) ?? 6379;
const REDIS_USERNAME = process.env.REDIS_USERNAME ?? "";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? "";

const redisPubClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest: 100,
    autoResendUnfulfilledCommands: true,
    enableReadyCheck: true,
    connectTimeout: 10000,
    enableAutoPipelining: true,
    enableOfflineQueue: true,
    connectionName: "pub",
    name: "pub",
    noDelay: true,
})
    .on("connect", () => { console.log("Redis Pub Connected"); })
    .on("ready", () => { console.log("Redis Pub Ready"); })
    .on("end", () => { console.log("Redis Pub End"); })
    .on("reconnecting", () => { console.log("Redis Pub reconnecting"); })
    .on("error", (error) => { console.error("Redis Pub Error", error); })

const redisSubClient = redisPubClient.duplicate({
    connectionName: "sub",
    name: "sub",
})
    .on("connect", () => { console.log("Redis Sub Connected"); })
    .on("ready", () => { console.log("Redis Sub Ready"); })
    .on("error", (error) => { console.error("Redis Sub Error", error); })
    .on("end", () => { console.log("Redis Sub End"); })
    .on("reconnecting", () => { console.log("Redis Sub reconnecting"); })

// Export the pubClient and subClient
export { redisPubClient, redisSubClient };


class RedisManager {
    hostname: any = null;
    port: any = null;
    redis_host: any = null;
    constructor() {
        console.log("redisPubClient.isReady", redisPubClient.status)
        console.log("redisSubClient.isReady", redisPubClient.status)
    }

    async get(query: string) {
        if (redisPubClient?.status !== "ready") return null

        const sessionObj = await redisPubClient.get(query);
        return sessionObj;

    }

    async set(key: string, data: any, expiry: any = null) {
        if (redisPubClient?.status !== "ready") return null

        if (expiry) {
            await redisPubClient.set(key, data, "EX", 60 * 60 * 24 * expiry);
            return true;

        } else {
            await redisPubClient.set(key, data);
            return true;
        }
    }
}

export default RedisManager;
