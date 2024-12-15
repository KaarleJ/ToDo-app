import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const resolveDisplayedPages = (pages: number, number: number) => {
  if (pages <= 5) return Array.from({ length: pages }, (_, i) => i + 1);
  if (number <= 3) return [1, 2, 3, 4, 5];
  if (number >= pages - 2)
    return Array.from({ length: 5 }, (_, i) => pages - 4 + i);
  return Array.from({ length: 5 }, (_, i) => number - 2 + i);
};

export const apiUrl = import.meta.env.VITE_API_URL;
export const audience = import.meta.env.VITE_AUTH_AUDIENCE;
