import { photos } from "../data/site";
import { Reveal } from "./Reveal";

/** 01 — Introduction band that continues the hero story */
export function Intro() {
  return (
    <section aria-label="Introduction" className="bg-[linear-gradient(rgb(255,255,255)_0%,rgb(242,243,245)_100%)]">
      <div className="mx-auto grid max-w-[1380px] items-center gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <span aria-hidden="true" className="block h-px w-16 bg-hairline" />
          </Reveal>
          <Reveal delay={0.06}>
            <p className="type-statement mt-8 text-primary">
              Imagine exchanging vows beneath towering palm trees, welcoming your guests
              with a beautiful garden reception, and celebrating unforgettable moments in
              one of Morocco's most enchanting destinations.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="type-body-lg mt-8 max-w-2xl text-muted">
              Our approach combines creative event design, carefully selected venues and
              thoughtful coordination to make every celebration feel effortless and
              personal.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <figure className="relative isolate sm:ml-4 sm:mb-4">
            <span aria-hidden="true" className="absolute -bottom-4 -left-4 -z-10 hidden h-full w-full border border-hairline sm:block" />
            <img
              src={photos.intro.src}
              alt={photos.intro.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
