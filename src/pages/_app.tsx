import "../styles/global.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { AuthProvider } from "../contexts/AuthContext"
export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <ToastContainer/>
        <Component {...pageProps} />
      </AuthProvider>

  )
}
