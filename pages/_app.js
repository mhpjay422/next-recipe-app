import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="header">
        <div>
          <Link href="/">
            <a>Mamas Home Kitchen</a>
          </Link>
        </div>
      </nav>
      <main className="main">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
