import Navbar from "./components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono antialiased min-h-screen mt-28">
      <Navbar />
      {children}
    </div>
  );
}
