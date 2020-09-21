import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Post } from "../entities/Post";
import { MyContext } from "../types";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

// we decorate the class with Resolver
@Resolver()
export class PostResolver {
    // Create
    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, { title })
        await em.persistAndFlush(post)
        return post
    }

    // Read
    @Query(() => [ Post ])
    async posts(
        @Ctx() { em }: MyContext
    ): Promise<Post[]> {
        // use in testing to slow server
        // await sleep(3000)
        return em.find(Post, {})
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id })
    }

    // Update
    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id })
        if (!post) {
            return null
        }
        if (typeof title !== 'undefined') {
            post.title = title
            await em.persistAndFlush(post)
        }
        return post
    }

    // Delete
    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<Boolean> {
        const post = await em.findOne(Post, { id })
        if (!post) {
            return false
        }

        try {
            await em.nativeDelete(Post, { id })
        } catch {
            return false
        }

        return true
    }
}