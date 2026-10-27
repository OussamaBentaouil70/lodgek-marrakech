import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { photos, type EventInquiry } from "../data/site";
import { InquiryForm } from "./InquiryForm";
import { Eyebrow } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

/** 01 — Hero (headline, tagline, CTA and the "Start Planning" form) */
export function Hero({
  inquiry,
  onInquiryChange,
  reference,
  onSubmitInquiry,
  onResetInquiry,
  isSubmitting,
  submissionError,
}: {
  inquiry: EventInquiry;
  onInquiryChange: (inquiry: EventInquiry) => void;
  reference: string | null;
  onSubmitInquiry: () => Promise<boolean>;
  onResetInquiry: () => void;
  isSubmitting: boolean;
  submissionError: string | null;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "8%"]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden bg-primary text-white">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 top-0 h-[110%]">
        <img src={photos.hero.src} alt={photos.hero.alt} className="h-full w-full object-cover" fetchPriority="high" />
      </motion.div>
      {/* Measured section gradient (to top, 0.6 → 0) plus a left wash so the copy reads clearly */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),rgba(0,0,0,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,21,22,0.82)_0%,rgba(19,21,22,0.55)_48%,rgba(19,21,22,0.2)_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1380px] items-center gap-12 px-6 pt-36 pb-20 sm:px-10 lg:min-h-svh lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-40 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-2xl"
        >
          <Eyebrow tone="light" align="left">
            Luxury weddings &amp; events in Marrakech
          </Eyebrow>

          <h1 className="type-display-xl mt-7 text-white">
            Extraordinary Moments, <span className="italic">Beautifully Planned</span>
          </h1>

          <p className="mt-7 font-serif text-[1.125rem] leading-[1.6] italic text-white sm:text-[1.25rem]">
            Your celebration. Your story. The magic of Marrakech.
          </p>

          <p className="type-body-lg mt-6 max-w-xl text-white/90">
            From romantic destination weddings to elegant private celebrations, Lodgek
            Marrakech creates bespoke events that reflect your style and bring your
            vision to life.
          </p>

          <a href="#inquiry" className="btn btn-light group mt-9">
            Plan your celebration
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="w-full lg:ml-auto lg:max-w-[600px]"
        >
          <InquiryForm
            variant="hero"
            inquiry={inquiry}
            onChange={onInquiryChange}
            reference={reference}
            onSubmitInquiry={onSubmitInquiry}
            onResetInquiry={onResetInquiry}
            isSubmitting={isSubmitting}
            submissionError={submissionError}
          />
        </motion.div>
      </div>
    </section>
  );
}
