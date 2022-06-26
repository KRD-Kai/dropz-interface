import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
    RainbowKitProvider,
    connectorsForWallets,
    wallet,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";

const { chains, provider, webSocketProvider } = configureChains(
    [
        chain.mainnet,
        // chain.polygon,
        // chain.optimism,
        // chain.arbitrum,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
            : []),
    ],
    [
        jsonRpcProvider({
            rpc: () => ({
                http: String(process.env.POKT_URL),
            }),
        }),
    ]
);

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            wallet.metaMask({ chains }),
            wallet.walletConnect({ chains }),
            wallet.coinbase({ appName: "DecentralizeMe", chains }),
        ],
    },
]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <ChakraProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ChakraProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;
