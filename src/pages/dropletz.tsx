import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
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
    const { data, error } = useSWR(
        `/api/dropletz/${account?.address}`,
        fetcher
    );

    if (error)
        return (
            <>
                {" "}
                <Alert status="error">
                    <AlertIcon />
                    Error fetching data
                </Alert>{" "}
            </>
        );
    if (!data) {
        return (
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
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
    console.log(data);
    return (
        <>
            <div>
                {Object.keys(data.dropletz).map((droplet) => {
                    if (data.dropletz[droplet] === true) return;
                    return <li key={droplet}>{droplet}</li>;
                })}
            </div>
        </>
    );
};

export default Home;
