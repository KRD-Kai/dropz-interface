import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
    Alert,
    AlertIcon,
    Center,
    Spinner,
    Box,
    Text,
    Divider,
} from "@chakra-ui/react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import CompletedList from "../components/CompletedList";

const Worldcoin = dynamic(() => import("../components/Worldcoin"), {
    ssr: false,
});
const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
    ...args: any[]
) => {
    const res = await fetch(input, init);
    return res.json();
};
const Home: NextPage = () => {
    const { data: account } = useAccount();
    const { data: dropletData, error: dropletErr } = useSWR(
        `/api/dropletz/${account?.address}`,
        fetcher
    );
    const { data: isVerifiedData, error: verifiedErr } = useSWR(
        `/api/verify/${account?.address}`,
        fetcher
    );

    if (isVerifiedData && dropletData) {
        const { isVerified } = isVerifiedData;
        return (
            <>
                <Box textAlign="center">
                    Verification status:{" "}
                    {isVerified ? (
                        <>
                            <Text as="b" textColor="green.700">
                                Verified
                            </Text>
                            🎉. You are eligible for airdrops
                        </>
                    ) : (
                        <>
                            <Text as="b" textColor="red.700">
                                Unverified ❌
                            </Text>
                            . Please verify your wallet as a person:
                            <br />
                            <Center marginTop="1em">
                                <Worldcoin />
                            </Center>
                        </>
                    )}
                </Box>
                <CompletedList dropletz={dropletData.dropletz} />
            </>
        );
    }

    {
        /* {if(dropletErr) {
            <Alert status="error">
                <AlertIcon />
                Error fetching completed droplets
            </Alert>;
        }
    } */
    }
    if (!dropletData) {
        return (
            <Center>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Center>
        );
    }
    if (!account) {
        return (
            <>
                <Alert status="warning">
                    <AlertIcon />
                    Please connect a wallet!
                </Alert>
            </>
        );
    }
    console.log(dropletData);
    return (
        <>
            {dropletData.dropletz.map((droplet) => {
                if (droplet.completed === false) return;
                <li>droplet.appName</li>;
            })}
        </>
    );
};

export default Home;
