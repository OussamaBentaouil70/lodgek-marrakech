import { useCallback, useState } from "react";
import { signatureExperiences } from "../data/site";
import { Eyebrow } from "./Ornament";
import { PhotoLightbox, ZoomableImage, type ZoomPhoto } from "./PhotoLightbox";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

/** 04 — Signature event experiences. Two feature images, then three. */
export function SignatureExperiences() {
  const [zoomed, setZoomed] = useState<ZoomPhoto | null>(null);
  const close = useCallback(() => setZoomed(null), []);

  return (
    <section id="experiences" className="scroll-mt-20 bg-canvas">
      <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow align="left">Inspired by Marrakech</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="type-display-sm mt-6 text-primary">Unforgettable Ways to Celebrate</h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <p className="type-body-lg text-muted">
              From romantic ceremonies to lively garden parties, explore beautiful
              experiences that turn special occasions into lasting memories.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          {signatureExperiences.map((item, index) => {
            const featured = index < 2;
            return (
              <Reveal
                key={item.title}
                delay={(featured ? index : index - 2) * 0.08}
                className={cn(featured ? "lg:col-span-3" : "lg:col-span-2", index === 4 && "sm:col-span-2 lg:col-span-2")}
              >
                <article className="group">
                  <ZoomableImage
                    photo={{ ...item.photo, title: item.title }}
                    onOpen={setZoomed}
                    className={cn(
                      featured ? "aspect-[4/3]" : "aspect-square",
                      index === 4 && "sm:aspect-[2/1] lg:aspect-square",
                    )}
                  />
                  <div className="mt-5 border-t border-hairline pt-4">
                    <h3 className={cn("text-primary", featured ? "type-heading-lg" : "type-heading-md")}>{item.title}</h3>
                    <p className="type-body-md mt-2.5 max-w-xl text-muted">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
      <PhotoLightbox photo={zoomed} onClose={close} />
    </section>
  );
}
