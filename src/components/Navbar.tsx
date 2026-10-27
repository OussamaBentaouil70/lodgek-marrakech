import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { defaultWhatsappMessage, navLinks, whatsappIcon, whatsappLink } from "../data/site";
import { Wordmark } from "./Logo";
import { cn } from "../utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
          solid ? "bg-surface text-primary shadow-soft" : "bg-transparent text-white",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1380px] items-center justify-between gap-6 px-6 transition-[height] duration-300 sm:px-10",
            solid ? "h-[72px]" : "h-[87px]",
          )}
        >
          <a href="#top" aria-label="Lodgek Marrakech — back to top" className="shrink-0">
            <Wordmark tone={solid ? "dark" : "light"} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative py-2 text-[0.9375rem] tracking-[0.24px] transition-opacity hover:opacity-60",
                    solid ? "text-primary" : "text-white",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-hairline transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              aria-label="Message Lodgek Marrakech on WhatsApp"
              className="btn btn-whatsapp hidden min-h-[42px] px-5 py-2.5 text-[0.875rem] md:inline-flex"
            >
              <img src={whatsappIcon} alt="" className="h-4 w-4 object-contain" />
              WhatsApp
            </a>
            <a
              href="#inquiry"
              className={cn(
                "btn hidden min-h-[42px] px-5 py-2.5 text-[0.875rem] sm:inline-flex",
                solid ? "btn-solid" : "btn-light",
              )}
            >
              Plan your celebration
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={cn(
                "grid h-11 w-11 place-items-center border transition-opacity hover:opacity-60 lg:hidden",
                solid ? "border-hairline text-primary" : "border-white/50 text-white",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-primary text-white"
          >
            <div className="flex h-[87px] items-center justify-between border-b border-white/10 px-6">
              <Wordmark tone="light" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="grid h-11 w-11 place-items-center border border-white/40 transition-opacity hover:opacity-60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  className="font-display text-[2rem] tracking-[-0.5px] transition-opacity hover:opacity-60"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-6 flex w-full max-w-xs flex-col gap-3">
                <a href="#inquiry" onClick={() => setOpen(false)} className="btn btn-light w-full">
                  Plan your celebration
                </a>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light w-full"
                >
                  <img src={whatsappIcon} alt="" className="h-4 w-4 object-contain" />
                  WhatsApp us
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
