import type { NextPage } from "next";
// import { Worldcoin } from "../components/Worldcoin";
import dynamic from "next/dynamic";

const Worldcoin = dynamic(() => import("../components/Worldcoin"), {
    ssr: false,
});

const Home: NextPage = () => {
    return (
        <>
            Hello
            <Worldcoin />
        </>
    );
};

export default Home;
