import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const apiUrl = import.meta.env.VITE_API_URL;

export const audience = import.meta.env.VITE_AUTH_AUDIENCE;