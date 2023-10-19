import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterItems<T>(items: T[], filter: string) {
  return items.filter((item) => {
    const itemString = JSON.stringify(item).toLowerCase();
    return itemString.includes(filter.toLowerCase());
  });
}