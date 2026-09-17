/**
 * The photo desk — one file for every photograph on the site.
 *
 * Key naming — three shapes, and only three:
 *
 *   "<home-slug>/<scene-kind>"   one scene on one home
 *                                kinds: exterior · living · kitchen
 *                                       bedroom · bath · porch
 *   "community/<community-slug>" a community's hero image
 *   "page/<name>"               a page hero or a one-off site image
 *
 * Values are paths under `public/`, so `/photos/homes/te3264r/kitchen.webp`
 * lives at `public/photos/homes/te3264r/kitchen.webp`. Use `.jpg` or
 * `.webp`, roughly 2000px on the long edge, and name the file after the key.
 *
 * The site shows photographs and nothing else. A key with no photograph
 * renders as an empty plate saying so, which is why every listing in
 * `lib/homes.ts` declares only the scenes it actually has a picture of.
 * Add a scene to a listing without adding its photograph here and the
 * gallery will show that plate — check both together.
 *
 * WHERE THESE CAME FROM. Every photograph below was read off the
 * dealership's own inventory site, manufacturedcountryhomes.com, from the
 * page for the home it is filed under — so each one pictures the plan it is
 * attached to rather than a stand-in. `node scripts/import-nmch.mjs photos`
 * downloads them from `scripts/nmch-catalogue.json` and
 * `scripts/nmch-selection.json`, which records which gallery image fills
 * which scene; regenerate rather than editing paths by hand.
 *
 * Forty of the ninety homes have no photographs on the source at all — their
 * page carries the manufacturer's plan drawing and nothing else — so they
 * appear nowhere below and their galleries are the empty plate. That is
 * correct and deliberate. Photograph those homes on the lot and add them
 * here; do not fill them with pictures of a different house.
 *
 * These are the manufacturer's and the dealership's own images, and the
 * source states that they may show options not included in the base price.
 * The site footer repeats that.
 *
 * Floor-plan drawings are NOT in this map. They hang off `planImage` on each
 * listing and live under `/photos/plans/<slug>.webp`.
 *
 * Page keys the site is wired for: `page/homes` (the `/listings` hero — the
 * key kept its name when the route was renamed), `page/communities`,
 * `page/start-here`, `page/why-manufactured`, `page/financing`,
 * `page/faq`, `page/prequalify`, `page/promotions`, `page/blog`,
 * `page/address`, `page/about`, `page/contact`, `page/saved`,
 * `page/not-found`, `page/home-closing` (the wide band under the hero),
 * `page/reviews` (behind the testimonials),
 * `page/video-testimonial-1` … `page/video-testimonial-4` (the still frame
 * behind each video testimonial card in that same band — see
 * `components/reviews-marquee.tsx`),
 * `page/about-team-1` … `page/about-team-2`, and `blog/<slug>` for a post's
 * hero. Every one of those with no photograph renders as the empty plate,
 * which is the correct outcome — it is never filled with a stand-in.
 *
 * The homepage hero is the one image that is NOT listed here: it is
 * imported directly in `components/landing.tsx` so it can ship a blur
 * placeholder. `public/photos/hero-home.jpg` is the TE3264R standing on the
 * lot, from the same source.
 */
