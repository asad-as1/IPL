import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import "./App.css";

function App() {

  return (
    <>
      <Header />
      <div className="h-full">
      <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
