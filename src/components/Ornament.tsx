import { cn } from "../utils/cn";

/** Section label flanked by sage hairlines. */
export function Eyebrow({
  children,
  tone = "dark",
  align = "center",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "type-eyebrow flex items-center gap-4",
        tone === "dark" ? "text-hairline-ink" : "text-white/85",
        align === "center" ? "justify-center text-center" : "justify-start",
        className,
      )}
    >
      {align === "center" && <span aria-hidden="true" className="h-px w-10 shrink-0 bg-hairline" />}
      <span>{children}</span>
      <span aria-hidden="true" className="h-px w-10 shrink-0 bg-hairline" />
    </div>
  );
}
