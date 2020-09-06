import { Ctx, Query, Resolver } from "type-graphql"
import { Post } from "../entities/Post";
import { MyContext } from "../types";

// we decorate the class with Rezolver
@Resolver()
export class PostResolver {
    @Query(() => [ Post ])
    posts(
        @Ctx() { em }: MyContext
    ): Promise<Post[]> {
        return em.find(Post, {})
    }
}