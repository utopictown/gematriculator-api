import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  return (
    <div className={styles.container}>
      <Head>
        <title>Gematriculator API</title>
        <meta
          property="og:title"
          content="public API for finding the value of a word or a phrase in Gematria"
          key="title"
        />
        <meta name="og:site_name" content="Gematriculator API" />
        <meta name="og:url" content="https://gematriculator-api.vercel.app" />
        <meta
          name="og:description"
          content="public API for finding the value of a word or a phrase in Gematria"
        />
        <meta name="keywords" content="API, gematria" />
        <meta
          name="description"
          content="public API for finding the value of a word or a phrase in Gematria"
        />
        <meta
          name="subject"
          content="public API for finding the value of a word or a phrase in Gematria"
        />
        <meta name="copyright" content="utopictown" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Gematriculator API</h1>
        <h3>
          public API for finding the value of a word or a phrase in Gematria
        </h3>

        <p className={styles.description}>
          Go to
          <code className={styles.code}>
            <a href={`/api?text=${input}`} target="_blank">
              /api/?text=
            </a>
            <input
              type="text"
              className={styles.init_input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (input != "" && e.key == "Enter")
                  window.open("/api?text=" + e.target.value, "_blank");
              }}
            />
          </code>
        </p>
      </main>

      <footer className={styles.footer}>
        <a href="https://xeno.cx" target="_blank" rel="noopener noreferrer">
          Source: xeno.cx
        </a>
        <a
          href="https://twitter.com/utopictown"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by @utopictown
        </a>
      </footer>
    </div>
  );
}
