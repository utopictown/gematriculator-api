import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  return (
    <div className={styles.container}>
      <Head>
        <title>Gematriculator API</title>
        <description>
          public API for finding the value of a word or a phrase in Gematria
        </description>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Gematria API</h1>

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
