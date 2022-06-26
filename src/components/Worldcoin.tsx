import { useLayoutEffect } from "react";
import worldID from "@worldcoin/id"; // If you installed the JS package as a module
import { useAccount } from "wagmi";

export default function Worldcoin(): JSX.Element {
    const { data: account } = useAccount();

    const enableWorldId = async () => {
        try {
            const { merkle_root, nullifier_hash, proof } =
                await worldID.enable();
            console.log("World ID verified successfully:", nullifier_hash);
            const postData = {
                addr: account.address,
                nullHash: nullifier_hash,
            };
            await fetch("/api/verify/1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
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
                action_id: "wid_staging_b03bdf58f69c3dc1be604d70c263205e",
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
