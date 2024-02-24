import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return(

    <>
    <Navbar></Navbar>
    <main className="relative overflow-hidden">
      <Hero></Hero>
    </main>
    <Footer></Footer>
    </>

    
  );
}

export default App;
