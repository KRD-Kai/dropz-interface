import { useLayoutEffect } from "react";
import worldID from "@worldcoin/id"; // If you installed the JS package as a module

export default function Worldcoin(): JSX.Element {
    const enableWorldId = async () => {
        try {
            const { merkle_root, nullifier_hash, proof } =
                await worldID.enable();
            console.log("World ID verified successfully:", nullifier_hash);
        } catch (failure) {
            console.warn("World ID verification failed:", failure);
            //   const result = await worldID.enable();
            // Re-activate here so your end user can try again
        }
    };
    const activateWorldId = async () => {
        if (!worldID.isInitialized()) {
            worldID.init("world-id-container", {
                // enable_telemetry: true,
                action_id: "wid_staging_aab43c65569959c2942f23cfffb71e4d",
                signal: "any_string",
            });
        }

        if (worldID.isInitialized() && !worldID.isEnabled()) {
            enableWorldId();
        }
    };

    useLayoutEffect(() => {
        activateWorldId();
    }, []);

    return <div id="world-id-container"></div>;
}
