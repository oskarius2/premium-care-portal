/** Minimal class merge — tillräckligt när klasser inte krockar (ingen tailwind-merge). */
export function cn(...inputs: Array<string | undefined | null | false>): string {
  return inputs.filter(Boolean).join(" ");
}
