import { MikroORM } from "@mikro-orm/core"
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"

const main = async () => {
    // connect ot db
    const orm = await MikroORM.init(microConfig)
    // run schema migrations
    await orm.getMigrator().up()
    // run sql
    const post = orm.em.create(Post, { title: 'my first post' })
    await orm.em.persistAndFlush(post)

    // check insertions
    // const posts = await orm.em.find(Post, {})
    // console.log(posts)
}

main()