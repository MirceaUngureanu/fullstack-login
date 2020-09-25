import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2"
import { EntityManager } from "@mikro-orm/postgresql"
import { COOKIE_NAME } from "../constant";
import { UsernamePasswordInput } from "./usernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [ FieldError ], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User
}

@Resolver()
export class UserResolver {
    @Mutation(() => Boolean)
    async forgotPassword(
        // @Arg("email") email: string,
        // @Ctx() { em }: MyContext
    ) {
        // const user = await em.findOne(User, { email })
        return true
    }

    // me quary for sanity check
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { req, em }: MyContext
    ) {
        // you are not logged in
        if (!req.session!.userId) {
            return null
        }

        const user = await em.findOne(User, { id: req.session!.userId })
        return user
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        const errors = validateRegister(options)
        if (errors) {
            return { errors }
        }

        const hashedPassword = await argon2.hash(options.password)

        let user
        try {
            const result = await (em as EntityManager).createQueryBuilder(User).getKnexQuery().insert({
                email: options.email,
                username: options.username,
                password: hashedPassword,
                created_at: new Date(),
                updated_at: new Date()
            }).returning("*")
            user = result[0]
        } catch (err) {
            //  || err.detail.include("already exists")
            if (err.code === '23505') {
                // duplicate username error
                return {
                    errors: [ {
                        field: 'username',
                        message: 'username already taken'
                    } ]
                }
            } else {
                // console.log("duplicate user:", err.message)
            }
        }

        // set auth cookie
        req.session!.userId = user.id

        // use needs to be in an object which is the response object
        return { user }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        // error handling in graphql
        const user = await em.findOne(User, usernameOrEmail.includes("@") ?
            { email: usernameOrEmail } :
            { username: usernameOrEmail }
        )

        if (!user) {
            return {
                errors: [ {
                    field: "username",
                    message: "That username doesn't exist"
                } ]
            }
        }
        const valid = await argon2.verify(user.password, password)
        if (!valid) {
            return {
                errors: [ {
                    field: "password",
                    message: "incorrect password"
                } ]
            }
        }

        // set auth cookie
        req.session!.userId = user.id

        return { user }
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) => {
            req.session?.destroy((err) => {
                res.clearCookie(COOKIE_NAME)
                if (err) {
                    console.log(err)
                    resolve(false)
                    return
                }

                resolve(true)
            })
        })
    }

}