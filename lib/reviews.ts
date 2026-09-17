/**
 * The testimonials band's two feeds: live Google reviews, and video
 * testimonials recorded from buyers.
 *
 * Google reviews are never hand-written here — a fabricated quote from a
 * named customer is the one thing worse than no testimonial at all. Instead
 * `getGoogleReviews` fetches them live from the dealership's own Google
 * Business Profile by Place ID, through the Places API. Set
 * `GOOGLE_PLACES_API_KEY` (a Places API (New) key, billing enabled on the
 * Google Cloud project it belongs to) to turn the feed on; unset, it returns
 * nothing rather than showing stale or invented reviews, same rule as
 * everywhere else in this template.
 */
import { company } from "./company";

export type GoogleReview = {
  id: string;
  author: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type VideoTestimonial = {
  /** The buyer's name, as they'd want it credited. Omit until the video exists. */
  name?: string;
  /** An embeddable or `public/`-hosted video URL. Omit and the card reads "Coming soon". */
  videoUrl?: string;
};

/**
 * Video testimonials. Ships as four unfilled slots — no buyer has been
 * recorded yet, so each renders as a "coming soon" card rather than a name
 * or a quote nobody said. Fill in `name` and `videoUrl` as recordings come
 * in, and register a `page/video-testimonial-<n>` thumbnail in
 * `lib/photos.ts` for the still frame — see the `photos` skill.
 */
export const videoTestimonials: VideoTestimonial[] = [{}, {}, {}, {}];

const PLACE_DETAILS_FIELD_MASK =
  "reviews.rating,reviews.text,reviews.relativePublishTimeDescription,reviews.authorAttribution";

/**
 * Live reviews from the dealership's Google Business Profile.
 *
 * The Places API (New) Place Details endpoint returns at most five reviews,
 * chosen by Google's own relevance ranking rather than most recent — there
 * is no way to ask for more or for a different order. Revalidated twice a
 * day, so a new review shows up without a redeploy.
 */
export async function getGoogleReviews(): Promise<GoogleReview[]> {
  const placeId = company.googlePlaceId;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !apiKey) return [];

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": PLACE_DETAILS_FIELD_MASK,
      },
      next: { revalidate: 43_200 },
    });

    if (!res.ok) {
      console.error(`[reviews] Places API responded ${res.status}`);
      return [];
    }

    const data = (await res.json()) as {
      reviews?: {
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
        authorAttribution?: { displayName?: string; photoUri?: string };
      }[];
    };

    return (data.reviews ?? [])
      .filter((r) => !!r.text?.text?.trim())
      .map((r, i) => ({
        id: String(i),
        author: r.authorAttribution?.displayName ?? "Google user",
        authorPhoto: r.authorAttribution?.photoUri,
        rating: r.rating ?? 5,
        text: r.text!.text!.trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
      }));
  } catch (err) {
    console.error("[reviews] failed to fetch Google reviews", err);
    return [];
  }
}
