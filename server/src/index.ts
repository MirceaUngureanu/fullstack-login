import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core"
import microConfig from "./mikro-orm.config"
import express from 'express'
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis"
import { __prod__, COOKIE_NAME } from "./constant";
import cors from "cors"

const main = async () => {
    // connect ot db
    const orm = await MikroORM.init(microConfig)
    // await orm.em.nativeDelete(User, {})
    // run schema migrations
    await orm.getMigrator().up()

    // the order of the middleware matters
    const app = express()

    // redis
    const RedisStore = connectRedis(session)
    const redis = new Redis({})


    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: 'lax', // csrf
                secure: __prod__ // cookie only works in https
            },
            saveUninitialized: false,
            // REMOVED
            resave: false
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ HelloResolver, PostResolver, UserResolver ],
            validate: false
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res, redis })
    })

    apolloServer.applyMiddleware({
        app,
        cors: false
    })

    app.listen(4000, () => {
        console.log('server stated on http://localhost:4000 and dashboard at http://localhost:4000/graphql')
    })
}

main()