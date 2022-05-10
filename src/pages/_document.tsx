import Document, {
    DocumentContext,
    DocumentInitialProps,
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";

class CustomDocument extends Document {
    render(): any {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    <link rel="shortcut icon" href="/favicon/favicon.ico" />
                    <link rel="apple-touch-icon" href="/favicon/icon.png" />
                    <meta name="robots" content="all" />
                    <meta
                        name="description"
                        content={process.env.APP_DESCRIPTION || ""}
                    />
                    <meta
                        name="keywords"
                        content={process.env.APP_KEYWORD || ""}
                    />
                    <meta property="og:image" content="/favicon/logo.png" />
                    <meta name="author" content="CAMDEV" />
                    <meta name="theme-color" content="#17C2C8" />
                    <style>
                        {`
                            @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&display=swap');
                            * {
                                font-family: 'Battambang', cursive;
                            }
                        `}
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
