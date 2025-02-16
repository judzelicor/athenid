// core styles are required for all packages
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <MantineProvider>
                <Component {...pageProps} />
            </MantineProvider>
        </>
    )
  }