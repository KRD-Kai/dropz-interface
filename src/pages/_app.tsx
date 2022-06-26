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
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/layout/Layout";

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [
        jsonRpcProvider({
            rpc: (chain) => ({
                http: String(process.env.RPC_URL),
            }),
            weight: 1,
        }),
        alchemyProvider({ priority: 1, weight: 2 }),
        publicProvider(),
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
