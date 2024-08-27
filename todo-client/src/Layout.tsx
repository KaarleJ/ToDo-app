import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans antialiased min-h-screen mt-20">
      <Navbar />
      <div className="md:px-28 py-5 md:py-24 flex flex-col justify-start items-start w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
