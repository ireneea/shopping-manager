import React from "react";
import Head from "next/head";

import styles from "./PageLayout.module.css";

type PageLayoutPros = {
  pageTitle: string;
  children: React.ReactNode;
};

export const PageLayout = ({ pageTitle, children }: PageLayoutPros) => {
  return (
    <>
      <Head>
        <title>Shopping Manager</title>
        <meta name="description" content="Shopping app" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{pageTitle}</h1>
        </header>

        <main>{children}</main>
      </div>
    </>
  );
};
