import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "@redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import SettingsProvider from "src/contexts/SettingsContext";
import ThemeConfig from "src/theme";
import Head from "next/head";
import LoadingScreen from "@components/LoadingScreen";
import Layout from "@layouts/main";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <SettingsProvider>
                    <ThemeConfig>
                        <Layout>
                            <Head>
                                <title>{process.env.APP_NAME || "N N M"}</title>
                                <meta
                                    name="viewport"
                                    content="initial-scale=1.0, width=device-width"
                                />
                            </Head>
                            <Component {...pageProps} />
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={true}
                                newestOnTop={false}
                                closeOnClick={true}
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable={true}
                                pauseOnHover={false}
                            />
                        </Layout>
                    </ThemeConfig>
                </SettingsProvider>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
