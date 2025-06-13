import "@/styles/globals.css";
import Navbar from "@/components/Navbar"; // Adjust path if needed

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
