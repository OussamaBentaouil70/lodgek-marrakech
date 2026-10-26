import { brand, defaultWhatsappMessage, navLinks, whatsappIcon, whatsappLink } from "../data/site";
import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-[1380px] px-6 pt-[70px] sm:px-[30px] lg:px-10">
        <div className="grid gap-12 pb-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <a href="#top" aria-label="Back to top" className="inline-block">
              <Wordmark tone="light" />
            </a>
            <p className="type-body-md mt-6 max-w-sm text-white/75">
              Bespoke destination weddings and private celebrations in Marrakech.
            </p>
            <p className="mt-5 font-serif text-[1.05rem] italic text-white/90">
              Your vision. Our creativity. An unforgettable celebration.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="type-eyebrow text-white/60">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[1.0625rem] text-white transition-opacity hover:opacity-60">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="type-eyebrow text-white/60">Enquiries</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="#inquiry" className="text-[1.0625rem] text-white transition-opacity hover:opacity-60">
                  Plan your celebration
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[1.0625rem] text-white transition-opacity hover:opacity-60"
                >
                  <img src={whatsappIcon} alt="" className="h-4 w-4 object-contain" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="type-caption flex flex-col gap-3 border-t border-hairline py-6 text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name} · Luxury weddings &amp; events in {brand.location}
          </p>
          <a href="#top" className="tracking-[0.14em] uppercase transition-opacity hover:opacity-60">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
