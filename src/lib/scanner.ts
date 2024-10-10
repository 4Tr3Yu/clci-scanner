import type { ScanResult } from "./types";
export function decodeUrl(url: string): ScanResult {
  return decodeURIComponent(url);
}