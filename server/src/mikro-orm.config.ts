import { Post } from "./entities/Post";
import { __prod__ } from "./constant";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [ Post ],
    dbName: 'content_board',
    user: 'mircea',
    type: 'postgresql',
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]