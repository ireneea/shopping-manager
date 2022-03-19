import React from "react";
import Head from "next/head";
import Link from "next/link";

import styles from './PageLayout.module.css'


type PageLayoutPros = {
    pageTitle: string;
    isHomePage?: boolean;
    children: React.ReactNode;
}

export default function PageLayout({pageTitle, children, isHomePage = false}: PageLayoutPros) {
    return (
        <>
            <Head>
                <title>Shopping Manager</title>
                <meta name="description" content="Shopping app"/>
            </Head>

            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>
                        {pageTitle}
                    </h1>
                </header>

                <main>
                    {children}
                </main>

                {
                    !isHomePage && (
                        <Link href="/">
                            <a>Back to home page</a>
                        </Link>
                    )
                }
            </div>
        </>
    )
};