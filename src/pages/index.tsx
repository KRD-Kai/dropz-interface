import type { NextPage } from "next";
// import { Worldcoin } from "../components/Worldcoin";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";

const Worldcoin = dynamic(() => import("../components/Worldcoin"), {
    ssr: false,
});

const Home: NextPage = () => {
    const { data: account } = useAccount();

    return (
        <>
            Hello
            {account && <Worldcoin />}
        </>
    );
};

export default Home;
