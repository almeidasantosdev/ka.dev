import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "../../i18n/LanguageContext";
import { SIGNAL_SLIDES } from "../data/signalSlides";
import { useDesktopJourney, usePinnedJourney } from "../hooks/usePinnedJourney";
import type { SceneId } from "../lib/scenes";

const PROFILE = "almeidasantosdev";

function RepoSlide({
  slide,
  index,
  language,
  openLabel,
}: {
  slide: (typeof SIGNAL_SLIDES)[number];
  index: number;
  language: "pt" | "en";
  openLabel: string;
}) {
  return (
    <article
      className="ka-work-panel ka-work-slide-panel h-full"
      style={{
        background: `radial-gradient(ellipse at 85% 0%, ${slide.accent}, transparent 48%), linear-gradient(160deg, rgba(10,12,20,0.55), rgba(5,5,5,0.28))`,
      }}
    >
      <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center h-full">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="ka-eyebrow text-[var(--ka-cobalt)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-white/20" />
            <span className="ka-eyebrow text-white/45">{slide.eyebrow[language]}</span>
          </div>

          <h3 className="ka-display text-[clamp(2rem,4.4vw,3.4rem)] text-white mb-4">
            {slide.title[language]}
          </h3>
          <p className="text-white/45 text-sm mb-6 font-mono">{slide.repo}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {slide.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-xs tracking-wide text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={slide.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-white"
            data-cursor="hover"
          >
            <span className="ka-display text-xl border-b border-white/15 group-hover:border-[var(--ka-cobalt)] transition-colors pb-0.5">
              {openLabel}
            </span>
            <ArrowUpRight size={16} className="text-[var(--ka-cobalt)]" />
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 md:p-8">
          <p className="ka-eyebrow text-white/35 mb-4">README</p>
          <p className="text-white/75 leading-relaxed text-base md:text-lg">{slide.summary[language]}</p>
        </div>
      </div>
    </article>
  );
}

export function GitHubStats() {
  const { t, language } = useTranslation();
  const desktopJourney = useDesktopJourney();
  const slides = SIGNAL_SLIDES;
  const openLabel = language === "pt" ? "Abrir repositório" : "Open repository";

  const sceneForIndex = useCallback(
    (index: number) => slides[index]?.sceneId as SceneId,
    [slides],
  );

  const { containerRef, x, activeIndex, slideWidth } = usePinnedJourney({
    enabled: desktopJourney,
    count: slides.length,
    sceneForIndex,
  });

  return (
    <section id="github" className="relative">
      <div className="ka-container pt-[clamp(4.5rem,10vw,7.5rem)]">
        <motion.div
          data-scene="github"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14 max-w-3xl"
        >
          <p className="ka-eyebrow mb-4 text-[var(--ka-cobalt)]">{t.stats.eyebrow}</p>
          <h2 className="ka-display text-[clamp(2.4rem,6vw,4.4rem)] text-white mb-5">
            {t.stats.title}
          </h2>
          <p className="text-white/55 text-base md:text-lg leading-relaxed mb-6">
            {t.stats.subtitle}
          </p>
          <a
            href={`https://github.com/${PROFILE}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-white"
            data-cursor="hover"
          >
            <span className="ka-display text-xl border-b border-white/15 group-hover:border-[var(--ka-cobalt)] transition-colors pb-0.5">
              @{PROFILE}
            </span>
            <ArrowUpRight size={16} className="text-[var(--ka-cobalt)]" />
          </a>
        </motion.div>
      </div>

      {desktopJourney ? (
        <div
          ref={containerRef}
          className="ka-work-journey relative"
          data-scene-rail=""
          style={{ height: `${slides.length * 100}vh` }}
        >
          <div className="ka-work-pin sticky top-0 h-[100svh] overflow-hidden">
            <motion.div
              className="ka-work-track flex h-full will-change-transform"
              style={{ x, width: slideWidth * slides.length }}
            >
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="ka-work-slide relative h-full shrink-0"
                  style={{ width: slideWidth, minWidth: slideWidth }}
                >
                  <div className="ka-container h-full flex items-center py-24">
                    <div className="w-full max-h-[calc(100svh-8rem)] overflow-hidden">
                      <RepoSlide
                        slide={slide}
                        index={index}
                        language={language}
                        openLabel={openLabel}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-10">
              <div className="ka-container flex items-center justify-between gap-4">
                <p className="ka-eyebrow text-white/45">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")} · {slides[activeIndex]?.repo}
                </p>
                <div className="flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <span
                      key={slide.id}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === activeIndex
                          ? "w-10 bg-[var(--ka-cobalt)]"
                          : "w-3 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ka-container space-y-10 md:space-y-14 pb-[clamp(4.5rem,10vw,7.5rem)]">
          {slides.map((slide, index) => (
            <div key={slide.id} data-scene={slide.sceneId}>
              <RepoSlide
                slide={slide}
                index={index}
                language={language}
                openLabel={openLabel}
              />
            </div>
          ))}
        </div>
      )}

      {desktopJourney && <div className="h-[clamp(3rem,8vw,5rem)]" />}
    </section>
  );
}
