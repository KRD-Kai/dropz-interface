import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
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
                Verified: {isVerified ? "Yes" : <Worldcoin />}
                <CompletedList dropletz={dropletData.dropletz} />;
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
