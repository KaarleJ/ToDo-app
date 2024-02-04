import { RiLoader5Fill } from "react-icons/ri";

const Loader = ({ size, className }: { size: string; className?: string }) => {
  return (
    <div className="text-3xl font-bold text-purple-700">
      <RiLoader5Fill size={size} className={`animate-spin ${className}`} />
    </div>
  );
};

export default Loader;
