import type { NextPage } from "next";
// import { Worldcoin } from "../components/Worldcoin";
import dynamic from "next/dynamic";
// import {Profile} from "./skynet";
const Profile = dynamic(() => import("../components/skynet"), {
    ssr: false,
});
const Worldcoin = dynamic(() => import("../components/Worldcoin"), {
    ssr: false,
});

const Home: NextPage = () => {
    return (
        <>
            Hello
            <Worldcoin />
            <Profile /> 
        </>
    );
};

export default Home;
