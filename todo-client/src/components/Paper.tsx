interface PaperProps {
  children?: React.ReactNode;
}

const Paper = ({ children }: PaperProps) => {
  return <div className="bg-white w-full flex-grow max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl shadow-xl shadow-indigo-500 rounded-sm p-5 mb-10 text-center">{children}</div>;
};

export default Paper;
