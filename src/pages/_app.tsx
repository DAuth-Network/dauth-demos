import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { store } from '../store'
import { Provider as ReduxProvider } from 'react-redux'
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {linea, lineaTestnet} from "viem/chains";
import { publicProvider } from 'wagmi/providers/public';
const { chains, publicClient } = configureChains(
    [lineaTestnet],
    [
      publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
  appName: 'openid3',
  projectId: 'openid3',

  chains
});


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <ReduxProvider store={store}>
      <SnackbarProvider >
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </SnackbarProvider>
    </ReduxProvider>
  </Layout>
}
