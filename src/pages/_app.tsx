import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { store } from '../store'
import { Provider as ReduxProvider } from 'react-redux'
export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <ReduxProvider store={store}>
      <SnackbarProvider >
        <Component {...pageProps} />
      </SnackbarProvider>
    </ReduxProvider>
  </Layout>
}
