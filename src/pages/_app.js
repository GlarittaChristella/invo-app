import "../src/styles/globals.css"; // ✅ correct relative path
import Navbar from '../components/Navbar';  
export default function App({ Component, pageProps }){
  return (
    <>
    <Navbar/>
    <Component {...pageProps} />
    </>
  );
}
