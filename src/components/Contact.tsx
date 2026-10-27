import { photos, type EventInquiry } from "../data/site";
import { InquiryForm } from "./InquiryForm";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";

/** 05 — Final reservation & contact */
export function Contact({
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
  return (
    <section id="contact" className="scroll-mt-20 bg-[linear-gradient(rgb(255,255,255)_0%,rgb(242,243,245)_100%)]">
      <div className="mx-auto grid max-w-[1380px] items-start gap-14 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow align="left">Your celebration begins here</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="type-display-sm mt-6 text-primary">
              Let's Create Your Dream Celebration in Marrakech
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="type-body-lg mt-6 text-muted">
              Whether you're dreaming of an intimate garden wedding, an elegant private
              dinner or a vibrant celebration beneath the palms, Lodgek Marrakech
              will help you bring every detail together.
            </p>
            <p className="type-body-lg mt-4 text-muted">
              From your first ideas to the final moments of your event, we create a
              personalized experience shaped around your vision, preferences and budget.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 border-l border-hairline pl-5 font-serif text-[1.25rem] leading-[1.55] italic text-primary">
              Your vision. Our creativity. An unforgettable celebration.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <img
              src={photos.contact.src}
              alt={photos.contact.alt}
              loading="lazy"
              className="mt-10 aspect-[3/2] w-full object-cover"
            />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-28">
          <InquiryForm
            variant="contact"
            inquiry={inquiry}
            onChange={onInquiryChange}
            reference={reference}
            onSubmitInquiry={onSubmitInquiry}
            onResetInquiry={onResetInquiry}
            isSubmitting={isSubmitting}
            submissionError={submissionError}
          />
        </Reveal>
      </div>
    </section>
  );
}
