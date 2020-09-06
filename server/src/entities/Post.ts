import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// Decorators, which we can stack
// turn class into graphql type
@ObjectType()
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({ type: 'date' })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();

    // by adding the field we expose it to graphql schema
    // by commenting out the field we can hide it, byt still save to DB
    @Field()
    @Property({ type: 'text' })
    title!: string;
}