import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import DropletCard from "../components/DropletCard";

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
    let tasks_completed = 0;
    return (
        <>
            {data.dropletz.map((droplet: any) => {
                if (droplet.completed === true){
                    ++tasks_completed;
                    console.log("tasks completed: ", tasks_completed);
                    return;
                } 
                return (
                    <>
                    <DropletCard key={droplet.appName} droplet={droplet} />
                    {/* <p className="drop"></p> */}
                    </>
                );
                return <DropletCard key={droplet.appName} droplet={droplet} />;
            })}
        </>
    );
};

export default Home;