export const photos: Record<string, string> = {
  "chpr-1466h32p01/bath": "/photos/homes/chpr-1466h32p01/bath.webp",
  "chpr-1466h32p01/bedroom": "/photos/homes/chpr-1466h32p01/bedroom.webp",
  "chpr-1466h32p01/kitchen": "/photos/homes/chpr-1466h32p01/kitchen.webp",
  "chpr-1466h32p01/living": "/photos/homes/chpr-1466h32p01/living.webp",
  "chpr-1476h32p01/bath": "/photos/homes/chpr-1476h32p01/bath.webp",
  "chpr-1476h32p01/bedroom": "/photos/homes/chpr-1476h32p01/bedroom.webp",
  "chpr-1476h32p01/kitchen": "/photos/homes/chpr-1476h32p01/kitchen.webp",
  "chpr-1476h32p01/living": "/photos/homes/chpr-1476h32p01/living.webp",
  "chpr-1656h22p01/bath": "/photos/homes/chpr-1656h22p01/bath.webp",
  "chpr-1656h22p01/kitchen": "/photos/homes/chpr-1656h22p01/kitchen.webp",
  "chpr-1656h22p01/living": "/photos/homes/chpr-1656h22p01/living.webp",
  "chpr-1656h32p05/bath": "/photos/homes/chpr-1656h32p05/bath.webp",
  "chpr-1656h32p05/bedroom": "/photos/homes/chpr-1656h32p05/bedroom.webp",
  "chpr-1656h32p05/kitchen": "/photos/homes/chpr-1656h32p05/kitchen.webp",
  "chpr-1656h32p05/living": "/photos/homes/chpr-1656h32p05/living.webp",
  "chpr-1660h22p01/bath": "/photos/homes/chpr-1660h22p01/bath.webp",
  "chpr-1660h22p01/kitchen": "/photos/homes/chpr-1660h22p01/kitchen.webp",
  "chpr-1660h22p01/living": "/photos/homes/chpr-1660h22p01/living.webp",
  "chpr-1666h32p01/bath": "/photos/homes/chpr-1666h32p01/bath.webp",
  "chpr-1666h32p01/bedroom": "/photos/homes/chpr-1666h32p01/bedroom.webp",
  "chpr-1666h32p01/kitchen": "/photos/homes/chpr-1666h32p01/kitchen.webp",
  "chpr-1666h32p01/living": "/photos/homes/chpr-1666h32p01/living.webp",
  "chpr-1672h32p01/bath": "/photos/homes/chpr-1672h32p01/bath.webp",
  "chpr-1672h32p01/bedroom": "/photos/homes/chpr-1672h32p01/bedroom.webp",
  "chpr-1672h32p01/kitchen": "/photos/homes/chpr-1672h32p01/kitchen.webp",
  "chpr-1672h32p01/living": "/photos/homes/chpr-1672h32p01/living.webp",
  "chpr-1676h32p01/bath": "/photos/homes/chpr-1676h32p01/bath.webp",
  "chpr-1676h32p01/bedroom": "/photos/homes/chpr-1676h32p01/bedroom.webp",
  "chpr-1676h32p01/living": "/photos/homes/chpr-1676h32p01/living.webp",
  "chpr-1676h32p08/bath": "/photos/homes/chpr-1676h32p08/bath.webp",
  "chpr-1676h32p08/bedroom": "/photos/homes/chpr-1676h32p08/bedroom.webp",
  "chpr-1676h32p08/kitchen": "/photos/homes/chpr-1676h32p08/kitchen.webp",
  "chpr-2856h32p01/bath": "/photos/homes/chpr-2856h32p01/bath.webp",
  "chpr-2856h32p01/kitchen": "/photos/homes/chpr-2856h32p01/kitchen.webp",
  "chpr-2856h32p01/living": "/photos/homes/chpr-2856h32p01/living.webp",
  "chpr-2856h42p01/bath": "/photos/homes/chpr-2856h42p01/bath.webp",
  "chpr-2856h42p01/kitchen": "/photos/homes/chpr-2856h42p01/kitchen.webp",
  "chpr-2856h42p01/living": "/photos/homes/chpr-2856h42p01/living.webp",
  "chpr-2876h53p01/bath": "/photos/homes/chpr-2876h53p01/bath.webp",
  "chpr-2876h53p01/kitchen": "/photos/homes/chpr-2876h53p01/kitchen.webp",
  "chpr-2876h53p01/living": "/photos/homes/chpr-2876h53p01/living.webp",
  "chpr-3252h32p03/bath": "/photos/homes/chpr-3252h32p03/bath.webp",
  "chpr-3252h32p03/bedroom": "/photos/homes/chpr-3252h32p03/bedroom.webp",
  "chpr-3252h32p03/kitchen": "/photos/homes/chpr-3252h32p03/kitchen.webp",
  "chpr-3252h32p03/living": "/photos/homes/chpr-3252h32p03/living.webp",
  "chpr-3252h32p08/bath": "/photos/homes/chpr-3252h32p08/bath.webp",
  "chpr-3252h32p08/bedroom": "/photos/homes/chpr-3252h32p08/bedroom.webp",
  "chpr-3252h32p08/kitchen": "/photos/homes/chpr-3252h32p08/kitchen.webp",
  "chpr-3252h32p08/living": "/photos/homes/chpr-3252h32p08/living.webp",
  "chpr-3256h42p03/bath": "/photos/homes/chpr-3256h42p03/bath.webp",
  "chpr-3256h42p03/bedroom": "/photos/homes/chpr-3256h42p03/bedroom.webp",
  "chpr-3256h42p03/kitchen": "/photos/homes/chpr-3256h42p03/kitchen.webp",
  "chpr-3256h42p03/living": "/photos/homes/chpr-3256h42p03/living.webp",
  "chpr-3260h32p03/bath": "/photos/homes/chpr-3260h32p03/bath.webp",
  "chpr-3260h32p03/kitchen": "/photos/homes/chpr-3260h32p03/kitchen.webp",
  "chpr-3260h32p03/living": "/photos/homes/chpr-3260h32p03/living.webp",
  "chpr-3260h32p08/bath": "/photos/homes/chpr-3260h32p08/bath.webp",
  "chpr-3260h32p08/kitchen": "/photos/homes/chpr-3260h32p08/kitchen.webp",
  "chpr-3260h32p08/living": "/photos/homes/chpr-3260h32p08/living.webp",
  "chpr-3260h42p03/bath": "/photos/homes/chpr-3260h42p03/bath.webp",
  "chpr-3260h42p03/kitchen": "/photos/homes/chpr-3260h42p03/kitchen.webp",
  "chpr-3260h42p03/living": "/photos/homes/chpr-3260h42p03/living.webp",
  "chpr-3266h32p08/bath": "/photos/homes/chpr-3266h32p08/bath.webp",
  "chpr-3266h32p08/kitchen": "/photos/homes/chpr-3266h32p08/kitchen.webp",
  "chpr-3266h32p08/living": "/photos/homes/chpr-3266h32p08/living.webp",
  "chpr-3266h42p08/bath": "/photos/homes/chpr-3266h42p08/bath.webp",
  "chpr-3266h42p08/kitchen": "/photos/homes/chpr-3266h42p08/kitchen.webp",
  "chpr-3272h42p03/bath": "/photos/homes/chpr-3272h42p03/bath.webp",
  "chpr-3272h42p03/bedroom": "/photos/homes/chpr-3272h42p03/bedroom.webp",
  "chpr-3272h42p03/exterior": "/photos/homes/chpr-3272h42p03/exterior.webp",
  "chpr-3272h42p03/kitchen": "/photos/homes/chpr-3272h42p03/kitchen.webp",
  "chpr-3272h42p03/living": "/photos/homes/chpr-3272h42p03/living.webp",
  "chpr-3272h52p03/living": "/photos/homes/chpr-3272h52p03/living.webp",
  "rm1456a-1456h21051/bath": "/photos/homes/rm1456a-1456h21051/bath.webp",
  "rm1456a-1456h21051/kitchen": "/photos/homes/rm1456a-1456h21051/kitchen.webp",
  "rm1456a-1456h21051/living": "/photos/homes/rm1456a-1456h21051/living.webp",
  "rm1466a-1466h32042/bath": "/photos/homes/rm1466a-1466h32042/bath.webp",
  "rm1466a-1466h32042/kitchen": "/photos/homes/rm1466a-1466h32042/kitchen.webp",
  "rm1466a-1466h32042/living": "/photos/homes/rm1466a-1466h32042/living.webp",
  "rm1656a-1656h22043/bath": "/photos/homes/rm1656a-1656h22043/bath.webp",
  "rm1656a-1656h22043/bedroom": "/photos/homes/rm1656a-1656h22043/bedroom.webp",
  "rm1656a-1656h22043/kitchen": "/photos/homes/rm1656a-1656h22043/kitchen.webp",
  "rm1656a-1656h22043/living": "/photos/homes/rm1656a-1656h22043/living.webp",
  "rm1668a-1668h32032/bath": "/photos/homes/rm1668a-1668h32032/bath.webp",
  "rm1668a-1668h32032/kitchen": "/photos/homes/rm1668a-1668h32032/kitchen.webp",
  "rm1668a-1668h32032/living": "/photos/homes/rm1668a-1668h32032/living.webp",
  "rm1676c-1676h32205/bath": "/photos/homes/rm1676c-1676h32205/bath.webp",
  "rm1676c-1676h32205/bedroom": "/photos/homes/rm1676c-1676h32205/bedroom.webp",
  "rm1676c-1676h32205/kitchen": "/photos/homes/rm1676c-1676h32205/kitchen.webp",
  "rm1676c-1676h32205/living": "/photos/homes/rm1676c-1676h32205/living.webp",
  "rm2848a-2848h32054/bath": "/photos/homes/rm2848a-2848h32054/bath.webp",
  "rm2848a-2848h32054/bedroom": "/photos/homes/rm2848a-2848h32054/bedroom.webp",
  "rm2848a-2848h32054/kitchen": "/photos/homes/rm2848a-2848h32054/kitchen.webp",
  "rm2848a-2848h32054/living": "/photos/homes/rm2848a-2848h32054/living.webp",
  "rm2852a-2852h42a2a/bath": "/photos/homes/rm2852a-2852h42a2a/bath.webp",
  "rm2852a-2852h42a2a/kitchen": "/photos/homes/rm2852a-2852h42a2a/kitchen.webp",
  "rm2852a-2852h42a2a/living": "/photos/homes/rm2852a-2852h42a2a/living.webp",
  "rm2852b-2852h32a2a/bath": "/photos/homes/rm2852b-2852h32a2a/bath.webp",
  "rm2852b-2852h32a2a/bedroom": "/photos/homes/rm2852b-2852h32a2a/bedroom.webp",
  "rm2852b-2852h32a2a/kitchen": "/photos/homes/rm2852b-2852h32a2a/kitchen.webp",
  "rm2852b-2852h32a2a/living": "/photos/homes/rm2852b-2852h32a2a/living.webp",
  "rm2856b-2856h42055/bath": "/photos/homes/rm2856b-2856h42055/bath.webp",
  "rm2856b-2856h42055/bedroom": "/photos/homes/rm2856b-2856h42055/bedroom.webp",
  "rm2856b-2856h42055/exterior": "/photos/homes/rm2856b-2856h42055/exterior.webp",
  "rm2856b-2856h42055/kitchen": "/photos/homes/rm2856b-2856h42055/kitchen.webp",
  "rm2856b-2856h42055/living": "/photos/homes/rm2856b-2856h42055/living.webp",
  "rm2856b-2856h42055/porch": "/photos/homes/rm2856b-2856h42055/porch.webp",
  "rm2868a-2868h42105/bath": "/photos/homes/rm2868a-2868h42105/bath.webp",
  "rm2868a-2868h42105/kitchen": "/photos/homes/rm2868a-2868h42105/kitchen.webp",
  "rm2868a-2868h42105/living": "/photos/homes/rm2868a-2868h42105/living.webp",
  "rm3256a-3256h42055/bath": "/photos/homes/rm3256a-3256h42055/bath.webp",
  "rm3256a-3256h42055/bedroom": "/photos/homes/rm3256a-3256h42055/bedroom.webp",
  "rm3256a-3256h42055/kitchen": "/photos/homes/rm3256a-3256h42055/kitchen.webp",
  "rm3256a-3256h42055/living": "/photos/homes/rm3256a-3256h42055/living.webp",
  "rm3264a-3264h43106/bath": "/photos/homes/rm3264a-3264h43106/bath.webp",
  "rm3264a-3264h43106/bedroom": "/photos/homes/rm3264a-3264h43106/bedroom.webp",
  "rm3264a-3264h43106/exterior": "/photos/homes/rm3264a-3264h43106/exterior.webp",
  "rm3264a-3264h43106/kitchen": "/photos/homes/rm3264a-3264h43106/kitchen.webp",
  "rm3264a-3264h43106/living": "/photos/homes/rm3264a-3264h43106/living.webp",
  "rm3264a-3264h43106/porch": "/photos/homes/rm3264a-3264h43106/porch.webp",
  "rm3268a-3268h42105/bath": "/photos/homes/rm3268a-3268h42105/bath.webp",
  "rm3268a-3268h42105/kitchen": "/photos/homes/rm3268a-3268h42105/kitchen.webp",
  "rm3268a-3268h42105/living": "/photos/homes/rm3268a-3268h42105/living.webp",
  "rm3272a-3272h42a2v/bath": "/photos/homes/rm3272a-3272h42a2v/bath.webp",
  "rm3272a-3272h42a2v/kitchen": "/photos/homes/rm3272a-3272h42a2v/kitchen.webp",
  "rm3272a-3272h42a2v/living": "/photos/homes/rm3272a-3272h42a2v/living.webp",
  "te2856h32a1f/bath": "/photos/homes/te2856h32a1f/bath.webp",
  "te2856h32a1f/bedroom": "/photos/homes/te2856h32a1f/bedroom.webp",
  "te2856h32a1f/exterior": "/photos/homes/te2856h32a1f/exterior.webp",
  "te2856h32a1f/kitchen": "/photos/homes/te2856h32a1f/kitchen.webp",
  "te2856h32a1f/living": "/photos/homes/te2856h32a1f/living.webp",
  "te2856h32a1f/porch": "/photos/homes/te2856h32a1f/porch.webp",
  "te2856n/bath": "/photos/homes/te2856n/bath.webp",
  "te2856n/bedroom": "/photos/homes/te2856n/bedroom.webp",
  "te2856n/kitchen": "/photos/homes/te2856n/kitchen.webp",
  "te2856n/living": "/photos/homes/te2856n/living.webp",
  "te2864h42331/bath": "/photos/homes/te2864h42331/bath.webp",
  "te2864h42331/bedroom": "/photos/homes/te2864h42331/bedroom.webp",
  "te2864h42331/kitchen": "/photos/homes/te2864h42331/kitchen.webp",
  "te2864h42331/living": "/photos/homes/te2864h42331/living.webp",
  "te2876h42106/bath": "/photos/homes/te2876h42106/bath.webp",
  "te2876h42106/bedroom": "/photos/homes/te2876h42106/bedroom.webp",
  "te2876h42106/kitchen": "/photos/homes/te2876h42106/kitchen.webp",
  "te2876h42106/living": "/photos/homes/te2876h42106/living.webp",
  "te3248e/bath": "/photos/homes/te3248e/bath.webp",
  "te3248e/bedroom": "/photos/homes/te3248e/bedroom.webp",
  "te3248e/kitchen": "/photos/homes/te3248e/kitchen.webp",
  "te3248e/living": "/photos/homes/te3248e/living.webp",
  "te3256n/bath": "/photos/homes/te3256n/bath.webp",
  "te3256n/kitchen": "/photos/homes/te3256n/kitchen.webp",
  "te3256n/living": "/photos/homes/te3256n/living.webp",
  "te3260h32083/bath": "/photos/homes/te3260h32083/bath.webp",
  "te3260h32083/bedroom": "/photos/homes/te3260h32083/bedroom.webp",
  "te3260h32083/exterior": "/photos/homes/te3260h32083/exterior.webp",
  "te3260h32083/kitchen": "/photos/homes/te3260h32083/kitchen.webp",
  "te3260h32083/living": "/photos/homes/te3260h32083/living.webp",
  "te3264r/bath": "/photos/homes/te3264r/bath.webp",
  "te3264r/bedroom": "/photos/homes/te3264r/bedroom.webp",
  "te3264r/exterior": "/photos/homes/te3264r/exterior.webp",
  "te3264r/kitchen": "/photos/homes/te3264r/kitchen.webp",
  "te3264r/living": "/photos/homes/te3264r/living.webp",
  "te3266a/bath": "/photos/homes/te3266a/bath.webp",
  "te3266a/bedroom": "/photos/homes/te3266a/bedroom.webp",
  "te3266a/exterior": "/photos/homes/te3266a/exterior.webp",
  "te3266a/kitchen": "/photos/homes/te3266a/kitchen.webp",
  "te3266a/living": "/photos/homes/te3266a/living.webp",
  "te3266d/bath": "/photos/homes/te3266d/bath.webp",
  "te3266d/bedroom": "/photos/homes/te3266d/bedroom.webp",
  "te3266d/kitchen": "/photos/homes/te3266d/kitchen.webp",
  "te3266d/living": "/photos/homes/te3266d/living.webp",
  "te3272c/bath": "/photos/homes/te3272c/bath.webp",
  "te3272c/bedroom": "/photos/homes/te3272c/bedroom.webp",
  "te3272c/exterior": "/photos/homes/te3272c/exterior.webp",
  "te3272c/kitchen": "/photos/homes/te3272c/kitchen.webp",
  "te3272c/living": "/photos/homes/te3272c/living.webp",
  "te3272e/bath": "/photos/homes/te3272e/bath.webp",
  "te3272e/bedroom": "/photos/homes/te3272e/bedroom.webp",
  "te3272e/kitchen": "/photos/homes/te3272e/kitchen.webp",
  "te3272e/living": "/photos/homes/te3272e/living.webp",
  "te3276f/bath": "/photos/homes/te3276f/bath.webp",
  "te3276f/bedroom": "/photos/homes/te3276f/bedroom.webp",
  "te3276f/exterior": "/photos/homes/te3276f/exterior.webp",
  "te3276f/kitchen": "/photos/homes/te3276f/kitchen.webp",
  "te3276f/living": "/photos/homes/te3276f/living.webp",
  "te3276t/bath": "/photos/homes/te3276t/bath.webp",
  "te3276t/bedroom": "/photos/homes/te3276t/bedroom.webp",
  "te3276t/exterior": "/photos/homes/te3276t/exterior.webp",
  "te3276t/kitchen": "/photos/homes/te3276t/kitchen.webp",
  "te3276t/living": "/photos/homes/te3276t/living.webp",
  /* Page furniture, drawn from the catalogue rather than from stock. Each
     one is a photograph of a home this dealership actually sells. */
  "page/homes": "/photos/homes/te3264r/exterior.webp",
  "page/why-manufactured": "/photos/homes/chpr-3272h42p03/exterior.webp",
  "page/financing": "/photos/homes/te3266a/living.webp",
  "page/start-here": "/photos/homes/te3264r/living.webp",
  "page/about": "/photos/homes/te2876h42106/living.webp",
  "page/contact": "/photos/homes/rm2856b-2856h42055/porch.webp",
  "page/saved": "/photos/homes/te3272e/living.webp",
  "page/not-found": "/photos/homes/chpr-3272h42p03/exterior.webp",
  "page/home-closing": "/photos/homes/te3264r/exterior.webp",
  "page/faq": "/photos/homes/rm3264a-3264h43106/living.webp",
  "page/prequalify": "/photos/homes/te3248e/kitchen.webp",
  "page/promotions": "/photos/homes/te3266d/living.webp",
  "page/address": "/photos/homes/chpr-3272h42p03/exterior.webp",
  "page/about-team-1": "/photos/pages/about-team-1.webp",
  "page/about-team-2": "/photos/pages/about-team-2.webp",
};

/** The photo registered for a key, or undefined when there is none. */
export function photoFor(key?: string): string | undefined {
  return key ? photos[key] : undefined;
}
