import type { NextPage } from "next";
// import { Worldcoin } from "../components/Worldcoin";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
    const { data: account } = useAccount();

    return <>Hello</>;
};

export default Home;
