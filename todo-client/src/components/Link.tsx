import { cn } from "@/lib/utils";
import React from "react";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  className?: string;
}

export default function Link({ children, className, ...props }: LinkProps) {
  return (
    <a {...props} className={cn("text-foreground hover:underline", className)}>
      {children}
    </a>
  );
}
