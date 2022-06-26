import worldID from "@worldcoin/id"; // If you installed the JS package as a module

worldID.init("world-id-container", {
  enable_telemetry: true,
  action_id: "wid_staging_aab43c65569959c2942f23cfffb71e4d",
});
export function worldCoinCheck(){
    document.addEventListener("DOMContentLoaded", async function () {
        try {
          const result = await worldID.enable();
          console.log("World ID verified successfully:", result);
        } catch (failure) {
          console.warn("World ID verification failed:", failure);
        //   const result = await worldID.enable();
          // Re-activate here so your end user can try again
        }
      });
}


