import { FaGithub as Github } from "react-icons/fa";
import { FaLinkedin as Linkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground p-12 border-t-2 border-accent w-full">
      <div className="h-full flex flex-col items-center justify-center">
        <h2 className="text-3xl">HopsApp2.0</h2>
        <h3 className="text-xl">by KaarleJ</h3>
        <img
          src="https://avatars.githubusercontent.com/u/117437182?v=4"
          width={100}
          height={100}
          alt="HopsApp Logo"
          className="rounded-full m-6"
        />
        <div className="flex flex-row items-center justify-around">
          <a href="https://github.com/KaarleJ" className="mx-4 hover:text-primary">
            <Github  size={36}/>
          </a>
          <a href="https://www.linkedin.com/in/kaarlej/" className="mx-4 hover:text-primary">
            <Linkedin size={36}/>
          </a>
        </div>
      </div>
    </footer>
  );
}