import { photos, promises } from "../data/site";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

/** 03 — Our Event Promise, set over a full-width photograph */
export function EventPromise() {
  return (
    <section id="promise" className="relative isolate scroll-mt-20 overflow-hidden bg-primary text-white">
      <img
        src={photos.promise.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[rgba(19,21,22,0.8)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),rgba(0,0,0,0))]" />

      <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="light">The Lodgek Marrakech experience</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="type-display-sm mt-6 text-white">Our Event Promise</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="type-body-lg mx-auto mt-5 max-w-2xl text-white/85">
              Thoughtful planning, exceptional settings and beautiful moments from beginning
              to end.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-3">
          {promises.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article
                className={cn(
                  "h-full border-t border-hairline py-8 md:border-t-0 md:py-2",
                  index === 0 ? "md:pr-10" : "md:border-l md:px-10",
                  index === promises.length - 1 && "md:pr-0",
                )}
              >
                <p className="font-display text-[3rem] leading-none text-hairline italic">0{index + 1}</p>
                <h3 className="type-heading-lg mt-6 text-white">{item.title}</h3>
                <p className="type-body-md mt-4 text-white/80">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
