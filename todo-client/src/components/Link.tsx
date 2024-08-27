import { cn } from "@/lib/utils";
import { Link as RouterLink, LinkProps } from "react-router-dom";

export default function Link({ children, className, ...props }: LinkProps) {
  return (
    <RouterLink {...props} className={cn("text-foreground hover:underline", className)}>
      {children}
    </RouterLink>
  );
}
