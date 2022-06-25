import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";

const Home: NextPage = () => {
    const { data: account } = useAccount();
    if (!account)
        return (
            <>
                {" "}
                <Alert status="error">
                    <AlertIcon />
                    Please connect a wallet!
                </Alert>{" "}
            </>
        );
    const dropRes = fetch(`/api/dropletz/${account?.address}`);
    return <>Dropletz</>;
};

export default Home;
