import { Query, Resolver } from "type-graphql"

// we decorate the class with Rezolver
@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello() {
        return "Hello world"
    }
}