import { useCallback, useState } from "react";
import { Images } from "lucide-react";
import { celebrations, type Celebration } from "../data/site";
import { CelebrationGallery } from "./CelebrationGallery";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";

/** 02 — Event categories, each opening its own gallery */
export function Celebrations() {
  const [selected, setSelected] = useState<Celebration | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="celebrations" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>What we create</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="type-display-sm mt-6 text-primary">Every Occasion, Beautifully Celebrated</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="type-body-lg mx-auto mt-5 max-w-2xl text-muted">
              From heartfelt ceremonies to sophisticated gatherings, discover memorable ways
              to celebrate in Marrakech.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3 lg:gap-x-10">
          {celebrations.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="group">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  aria-label={`Open the ${item.title} gallery (${item.gallery.length} photos)`}
                  aria-haspopup="dialog"
                  className="relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-canvas focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <img
                    src={item.photo.src}
                    alt={item.photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),rgba(0,0,0,0)_55%)]" />
                  <span className="type-caption absolute bottom-0 left-0 flex items-center gap-2 px-5 py-4 font-medium tracking-[0.14em] text-white uppercase">
                    <Images className="h-4 w-4" />
                    View gallery · {item.gallery.length} photos
                  </span>
                </button>

                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="type-caption font-bold tracking-[0.16em] text-hairline-ink">0{index + 1}</p>
                  <h3 className="type-heading-lg mt-2 text-primary">
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      aria-haspopup="dialog"
                      className="text-left transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      {item.title}
                    </button>
                  </h3>
                  <p className="type-body-md mt-3 text-muted">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <CelebrationGallery celebration={selected} onClose={close} />
    </section>
  );
}
