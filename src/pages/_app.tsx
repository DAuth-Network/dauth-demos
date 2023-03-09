import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <SnackbarProvider />

    <Component {...pageProps} />
  </Layout>
}
