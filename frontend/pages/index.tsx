import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Mint from "../components/mint";
import FetchAccount from "../components/fetchAccount";
import CreateAccount from "../components/createAccount";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>THE QUEST</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <Mint />
        <CreateAccount />
        <FetchAccount />
      </main>

      <footer className={styles.footer}>
        <a href="" rel="noopener noreferrer" target="_blank">
          Built by Polygon Devs
        </a>
      </footer>
    </div>
  );
};

export default Home;
