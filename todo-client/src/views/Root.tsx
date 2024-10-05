import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Landing from "./Landing";
import { Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const { pathname } = useLocation();

  return (
    <div className="font-sans antialiased min-h-screen mt-20">
      <Navbar />
      <div className="md:px-28 py-5 md:py-24 flex flex-col justify-start items-start w-full">
        {pathname === "/" ? <Landing /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
}
