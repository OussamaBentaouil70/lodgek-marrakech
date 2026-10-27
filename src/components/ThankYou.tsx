import { ArrowLeft } from "lucide-react";
import { defaultWhatsappMessage, photos, whatsappIcon, whatsappLink } from "../data/site";

export function ThankYou() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-87px)] items-center overflow-hidden bg-primary text-white">
      <img
        src={photos.hero.src}
        alt="A palm garden ceremony set for a celebration in Marrakech"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(19,21,22,0.88)_0%,rgba(19,21,22,0.62)_55%,rgba(19,21,22,0.3)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.68),rgba(0,0,0,0.08))]" />

      <div className="mx-auto w-full max-w-[1380px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="max-w-2xl">
          <span aria-hidden="true" className="block h-px w-16 bg-hairline" />
          <p className="type-eyebrow mt-7 text-white/80">Your celebration begins here</p>
          <h1 className="type-display-xl mt-5 text-white">Thank you for reaching out.</h1>
          <p className="type-body-lg mt-7 max-w-xl text-white/90">
            Your inquiry has been received. We will be in touch soon to begin shaping your
            celebration in Marrakech.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/" className="btn btn-light">
              <ArrowLeft className="h-4 w-4" />
              Back to homepage
            </a>
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <img src={whatsappIcon} alt="" className="h-4 w-4 object-contain" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
