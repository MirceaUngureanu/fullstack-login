import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import {Request, Response} from "express"
import { Redis } from "ioredis";

// for constants
export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    // & combined types
    req: Request,
    res: Response,
    redis: Redis
}