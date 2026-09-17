import type { ReactNode } from "react";
import Image from "next/image";
import { Scene } from "@/components/artwork/scene";
import { cx, Icon } from "@/components/ui";
import { getGoogleReviews, videoTestimonials, type GoogleReview, type VideoTestimonial } from "@/lib/reviews";

/**
 * The testimonials band's carousel: real Google reviews and video
 * testimonials, mixed into one looping track. Reviews are fetched live in
 * `getGoogleReviews` (see `lib/reviews.ts`) and cost nothing to add to —
 * video slots are filled in the same file as recordings come in.
 */
export async function ReviewsMarquee() {
  const reviews = await getGoogleReviews();
  const cards = interleave(reviews, videoTestimonials);
  if (cards.length === 0) return null;

  return (
    <CardMarquee>
      {cards}
    </CardMarquee>
  );
}

/** One video card after every three reviews, then whatever is left over. */
function interleave(reviews: GoogleReview[], videos: VideoTestimonial[]): ReactNode[] {
  const cards: ReactNode[] = [];
  let v = 0;

  reviews.forEach((review, i) => {
    cards.push(<ReviewCard key={`review-${review.id}`} review={review} />);
    if ((i + 1) % 3 === 0 && v < videos.length) {
      cards.push(<VideoTestimonialCard key={`video-${v}`} testimonial={videos[v]} index={v} />);
      v++;
    }
  });
  while (v < videos.length) {
    cards.push(<VideoTestimonialCard key={`video-${v}`} testimonial={videos[v]} index={v} />);
    v++;
  }

  return cards;
}

const CARD = "h-[260px] w-[320px] shrink-0 overflow-hidden rounded-2xl border border-white/15 sm:w-[360px]";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon.Star key={i} className={cx("size-3.5", i < Math.round(rating) ? "text-accent" : "text-white/25")} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure className={cx(CARD, "flex flex-col gap-4 bg-white/10 p-6 backdrop-blur-sm")}>
      <div className="flex items-center justify-between">
        <StarRow rating={review.rating} />
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/50">
          Google review
        </span>
      </div>

      <blockquote className="line-clamp-5 flex-1 text-sm leading-relaxed text-white/90">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-white/15 pt-4">
        {review.authorPhoto ? (
          <Image
            src={review.authorPhoto}
            alt=""
            width={32}
            height={32}
            unoptimized
            className="size-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white">
            {review.author.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{review.author}</p>
          {review.relativeTime && <p className="mt-0.5 text-xs text-white/60">{review.relativeTime}</p>}
        </div>
      </figcaption>
    </figure>
  );
}

function VideoTestimonialCard({ testimonial, index }: { testimonial: VideoTestimonial; index: number }) {
  return (
    <figure className={cx(CARD, "relative")}>
      <Scene
        kind="exterior"
        photoKey={`page/video-testimonial-${index + 1}`}
        label={testimonial.name ? `Video testimonial from ${testimonial.name}` : "Video testimonial"}
        className="size-full"
      />
      {/* Fully opaque: a translucent tint still let the Scene's own
          "Photograph to come" caption show through, right behind the play
          button — the two captions are centered on the same point. */}
      <div className="absolute inset-0 bg-ink" />
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <span className="flex size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Icon.Play className="size-5 text-white" />
        </span>
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-center">
        <p className="text-sm font-semibold text-white">{testimonial.name ?? "Video testimonial"}</p>
        <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-white/60">
          {testimonial.videoUrl ? "Watch" : "Coming soon"}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Infinite card carousel, moving left to right. The track is duplicated and
 * translated in reverse — same technique as `<Marquee>`, but for rich cards
 * instead of a text ticker, and only one copy is exposed to screen readers.
 */
function CardMarquee({ children }: { children: ReactNode }) {
  return (
    <div className="group/marquee relative flex overflow-hidden">
      <div className="animate-marquee-reverse flex min-w-full shrink-0 items-stretch motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
        <div className="flex shrink-0 items-stretch gap-6 pr-6">{children}</div>
        <div className="flex shrink-0 items-stretch gap-6 pr-6" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
