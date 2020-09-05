import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constant";

const main = async () => {
    const orm = await MikroORM.init({
        entities: [],
        dbName: 'content_board',
        user: 'mircea',
        type: 'postgresql',
        debug: !__prod__
    })
}

main()