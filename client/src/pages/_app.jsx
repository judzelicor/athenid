'use client';
import '../stylessheets/custom.css'


export default function MyApp({ Component, pageProps }) {
    const theme = {
        backgroundColor: '#2e2e2e',
        color: '#ccc'
    }

    return (
        <>
            <Component {...pageProps} />
        </>
    )
  }