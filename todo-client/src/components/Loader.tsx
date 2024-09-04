import { LoaderCircle as LoaderIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderIcon size={64} className="animate-spin "/>
    </div>
  )
}