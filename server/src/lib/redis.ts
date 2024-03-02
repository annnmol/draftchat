import dotenv from 'dotenv';
import Redis from "ioredis";
dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT) ?? 6379;
const REDIS_USERNAME = process.env.REDIS_USERNAME ?? "";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? "";

const SESSION_TTL = 24 * 60 * 60;

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

    function mapSession(session: any) {
        let username, connected;
    
        if (Array.isArray(session)) {
            [username, connected] = session;
        } else if (typeof session === 'object' && session !== null) {
            ({ username, connected } = session);
        } else {
            throw new TypeError('Session must be an array or an object');
        }
    
        if (typeof username !== 'string' || typeof connected !== 'string') {
            throw new TypeError('Username and connected must be strings');
        }
    
        return {
            username,
            connected: connected === 'true',
        };
    }



class RedisSessionStore {

    async get(query: string) {
        const data = await redisPubClient.get(query);
        return data;

    }

    async set(key: string, data: any, expiry: any = null) {
        if (expiry) {
            redisPubClient.set(key, data, "EX", 60 * 60 * 24 * expiry);
        } else {
            redisPubClient.set(key, data);
        }
    }

    public async findSession(id: string) {
        return await redisPubClient
            .hmget(`session:${id}`, "username", "connected")
            .then(mapSession);
    }

    public async saveSession(id: string, { username, connected }: any) {
        try {
            await redisPubClient
                .multi()
                .hset(
                    `session:${id}`,
                    "username",
                    username,
                    "connected",
                    connected
                )
                .expire(`session:${id}`, SESSION_TTL)
                .exec();

        } catch (err) {
            console.error("Error saving session", err);
        }
    }

    // public async findAllSessions() {
    //     const keys = new Set();
    //     let nextIndex = 0;
    //     do {
    //         const [nextIndexAsStr, results] = await redisPubClient.scan(
    //             nextIndex,
    //             "MATCH",
    //             "session:*",
    //             "COUNT",
    //             "100"
    //         );
    //         nextIndex = parseInt(nextIndexAsStr, 10);
    //         results.forEach((s: any) => keys.add(s));
    //     } while (nextIndex !== 0);
    //     const commands: any = [];
    //     keys.forEach((key) => {
    //         commands.push(["hmget", key, "username", "connected"]);
    //     });
    //     return await redisPubClient
    //         .multi(commands)
    //         .exec()
    //         .then((results: any) => {
    //             return results
    //                 .map(([err, session]: any) => (err ? undefined : mapSession(session)))
    //                 .filter((v: any) => !!v);
    //         });
    // }

    public async findAllSessions() {
        const keys = new Set();
        let nextIndex = 0;
        do {
            const [nextIndexAsStr, results] = await redisPubClient.scan(
                nextIndex,
                "MATCH",
                "session:*",
                "COUNT",
                "100"
            );
            nextIndex = parseInt(nextIndexAsStr, 10);
            results.forEach((s: any) => keys.add(s));
        } while (nextIndex !== 0);

        const sessions = [];
        for (let key of keys) {
            try {
                const session = await redisPubClient.hgetall(key as string);
                if (session.username) {
                    sessions.push(mapSession(session));
                }
            } catch (err) {
                console.error("Error getting session", err);
            }
        }
        return sessions;
    }
}



const redisSessionStore = new RedisSessionStore();

// Export the pubClient and subClient and the sessionStore
export { redisPubClient, redisSubClient, redisSessionStore };