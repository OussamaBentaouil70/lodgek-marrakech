import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Celebrations } from "./components/Celebrations";
import { Contact } from "./components/Contact";
import { EventPromise } from "./components/EventPromise";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Navbar } from "./components/Navbar";
import { SignatureExperiences } from "./components/SignatureExperiences";
import { defaultEventInquiry, defaultWhatsappMessage, whatsappIcon, whatsappLink, type EventInquiry } from "./data/site";

export default function App() {
  // Shared by the hero form and the final form, so both stay in sync.
  const [inquiry, setInquiry] = useState<EventInquiry>(defaultEventInquiry);
  const [inquiryReference, setInquiryReference] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitInquiry = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch("/api/send-inquiry.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inquiry, website: "" }),
      });
      const data = await response.json().catch(() => null) as { ok?: boolean; message?: string } | null;

      if (!response.ok || !data?.ok) {
        setSubmissionError(data?.message ?? "We could not send your inquiry. Please try again.");
        return false;
      }

      setInquiryReference(`WPM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      return true;
    } catch {
      setSubmissionError("Connection problem. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetInquiry = () => {
    setInquiryReference(null);
    setSubmissionError(null);
    setInquiry(defaultEventInquiry());
  };

  const formProps = {
    inquiry,
    onInquiryChange: setInquiry,
    reference: inquiryReference,
    onSubmitInquiry: submitInquiry,
    onResetInquiry: resetInquiry,
    isSubmitting,
    submissionError,
  };

  return (
    <div className="min-h-screen bg-canvas font-sans text-primary antialiased">
      <Navbar />
      <main>
        <Hero {...formProps} />
        <Intro />
        <Celebrations />
        <EventPromise />
        <SignatureExperiences />
        <Contact {...formProps} />
      </main>
      <Footer />

      {/* Sticky WhatsApp — measured icon-button style: translucent near-black, sharp corners */}
      <a
        href={whatsappLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noreferrer"
        aria-label="Start a WhatsApp conversation with Weddings Planner Morocco"
        className="fixed right-4 bottom-[4.5rem] z-40 inline-flex h-12 items-center gap-2 border border-white/20 bg-[rgba(19,21,22,0.8)] px-4 font-impact text-[0.875rem] tracking-[1px] text-white uppercase backdrop-blur-sm transition-opacity hover:opacity-80 sm:right-6 sm:bottom-20"
      >
        <img src={whatsappIcon} alt="" className="h-4 w-4 object-contain" />
        WhatsApp
      </a>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed right-4 bottom-4 z-40 grid h-12 w-12 place-items-center border border-white/20 bg-[rgba(19,21,22,0.8)] text-white backdrop-blur-sm transition-opacity hover:opacity-80 sm:right-6 sm:bottom-5"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
