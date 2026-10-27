import { brand } from "../data/site";
import { cn } from "../utils/cn";

/**
 * Monogram: a thin sage Moroccan arch framing a serif "L".
 * Uses currentColor for the letter; the arch is always sage.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden="true">
      <path d="M7 46V20a13 13 0 0 1 26 0v26" fill="none" stroke="#6E8458" strokeWidth="1.4" />
      <text
        x="20"
        y="38"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="20"
        fill="currentColor"
      >
        L
      </text>
    </svg>
  );
}

/** Full wordmark: monogram + "Lodgek" serif + "MARRAKECH" tracked sans. */
export function Wordmark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={cn("h-10 w-9 shrink-0", light ? "text-white" : "text-primary")} />
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-[1.2rem] tracking-[-0.2px] whitespace-nowrap sm:text-[1.3rem]",
            light ? "text-white" : "text-primary",
          )}
        >
          {brand.primary}
        </span>
        <span
          className={cn(
            "mt-1 block font-sans text-[0.6rem] font-bold tracking-[0.42em] uppercase",
            light ? "text-white/80" : "text-hairline-ink",
          )}
        >
          {brand.secondary}
        </span>
      </span>
    </span>
  );
}
