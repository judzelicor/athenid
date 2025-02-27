import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/vin8gdy.css" />
                <link rel="stylesheet" href="stylesheets/global.css" />
                <link rel="stylesheet" href="stylesheets/main.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}