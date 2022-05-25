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

      <div className="grid-container">
        <div className="grid-x">
          <div className="cell">
            <header className={styles.header}>
              <h1>{pageTitle}</h1>
            </header>
          </div>
        </div>

        <div className="grid-x">
          <div className="cell">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};
