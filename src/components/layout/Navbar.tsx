import { Box, Container, Flex, Image, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";
import * as React from "react";

function Navbar(): JSX.Element {
    return (
        <Box borderBottom="1px">
            <Container maxW="5xl" py={4}>
                <Flex alignItems="center" justify="space-between">
                    <NextLink href="/" passHref>
                        <Link>Droplets</Link>
                    </NextLink>
                    <ConnectButton accountStatus="address" />
                </Flex>
            </Container>
        </Box>
    );
}

export default Navbar;
