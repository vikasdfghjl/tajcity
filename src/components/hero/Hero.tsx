import { ArrowRight } from "@phosphor-icons/react/ssr";
import { CommonsImage } from "@/components/ui/CommonsImage";
import { LiveStatus } from "@/components/hero/LiveStatus";
import { HERO_PHOTO } from "@/data/places";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0b0e15] text-white"
    >
      <div className="absolute inset-0 -z-10 animate-hero-settle">
        <CommonsImage
          photo={HERO_PHOTO}
          alt="The Taj Mahal at sunrise, seen across its gardens"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(8_10_18/0.55)_0%,rgb(8_10_18/0.05)_30%,rgb(8_10_18/0.25)_55%,rgb(8_10_18/0.88)_100%)]" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between gap-10 px-4 pt-20 pb-28 sm:px-6 lg:grid lg:grid-cols-12 lg:items-end lg:pt-24 lg:pb-14">
        <div
          className="animate-rise lg:order-last lg:col-span-4 lg:col-start-9"
          style={{ animationDelay: "500ms" }}
        >
          <LiveStatus />
        </div>

        <div className="lg:col-span-7 lg:row-start-1">
          <h1
            id="hero-title"
            className="text-[clamp(3.25rem,14vw,7rem)] leading-[0.92] font-semibold tracking-[-0.05em]"
          >
            <span className="block animate-rise">Agra,</span>
            <span className="block animate-rise text-white/75" style={{ animationDelay: "120ms" }}>
              timed right.
            </span>
          </h1>
          <p
            className="mt-6 max-w-[36ch] animate-rise text-lg leading-snug text-white/85 sm:text-xl"
            style={{ animationDelay: "240ms" }}
          >
            Catch the Taj at its best hour, eat where Agra eats, and keep the whole day in your
            pocket.
          </p>
          <div
            className="mt-8 flex animate-rise flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#plans"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-[#12141a] transition-transform active:scale-[0.97]"
            >
              Plan my day
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#light"
              className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-white/5 px-6 text-[15px] font-semibold backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Check the light
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
