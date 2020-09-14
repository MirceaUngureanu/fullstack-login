import React from 'react';
import { Box, Button, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link"
import { useMeQuery } from "../generated/graphql";

export const NavBar: React.FC<{}> = ({}) => {
    const [ { data, fetching } ] = useMeQuery()
    let body = null

    // data is loading
    if (fetching) {

        // user is not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr="2">
                        login
                    </Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>
                        register
                    </Link>
                </NextLink>
            </>
        )
        // use is logged in
    } else {
        body =(
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button variant="link">logout</Button>
            </Flex>
        )
    }

    return (
        <Flex
            bg="tan"
            p={ 4 }>
            <Box ml={ "auto" }>
                { body }
            </Box>
        </Flex>
    )
}