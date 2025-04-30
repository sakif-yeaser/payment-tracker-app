import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCurrentMonthYear = () => {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" }); // "January", etc.
  const year = now.getFullYear().toString();
  return { month, year };
};
