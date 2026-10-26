import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { currencyOptions, eventTypeOptions, formatEventDate, type EventInquiry } from "../data/site";
import { cn } from "../utils/cn";

interface InquiryErrors {
  name?: string;
  email?: string;
  eventType?: string;
  guestCount?: string;
  budget?: string;
}

const copy = {
  hero: {
    title: "Start Planning",
    subtitle: "Tell us about your vision — we'll help bring it to life.",
    messagePlaceholder: "Tell us about your dream celebration...",
    submit: "Send inquiry",
  },
  contact: {
    title: "Start Planning Your Event",
    subtitle: "Share your details and let us help you create something extraordinary.",
    messagePlaceholder: "Tell us about your celebration",
    submit: "Send inquiry",
  },
} as const;

export function InquiryForm({
  variant,
  inquiry,
  onChange,
  reference,
  onSubmitInquiry,
  onResetInquiry,
  isSubmitting,
  submissionError,
}: {
  variant: "hero" | "contact";
  inquiry: EventInquiry;
  onChange: (inquiry: EventInquiry) => void;
  reference: string | null;
  onSubmitInquiry: () => Promise<boolean>;
  onResetInquiry: () => void;
  isSubmitting: boolean;
  submissionError: string | null;
}) {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const isHero = variant === "hero";
  const text = copy[variant];
  const prefix = `${variant}-inquiry`;
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    setErrors({});
  }, [reference]);

  const update = (patch: Partial<EventInquiry>) => onChange({ ...inquiry, ...patch });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: InquiryErrors = {};
    if (inquiry.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inquiry.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!inquiry.eventType) next.eventType = "Please choose an event type.";
    if (!inquiry.guestCount || Number(inquiry.guestCount) < 1 || Number(inquiry.guestCount) > 2000) {
      next.guestCount = "Enter an estimated number of guests between 1 and 2,000.";
    }
    if (inquiry.budget && Number(inquiry.budget) < 0) next.budget = "Budget cannot be negative.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(`${prefix}-${first === "guestCount" ? "guests" : first === "eventType" ? "type" : first}`)?.focus();
      return;
    }
    await onSubmitInquiry();
  };

  const reset = () => {
    setErrors({});
    onResetInquiry();
  };

  const budgetLabel = inquiry.budget
    ? `${inquiry.currency} ${Number(inquiry.budget).toLocaleString("en-GB")}`
    : "To be discussed";

  const errorText = (id: string, message?: string) =>
    message ? (
      <p id={id} className="type-caption mt-1.5 text-[#9b2c2c]">
        {message}
      </p>
    ) : null;

  return (
    <div
      id={isHero ? "inquiry" : undefined}
      className="relative scroll-mt-28 bg-surface text-primary shadow-soft"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-hairline" />
      <AnimatePresence mode="wait">
        {reference ? (
          <motion.div
            key={`${prefix}-success`}
            role="status"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-9"
          >
            <span className="grid h-12 w-12 place-items-center border border-hairline text-hairline-ink">
              <Check className="h-5 w-5" />
            </span>
            <h3 className="mt-6 font-display text-[2rem] leading-tight tracking-[-0.6px]">
              Thank you, {inquiry.name.trim().split(" ")[0]}.
            </h3>
            <p className="type-body-md mt-2 text-muted">
              Here is a summary of the celebration details you shared.
            </p>
            <p className="type-caption mt-5 inline-block border border-hairline px-3 py-1.5 tracking-[0.14em] text-hairline-ink uppercase">
              Reference {reference}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[#dfe1e4] pt-5">
              {[
                ["Event", inquiry.eventType],
                ["Date", formatEventDate(inquiry.eventDate)],
                ["Guests", inquiry.guestCount],
                ["Estimated budget", budgetLabel],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="type-caption text-muted uppercase tracking-[0.12em]">{label}</dt>
                  <dd className="type-body-md mt-0.5 font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <button type="button" onClick={reset} className="btn btn-outline mt-7">
              Start another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key={`${prefix}-form`}
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8"
          >
            <h2 className="font-display text-[1.75rem] leading-tight tracking-[-0.5px] text-primary sm:text-[2rem]">
              {text.title}
            </h2>
            <p className="type-body-md mt-2 text-muted">{text.subtitle}</p>

            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor={`${prefix}-website`}>Leave this field empty</label>
              <input id={`${prefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${prefix}-name`} className="field-label">Full name *</label>
                <input
                  id={`${prefix}-name`}
                  className={cn("field", errors.name && "field-error")}
                  value={inquiry.name}
                  onChange={(e) => update({ name: e.target.value })}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
                />
                {errorText(`${prefix}-name-error`, errors.name)}
              </div>

              <div>
                <label htmlFor={`${prefix}-email`} className="field-label">Email address *</label>
                <input
                  id={`${prefix}-email`}
                  type="email"
                  className={cn("field", errors.email && "field-error")}
                  value={inquiry.email}
                  onChange={(e) => update({ email: e.target.value })}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${prefix}-email-error` : undefined}
                />
                {errorText(`${prefix}-email-error`, errors.email)}
              </div>

              <div>
                <label htmlFor={`${prefix}-phone`} className="field-label">Phone / WhatsApp</label>
                <input
                  id={`${prefix}-phone`}
                  type="tel"
                  className="field"
                  placeholder="+212 6 00 00 00 00"
                  value={inquiry.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  autoComplete="tel"
                />
              </div>

              <div>
                <label htmlFor={`${prefix}-type`} className="field-label">Event type</label>
                <select
                  id={`${prefix}-type`}
                  className={cn("field", errors.eventType && "field-error")}
                  value={inquiry.eventType}
                  onChange={(e) => update({ eventType: e.target.value })}
                  aria-invalid={Boolean(errors.eventType)}
                >
                  {eventTypeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errorText(`${prefix}-type-error`, errors.eventType)}
              </div>

              <div>
                <label htmlFor={`${prefix}-date`} className="field-label">Event date</label>
                <input
                  id={`${prefix}-date`}
                  type="date"
                  min={minDate}
                  className="field"
                  value={inquiry.eventDate}
                  onChange={(e) => update({ eventDate: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor={`${prefix}-guests`} className="field-label">Number of guests *</label>
                <input
                  id={`${prefix}-guests`}
                  type="number"
                  min="1"
                  max="2000"
                  inputMode="numeric"
                  placeholder="e.g. 120"
                  className={cn("field", errors.guestCount && "field-error")}
                  value={inquiry.guestCount}
                  onChange={(e) => update({ guestCount: e.target.value })}
                  aria-invalid={Boolean(errors.guestCount)}
                  aria-describedby={errors.guestCount ? `${prefix}-guests-error` : undefined}
                />
                {errorText(`${prefix}-guests-error`, errors.guestCount)}
              </div>

              <div className={cn(!isHero && "sm:col-span-2")}>
                <label htmlFor={`${prefix}-budget`} className="field-label">Estimated budget</label>
                <input
                  id={`${prefix}-budget`}
                  type="number"
                  min="0"
                  inputMode="decimal"
                  placeholder="e.g. 30000"
                  className={cn("field", errors.budget && "field-error")}
                  value={inquiry.budget}
                  onChange={(e) => update({ budget: e.target.value })}
                  aria-invalid={Boolean(errors.budget)}
                  aria-describedby={errors.budget ? `${prefix}-budget-error` : undefined}
                />
                {errorText(`${prefix}-budget-error`, errors.budget)}
              </div>

              {isHero && (
                <div>
                  <label htmlFor={`${prefix}-currency`} className="field-label">Preferred currency</label>
                  <select
                    id={`${prefix}-currency`}
                    className="field"
                    value={inquiry.currency}
                    onChange={(e) => update({ currency: e.target.value })}
                  >
                    {currencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="sm:col-span-2">
                <label htmlFor={`${prefix}-message`} className="sr-only">{text.messagePlaceholder}</label>
                <textarea
                  id={`${prefix}-message`}
                  className="field min-h-[6rem] resize-y"
                  placeholder={text.messagePlaceholder}
                  value={inquiry.message}
                  onChange={(e) => update({ message: e.target.value })}
                />
              </div>
            </div>

            {submissionError && (
              <p role="alert" className="type-body-md mt-5 border-l-2 border-[#9b2c2c] px-3 text-[#9b2c2c]">
                {submissionError}
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="btn btn-solid group mt-6 w-full disabled:cursor-wait disabled:opacity-60">
              {isSubmitting ? "Sending..." : text.submit}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
