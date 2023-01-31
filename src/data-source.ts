import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGODB_URL + "w=majority&readPreference=primary&retryWrites=true",
    ssl: true,
    authSource: "admin",
    useUnifiedTopology: true,
    replicaSet: "atlas-p1o8d0-shard-0",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
