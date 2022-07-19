import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContext } from "../utils/ToastContext";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { pathname, asPath, isReady } = router;
    const roomPathMatch = pathname.match(/[/room/[id]]/g);

    if (roomPathMatch && isReady) {
      Router.push(asPath);

      return;
    }

    if (isReady) {
      Router.push("/");
    }

    return;
  }, [router]);

  return (
    <ToastContext>
      <Head>
        <title>Planning Poker</title>
        <meta name="description" content="Estimation app from Carbonaut" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ToastContext>
  );
}

export default MyApp;
