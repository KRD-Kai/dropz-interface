import { useLayoutEffect } from "react";
import worldID from "@worldcoin/id"; // If you installed the JS package as a module

export function Worldcoin(): JSX.Element{
   

    const activateWorldId = async () => {
        worldID.init("world-id-container", {
            enable_telemetry: true,
            action_id: "wid_staging_aab43c65569959c2942f23cfffb71e4d",
            signal: 'any_string'
        });

        try {
            const {merkle_root, nullifier_hash, proof} = await worldID.enable();
            console.log("World ID verified successfully:", nullifier_hash);
        } catch (failure) {
            console.warn("World ID verification failed:", failure);
            //   const result = await worldID.enable();
            // Re-activate here so your end user can try again
        }
    }

    useLayoutEffect( () => {
        activateWorldId()
    }, [])

    return <div id="world-id-container"></div>
}