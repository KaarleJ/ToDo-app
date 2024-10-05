import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveDisplayedPages(pages: number, number: number) {
  if (pages <= 5) {
    return Array.from({ length: pages }, (_, i) => i + 1);
  }
  if (number <= 3) {
    return [1, 2, 3, 4, 5];
  }
  if (number >= pages - 2) {
    return [pages - 4, pages - 3, pages - 2, pages - 1, pages];
  }
  return [number - 2, number - 1, number, number + 1, number + 2];
}

export const apiUrl = import.meta.env.VITE_API_URL;

export const audience = import.meta.env.VITE_AUTH_AUDIENCE;
