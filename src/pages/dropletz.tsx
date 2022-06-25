import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
    const { data: account } = useAccount();
    if (!account) return <> Please connect </>;
    const dropRes = fetch(`/api/dropletz/${account?.address}`);
    return <>Dropletz</>;
};

export default Home;
