import React from 'react';
import { Box, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link"

export const NavBar: React.FC<{}> = ({}) => {
    return (
        <Flex bg="tomato" p={4}>
            <Box ml={"auto"}>
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
            </Box>
        </Flex>
    )
}