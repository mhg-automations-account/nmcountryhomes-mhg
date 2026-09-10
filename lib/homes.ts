import { floorPlans, type FloorPlan } from "./floor-plans";

export type ListingStatus = "available" | "pending" | "sold" | "coming-soon";
export type Sections = "single" | "double" | "triple";
export type ArchStyle =
  | "farmhouse"
  | "craftsman"
  | "modern"
  | "coastal"
  | "lodge"
  | "ranch";
export type SceneKind =
  | "exterior"
  | "living"
  | "kitchen"
  | "bedroom"
  | "bath"
  | "porch";

export type Scene = { kind: SceneKind; caption: string };

export type FeatureGroup = { group: string; items: string[] };

/**
 * A home in the catalogue.
 *
 * Required fields are the ones a listing cannot mean anything without. The
 * rest are optional because real inventory arrives incomplete: a
 * manufacturer's spec sheet may carry dimensions but no price, an imported
 * feed may carry photographs but no floor plan. Every field below that can
 * be absent is absent from the UI too — nothing is faked to fill a slot,
 * and nothing renders as a blank or a zero.
 */
export type Listing = {
  slug: string;
  name: string;
  beds: number;
  baths: number;
  status: ListingStatus;
  scenes: Scene[];

  /** Living area in square feet. Optional for the same reason `price` is:
      a manufacturer's sheet occasionally omits it, and every place that
      shows a footprint hides the row rather than printing a zero. */
  sqft?: number;

  /** Product line, e.g. "Elite". Free text — the facet list derives from it. */
  series?: string;
  /** Manufacturer's model code. */
  model?: string;
  /** Absent means the home is priced on enquiry; the UI says so. */
  price?: number;
  /** Optional pre-discount price; renders as a strikethrough. */
  wasPrice?: number;
  sections?: Sections;
  /** Transport dimensions in feet, e.g. 28 × 60. */
  widthFt?: number;
  lengthFt?: number;
  year?: number;
  communitySlug?: string;
  style?: ArchStyle;
  tagline?: string;
  story?: string[];
  highlights?: string[];
  features?: FeatureGroup[];
  planId?: keyof typeof floorPlans;
  /** HERS index — lower is better. A new stick-built home scores ~100. */
  hers?: number;
  featured?: boolean;
  /** Days the listing has been on market, used for the "new" badge. */
  daysListed?: number;
  /** Matterport walkthrough. */
  tourUrl?: string;
  /** Where this listing was imported from, for re-checking against source. */
  sourceUrl?: string;
  /** The manufacturer's own floor-plan drawing, under `public/`.
      Separate from `planId`: that renders a plan this site draws from room
      geometry, while this is the printed sheet the plan actually ships with.
      A listing may carry either, both or neither. */
  planImage?: string;
};

const scenes = (...kinds: [SceneKind, string][]): Scene[] =>
  kinds.map(([kind, caption]) => ({ kind, caption }));

/* ------------------------------------------------------------------ *
 * The catalogue — ninety homes on the lot at 11500 Central Avenue SE
 *
 * Read from the dealership's own inventory site,
 * manufacturedcountryhomes.com, where every home has a page of its own;
 * each listing's `sourceUrl` is the page it came from, and
 * `scripts/nmch-catalogue.json` is the scrape, so any figure here can be
 * checked against the source. `scripts/import-nmch.mjs` regenerates the
 * photography and the plan drawings from it.
 *
 * `series` is the product line the dealership files the home under —
 * Titan Extreme, Redman or Prime — and `sections` is which of its two
 * category pages (single-wide or double-wide) the home appears on. Both
 * are the dealership's own classification, not an inference from size.
 *
 * `price` is the published price BEFORE OPTIONS, which is how the source
 * states it and how the site labels it. It is the home; it is not delivery,
 * set, site work, or anything added at the order desk.
 *
 * `widthFt` and `lengthFt` are read off the manufacturer's model code,
 * which encodes them — CHPR-1466H32P01 is a 14 × 66, TE3272C a 32 × 72.
 * Every one was checked against both the published square footage and the
 * single/double category before being written down. The bedroom and
 * bathroom digits in those same codes are NOT used: they disagree with the
 * published counts on several homes, so beds and baths come from what the
 * listing page states and nowhere else.
 *
 * What the source does not publish is absent rather than invented: there
 * are no build years, HERS indices, feature lists, prose descriptions,
 * warranty terms, community placements or floor-plan geometry here. One
 * home, TE3276F, publishes no square footage at all, so it has none.
 *
 * Thirty-nine of the ninety have no photographs on the source — their page
 * carries only the plan drawing — so those listings declare no scenes and
 * their galleries render as the empty plate. That is the correct outcome
 * and it is not to be filled with photographs of a different house.
 *
 * `status` and `featured` are lot state for this site rather than
 * manufacturer data. Everything ships `available`; six homes with the
 * fullest galleries are featured on the landing page.
 * ------------------------------------------------------------------ */

export const listings: Listing[] = [
  {
    slug: "chpr-1466h32p01",
    name: "CHPR-1466H32P01",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 880,
    sections: "single",
    widthFt: 14,
    lengthFt: 66,
    price: 85000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1466h32p01/",
    planImage: "/photos/plans/chpr-1466h32p01.webp",
    tagline:
      "A 14 by 66 single section: three bedrooms, two baths and 880 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-1476h32p01",
    name: "CHPR-1476H32P01",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1013,
    sections: "single",
    widthFt: 14,
    lengthFt: 76,
    price: 89000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1476h32p01/",
    planImage: "/photos/plans/chpr-1476h32p01.webp",
    tagline:
      "A 14 by 76 single section: three bedrooms, two baths and 1,013 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-1656h22p01",
    name: "CHPR-1656H22P01",
    series: "Prime",
    beds: 2,
    baths: 2,
    sqft: 850,
    sections: "single",
    widthFt: 16,
    lengthFt: 56,
    price: 86000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1656h22p01/",
    planImage: "/photos/plans/chpr-1656h22p01.webp",
    tagline:
      "A 16 by 56 single section: two bedrooms, two baths and 850 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-1656h32p05",
    name: "CHPR-1656H32P05",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 850,
    sections: "single",
    widthFt: 16,
    lengthFt: 56,
    price: 87000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1656h32p05/",
    planImage: "/photos/plans/chpr-1656h32p05.webp",
    tagline:
      "A 16 by 56 single section: three bedrooms, two baths and 850 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-1660h22p01",
    name: "CHPR-1660H22P01",
    series: "Prime",
    beds: 2,
    baths: 2,
    sqft: 910,
    sections: "single",
    widthFt: 16,
    lengthFt: 60,
    price: 87000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1660h22p01/",
    planImage: "/photos/plans/chpr-1660h22p01.webp",
    tagline:
      "A 16 by 60 single section: two bedrooms, two baths and 910 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-1666h32p01",
    name: "CHPR-1666H32P01",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1001,
    sections: "single",
    widthFt: 16,
    lengthFt: 66,
    price: 90000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1666h32p01/",
    planImage: "/photos/plans/chpr-1666h32p01.webp",
    tagline:
      "A 16 by 66 single section: three bedrooms, two baths and 1,001 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-1672h32p01",
    name: "CHPR-1672H32P01",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1092,
    sections: "single",
    widthFt: 16,
    lengthFt: 72,
    price: 92000,
    status: "available",
    featured: true,
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1672h32p01/",
    planImage: "/photos/plans/chpr-1672h32p01.webp",
    tagline:
      "A 16 by 72 single section: three bedrooms, two baths and 1,092 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-1676h32p01",
    name: "CHPR-1676H32P01",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1153,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 94000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1676h32p01/",
    planImage: "/photos/plans/chpr-1676h32p01.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,153 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-1676h32p08",
    name: "CHPR-1676H32P08",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1031,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 94000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-1676h32p08/",
    planImage: "/photos/plans/chpr-1676h32p08.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,031 square feet, priced before options.",
    scenes: scenes(
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm1456a-1456h21051",
    name: "RM1456A-1456H21051",
    series: "Redman",
    beds: 2,
    baths: 1,
    sqft: 747,
    sections: "single",
    widthFt: 14,
    lengthFt: 56,
    price: 82000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm1456a-1456h21051/",
    planImage: "/photos/plans/rm1456a-1456h21051.webp",
    tagline:
      "A 14 by 56 single section: two bedrooms, one bath and 747 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm1466a-1466h32042",
    name: "RM1466A-1466H32042",
    series: "Redman",
    beds: 3,
    baths: 2,
    sqft: 880,
    sections: "single",
    widthFt: 14,
    lengthFt: 66,
    price: 88000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm1466a-1466h32042/",
    planImage: "/photos/plans/rm1466a-1466h32042.webp",
    tagline:
      "A 14 by 66 single section: three bedrooms, two baths and 880 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm1476a-1476h32a4a",
    name: "RM1476A-1476H32A4A",
    series: "Redman",
    beds: 3,
    baths: 2,
    sqft: 1013,
    sections: "single",
    widthFt: 14,
    lengthFt: 76,
    price: 93000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm1476a-1476h32a4a/",
    planImage: "/photos/plans/rm1476a-1476h32a4a.webp",
    tagline:
      "A 14 by 76 single section: three bedrooms, two baths and 1,013 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "rm1656a-1656h22043",
    name: "RM1656A-1656H22043",
    series: "Redman",
    beds: 2,
    baths: 2,
    sqft: 849,
    sections: "single",
    widthFt: 16,
    lengthFt: 56,
    price: 86000,
    status: "available",
    featured: true,
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm1656a-1656h22043/",
    planImage: "/photos/plans/rm1656a-1656h22043.webp",
    tagline:
      "A 16 by 56 single section: two bedrooms, two baths and 849 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm1668a-1668h32032",
    name: "RM1668A-1668H32032",
    series: "Redman",
    beds: 3,
    baths: 2,
    sqft: 1031,
    sections: "single",
    widthFt: 16,
    lengthFt: 68,
    price: 91000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm1668a-1668h32032/",
    planImage: "/photos/plans/rm1668a-1668h32032.webp",
    tagline:
      "A 16 by 68 single section: three bedrooms, two baths and 1,031 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm1676c-1676h32205",
    name: "RM1676C-1676H32205",
    series: "Redman",
    beds: 3,
    baths: 2,
    sqft: 1153,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 98000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm1676c-1676h32205/",
    planImage: "/photos/plans/rm1676c-1676h32205.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,153 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te1650h11059",
    name: "TE1650H11059",
    series: "Titan Extreme",
    beds: 1,
    baths: 1,
    sqft: 758,
    sections: "single",
    widthFt: 16,
    lengthFt: 50,
    price: 111000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1650h11059/",
    planImage: "/photos/plans/te1650h11059.webp",
    tagline:
      "A 16 by 50 single section: one bedroom, one bath and 758 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1654h11023",
    name: "TE1654H11023",
    series: "Titan Extreme",
    beds: 1,
    baths: 1,
    sqft: 698,
    sections: "single",
    widthFt: 16,
    lengthFt: 54,
    price: 119000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1654h11023/",
    planImage: "/photos/plans/te1654h11023.webp",
    tagline:
      "A 16 by 54 single section: one bedroom, one bath and 698 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1654h21a6g",
    name: "TE1654H21A6G",
    series: "Titan Extreme",
    beds: 2,
    baths: 1,
    sqft: 728,
    sections: "single",
    widthFt: 16,
    lengthFt: 54,
    price: 112000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1654h21a6g/",
    planImage: "/photos/plans/te1654h21a6g.webp",
    tagline:
      "A 16 by 54 single section: two bedrooms, one bath and 728 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1656h11024",
    name: "TE1656H11024",
    series: "Titan Extreme",
    beds: 1,
    baths: 1,
    sqft: 798,
    sections: "single",
    widthFt: 16,
    lengthFt: 56,
    price: 114000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1656h11024/",
    planImage: "/photos/plans/te1656h11024.webp",
    tagline:
      "A 16 by 56 single section: one bedroom, one bath and 798 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1656h21040",
    name: "TE1656H21040",
    series: "Titan Extreme",
    beds: 2,
    baths: 1,
    sqft: 758,
    sections: "single",
    widthFt: 16,
    lengthFt: 56,
    price: 113000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1656h21040/",
    planImage: "/photos/plans/te1656h21040.webp",
    tagline:
      "A 16 by 56 single section: two bedrooms, one bath and 758 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1656h22046",
    name: "TE1656H22046",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 849,
    sections: "single",
    widthFt: 16,
    lengthFt: 56,
    price: 116000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1656h22046/",
    planImage: "/photos/plans/te1656h22046.webp",
    tagline:
      "A 16 by 56 single section: two bedrooms, two baths and 849 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1662h21023",
    name: "TE1662H21023",
    series: "Titan Extreme",
    beds: 2,
    baths: 1,
    sqft: 819,
    sections: "single",
    widthFt: 16,
    lengthFt: 62,
    price: 122000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1662h21023/",
    planImage: "/photos/plans/te1662h21023.webp",
    tagline:
      "A 16 by 62 single section: two bedrooms, one bath and 819 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1662h21063",
    name: "TE1662H21063",
    series: "Titan Extreme",
    beds: 2,
    baths: 1,
    sqft: 819,
    sections: "single",
    widthFt: 16,
    lengthFt: 62,
    price: 121000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1662h21063/",
    planImage: "/photos/plans/te1662h21063.webp",
    tagline:
      "A 16 by 62 single section: two bedrooms, one bath and 819 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1662h22a6g",
    name: "TE1662H22A6G",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 940,
    sections: "single",
    widthFt: 16,
    lengthFt: 62,
    price: 119000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1662h22a6g/",
    planImage: "/photos/plans/te1662h22a6g.webp",
    tagline:
      "A 16 by 62 single section: two bedrooms, two baths and 940 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1664h11023",
    name: "TE1664H11023",
    series: "Titan Extreme",
    beds: 1,
    baths: 1,
    sqft: 849,
    sections: "single",
    widthFt: 16,
    lengthFt: 64,
    price: 122000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1664h11023/",
    planImage: "/photos/plans/te1664h11023.webp",
    tagline:
      "A 16 by 64 single section: one bedroom, one bath and 849 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1666h21026",
    name: "TE1666H21026",
    series: "Titan Extreme",
    beds: 2,
    baths: 1,
    sqft: 1001,
    sections: "single",
    widthFt: 16,
    lengthFt: 66,
    price: 122000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1666h21026/",
    planImage: "/photos/plans/te1666h21026.webp",
    tagline:
      "A 16 by 66 single section: two bedrooms, one bath and 1,001 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1666h22025",
    name: "TE1666H22025",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 951,
    sections: "single",
    widthFt: 16,
    lengthFt: 66,
    price: 129000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1666h22025/",
    planImage: "/photos/plans/te1666h22025.webp",
    tagline:
      "A 16 by 66 single section: two bedrooms, two baths and 951 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1666h22186",
    name: "TE1666H22186",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 880,
    sections: "single",
    widthFt: 16,
    lengthFt: 66,
    price: 125000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1666h22186/",
    planImage: "/photos/plans/te1666h22186.webp",
    tagline:
      "A 16 by 66 single section: two bedrooms, two baths and 880 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1668h22039",
    name: "TE1668H22039",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 1031,
    sections: "single",
    widthFt: 16,
    lengthFt: 68,
    price: 117000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1668h22039/",
    planImage: "/photos/plans/te1668h22039.webp",
    tagline:
      "A 16 by 68 single section: two bedrooms, two baths and 1,031 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1668h22126",
    name: "TE1668H22126",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 910,
    sections: "single",
    widthFt: 16,
    lengthFt: 68,
    price: 129000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1668h22126/",
    planImage: "/photos/plans/te1668h22126.webp",
    tagline:
      "A 16 by 68 single section: two bedrooms, two baths and 910 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1668h22177",
    name: "TE1668H22177",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 940,
    sections: "single",
    widthFt: 16,
    lengthFt: 68,
    price: 125000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1668h22177/",
    planImage: "/photos/plans/te1668h22177.webp",
    tagline:
      "A 16 by 68 single section: two bedrooms, two baths and 940 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1672h22179",
    name: "TE1672H22179",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 1068,
    sections: "single",
    widthFt: 16,
    lengthFt: 72,
    price: 131000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1672h22179/",
    planImage: "/photos/plans/te1672h22179.webp",
    tagline:
      "A 16 by 72 single section: two bedrooms, two baths and 1,068 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1676h32025",
    name: "TE1676H32025",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1100,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 138000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1676h32025/",
    planImage: "/photos/plans/te1676h32025.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,100 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1676h32039",
    name: "TE1676H32039",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1153,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 126000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1676h32039/",
    planImage: "/photos/plans/te1676h32039.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,153 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1676h32041",
    name: "TE1676H32041",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1153,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 130000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1676h32041/",
    planImage: "/photos/plans/te1676h32041.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,153 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1676h32179",
    name: "TE1676H32179",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1129,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 137000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1676h32179/",
    planImage: "/photos/plans/te1676h32179.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,129 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1676h32194",
    name: "TE1676H32194",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1153,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 133000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1676h32194/",
    planImage: "/photos/plans/te1676h32194.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,153 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1676h32207",
    name: "TE1676H32207",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1110,
    sections: "single",
    widthFt: 16,
    lengthFt: 76,
    price: 137000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1676h32207/",
    planImage: "/photos/plans/te1676h32207.webp",
    tagline:
      "A 16 by 76 single section: three bedrooms, two baths and 1,110 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1856h11024",
    name: "TE1856H11024",
    series: "Titan Extreme",
    beds: 1,
    baths: 1,
    sqft: 901,
    sections: "single",
    widthFt: 18,
    lengthFt: 56,
    price: 123000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1856h11024/",
    planImage: "/photos/plans/te1856h11024.webp",
    tagline:
      "A 18 by 56 single section: one bedroom, one bath and 901 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1864h21024",
    name: "TE1864H21024",
    series: "Titan Extreme",
    beds: 1,
    baths: 1,
    sqft: 1037,
    sections: "single",
    widthFt: 18,
    lengthFt: 64,
    price: 133000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1864h21024/",
    planImage: "/photos/plans/te1864h21024.webp",
    tagline:
      "A 18 by 64 single section: one bedroom, one bath and 1,037 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1868h22024",
    name: "TE1868H22024",
    series: "Titan Extreme",
    beds: 1,
    baths: 2,
    sqft: 1105,
    sections: "single",
    widthFt: 18,
    lengthFt: 68,
    price: 137000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1868h22024/",
    planImage: "/photos/plans/te1868h22024.webp",
    tagline:
      "A 18 by 68 single section: one bedroom, two baths and 1,105 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1868h22039",
    name: "TE1868H22039",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 1156,
    sections: "single",
    widthFt: 18,
    lengthFt: 68,
    price: 127000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1868h22039/",
    planImage: "/photos/plans/te1868h22039.webp",
    tagline:
      "A 18 by 68 single section: two bedrooms, two baths and 1,156 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1868h22177",
    name: "TE1868H22177",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 1054,
    sections: "single",
    widthFt: 18,
    lengthFt: 68,
    price: 130000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1868h22177/",
    planImage: "/photos/plans/te1868h22177.webp",
    tagline:
      "A 18 by 68 single section: two bedrooms, two baths and 1,054 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1872h11023",
    name: "TE1872H11023",
    series: "Titan Extreme",
    beds: 1,
    baths: 1,
    sqft: 1088,
    sections: "single",
    widthFt: 18,
    lengthFt: 72,
    price: 133000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1872h11023/",
    planImage: "/photos/plans/te1872h11023.webp",
    tagline:
      "A 18 by 72 single section: one bedroom, one bath and 1,088 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1876h32213",
    name: "TE1876H32039",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1292,
    sections: "single",
    widthFt: 18,
    lengthFt: 76,
    price: 139000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1876h32213/",
    planImage: "/photos/plans/te1876h32213.webp",
    tagline:
      "A 18 by 76 single section: three bedrooms, two baths and 1,292 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te1876h32194",
    name: "TE1876H32194",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1292,
    sections: "single",
    widthFt: 18,
    lengthFt: 76,
    price: 141000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te1876h32194/",
    planImage: "/photos/plans/te1876h32194.webp",
    tagline:
      "A 18 by 76 single section: three bedrooms, two baths and 1,292 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "chpr-2856h32p01",
    name: "CHPR-2856H32P01",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1493,
    sections: "double",
    widthFt: 28,
    lengthFt: 56,
    price: 119000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-2856h32p01/",
    planImage: "/photos/plans/chpr-2856h32p01.webp",
    tagline:
      "A 28 by 56 double section: three bedrooms, two baths and 1,493 square feet, priced before options.",
    scenes: scenes(
      ["living", "Dining area"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-2856h42p01",
    name: "CHPR-2856H42P01",
    series: "Prime",
    beds: 4,
    baths: 2,
    sqft: 1493,
    sections: "double",
    widthFt: 28,
    lengthFt: 56,
    price: 120000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-2856h42p01/",
    planImage: "/photos/plans/chpr-2856h42p01.webp",
    tagline:
      "A 28 by 56 double section: four bedrooms, two baths and 1,493 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-2876h53p01",
    name: "CHPR-2876H53P01",
    series: "Prime",
    beds: 5,
    baths: 3,
    sqft: 2027,
    sections: "double",
    widthFt: 28,
    lengthFt: 76,
    price: 135000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-2876h53p01/",
    planImage: "/photos/plans/chpr-2876h53p01.webp",
    tagline:
      "A 28 by 76 double section: five bedrooms, three baths and 2,027 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3252h32p03",
    name: "CHPR-3252H32P03",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1577,
    sections: "double",
    widthFt: 32,
    lengthFt: 52,
    price: 126000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3252h32p03/",
    planImage: "/photos/plans/chpr-3252h32p03.webp",
    tagline:
      "A 32 by 52 double section: three bedrooms, two baths and 1,577 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3252h32p08",
    name: "CHPR-3252H32P08",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1456,
    sections: "double",
    widthFt: 32,
    lengthFt: 52,
    price: 126000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3252h32p08/",
    planImage: "/photos/plans/chpr-3252h32p08.webp",
    tagline:
      "A 32 by 52 double section: three bedrooms, two baths and 1,456 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3256h42p03",
    name: "CHPR-3256H42P03",
    series: "Prime",
    beds: 4,
    baths: 2,
    sqft: 1700,
    sections: "double",
    widthFt: 32,
    lengthFt: 56,
    price: 130000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3256h42p03/",
    planImage: "/photos/plans/chpr-3256h42p03.webp",
    tagline:
      "A 32 by 56 double section: four bedrooms, two baths and 1,700 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3260h32p03",
    name: "CHPR-3260H32P03",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1820,
    sections: "double",
    widthFt: 32,
    lengthFt: 60,
    price: 132000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3260h32p03/",
    planImage: "/photos/plans/chpr-3260h32p03.webp",
    tagline:
      "A 32 by 60 double section: three bedrooms, two baths and 1,820 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3260h32p08",
    name: "CHPR-3260H32P08",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1699,
    sections: "double",
    widthFt: 32,
    lengthFt: 60,
    price: 132000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3260h32p08/",
    planImage: "/photos/plans/chpr-3260h32p08.webp",
    tagline:
      "A 32 by 60 double section: three bedrooms, two baths and 1,699 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3260h42p03",
    name: "CHPR-3260H42P03",
    series: "Prime",
    beds: 4,
    baths: 2,
    sqft: 1820,
    sections: "double",
    widthFt: 32,
    lengthFt: 60,
    price: 132000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3260h42p03/",
    planImage: "/photos/plans/chpr-3260h42p03.webp",
    tagline:
      "A 32 by 60 double section: four bedrooms, two baths and 1,820 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3266h32p08",
    name: "CHPR-3266H32P08",
    series: "Prime",
    beds: 3,
    baths: 2,
    sqft: 1881,
    sections: "double",
    widthFt: 32,
    lengthFt: 66,
    price: 137000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3266h32p08/",
    planImage: "/photos/plans/chpr-3266h32p08.webp",
    tagline:
      "A 32 by 66 double section: three bedrooms, two baths and 1,881 square feet, priced before options.",
    scenes: scenes(
      ["living", "Dining room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3266h42p08",
    name: "CHPR-3266H42P08",
    series: "Prime",
    beds: 4,
    baths: 2,
    sqft: 1881,
    sections: "double",
    widthFt: 32,
    lengthFt: 66,
    price: 137000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3266h42p08/",
    planImage: "/photos/plans/chpr-3266h42p08.webp",
    tagline:
      "A 32 by 66 double section: four bedrooms, two baths and 1,881 square feet, priced before options.",
    scenes: scenes(
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3272h42p03",
    name: "CHPR-3272H42P03",
    series: "Prime",
    beds: 4,
    baths: 2,
    sqft: 2185,
    sections: "double",
    widthFt: 32,
    lengthFt: 72,
    price: 141000,
    status: "available",
    featured: true,
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3272h42p03/",
    planImage: "/photos/plans/chpr-3272h42p03.webp",
    tagline:
      "A 32 by 72 double section: four bedrooms, two baths and 2,185 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "chpr-3272h52p03",
    name: "CHPR-3272H52P03",
    series: "Prime",
    beds: 5,
    baths: 2,
    sqft: 2184,
    sections: "double",
    widthFt: 32,
    lengthFt: 72,
    price: 142000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/chpr-3272h52p03/",
    planImage: "/photos/plans/chpr-3272h52p03.webp",
    tagline:
      "A 32 by 72 double section: five bedrooms, two baths and 2,184 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
    ),
  },
  {
    slug: "rm2848a-2848h32054",
    name: "RM2848A-2848H32054",
    series: "Redman",
    beds: 3,
    baths: 2,
    sqft: 1280,
    sections: "double",
    widthFt: 28,
    lengthFt: 48,
    price: 130000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm2848a-2848h32054/",
    planImage: "/photos/plans/rm2848a-2848h32054.webp",
    tagline:
      "A 28 by 48 double section: three bedrooms, two baths and 1,280 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm2852a-2852h42a2a",
    name: "RM2852A-2852H42A2A",
    series: "Redman",
    beds: 4,
    baths: 2,
    sqft: 1387,
    sections: "double",
    widthFt: 28,
    lengthFt: 52,
    price: 134000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm2852a-2852h42a2a/",
    planImage: "/photos/plans/rm2852a-2852h42a2a.webp",
    tagline:
      "A 28 by 52 double section: four bedrooms, two baths and 1,387 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm2852b-2852h32a2a",
    name: "RM2852B-2852H32A2A",
    series: "Redman",
    beds: 3,
    baths: 2,
    sqft: 1387,
    sections: "double",
    widthFt: 28,
    lengthFt: 52,
    price: 134000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm2852b-2852h32a2a/",
    planImage: "/photos/plans/rm2852b-2852h32a2a.webp",
    tagline:
      "A 28 by 52 double section: three bedrooms, two baths and 1,387 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm2856b-2856h42055",
    name: "RM2856B-2856H42055",
    series: "Redman",
    beds: 4,
    baths: 2,
    sqft: 1493,
    sections: "double",
    widthFt: 28,
    lengthFt: 56,
    price: 137000,
    status: "available",
    featured: true,
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm2856b-2856h42055/",
    planImage: "/photos/plans/rm2856b-2856h42055.webp",
    tagline:
      "A 28 by 56 double section: four bedrooms, two baths and 1,493 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
      ["porch", "Deck and side entry"],
    ),
  },
  {
    slug: "rm2868a-2868h42105",
    name: "RM2868A-2868H42105",
    series: "Redman",
    beds: 4,
    baths: 2,
    sqft: 1813,
    sections: "double",
    widthFt: 28,
    lengthFt: 68,
    price: 147000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm2868a-2868h42105/",
    planImage: "/photos/plans/rm2868a-2868h42105.webp",
    tagline:
      "A 28 by 68 double section: four bedrooms, two baths and 1,813 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm3256a-3256h42055",
    name: "RM3256A-3256H42055",
    series: "Redman",
    beds: 4,
    baths: 2,
    sqft: 1699,
    sections: "double",
    widthFt: 32,
    lengthFt: 56,
    price: 141000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm3256a-3256h42055/",
    planImage: "/photos/plans/rm3256a-3256h42055.webp",
    tagline:
      "A 32 by 56 double section: four bedrooms, two baths and 1,699 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm3264a-3264h43106",
    name: "RM3264A-3264H43106",
    series: "Redman",
    beds: 4,
    baths: 3,
    sqft: 1941,
    sections: "double",
    widthFt: 32,
    lengthFt: 64,
    price: 150000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm3264a-3264h43106/",
    planImage: "/photos/plans/rm3264a-3264h43106.webp",
    tagline:
      "A 32 by 64 double section: four bedrooms, three baths and 1,941 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
      ["porch", "Deck and entry"],
    ),
  },
  {
    slug: "rm3268a-3268h42105",
    name: "RM3268A-3268H42105",
    series: "Redman",
    beds: 4,
    baths: 2,
    sqft: 2063,
    sections: "double",
    widthFt: 32,
    lengthFt: 68,
    price: 152000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm3268a-3268h42105/",
    planImage: "/photos/plans/rm3268a-3268h42105.webp",
    tagline:
      "A 32 by 68 double section: four bedrooms, two baths and 2,063 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "rm3272a-3272h42a2v",
    name: "RM3272A-3272H42A2V",
    series: "Redman",
    beds: 4,
    baths: 2,
    sqft: 2184,
    sections: "double",
    widthFt: 32,
    lengthFt: 72,
    price: 157000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/rm3272a-3272h42a2v/",
    planImage: "/photos/plans/rm3272a-3272h42a2v.webp",
    tagline:
      "A 32 by 72 double section: four bedrooms, two baths and 2,184 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te2844h22364",
    name: "TE2844H22364",
    series: "Titan Extreme",
    beds: 2,
    baths: 2,
    sqft: 1173,
    sections: "double",
    widthFt: 28,
    lengthFt: 44,
    price: 162000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te2844h22364/",
    planImage: "/photos/plans/te2844h22364.webp",
    tagline:
      "A 28 by 44 double section: two bedrooms, two baths and 1,173 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te2844h32364",
    name: "TE2844H32364",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1173,
    sections: "double",
    widthFt: 28,
    lengthFt: 44,
    price: 169000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te2844h32364/",
    planImage: "/photos/plans/te2844h32364.webp",
    tagline:
      "A 28 by 44 double section: three bedrooms, two baths and 1,173 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te2856h32a1f",
    name: "TE2856H32A1F",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1422,
    sections: "double",
    widthFt: 28,
    lengthFt: 56,
    price: 187000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te2856h32a1f/",
    planImage: "/photos/plans/te2856h32a1f.webp",
    tagline:
      "A 28 by 56 double section: three bedrooms, two baths and 1,422 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
      ["porch", "Deck and entry"],
    ),
  },
  {
    slug: "te2856n",
    name: "TE2856N",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1493,
    sections: "double",
    widthFt: 28,
    lengthFt: 56,
    price: 179000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te2856n/",
    tagline:
      "A 28 by 56 double section: three bedrooms, two baths and 1,493 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te2860h42344",
    name: "TE2860H42344",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 1600,
    sections: "double",
    widthFt: 28,
    lengthFt: 60,
    price: 189000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te2860h42344/",
    planImage: "/photos/plans/te2860h42344.webp",
    tagline:
      "A 28 by 60 double section: four bedrooms, two baths and 1,600 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te2864h42079",
    name: "TE2864H42079",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 1632,
    sections: "double",
    widthFt: 28,
    lengthFt: 64,
    price: 199000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te2864h42079/",
    planImage: "/photos/plans/te2864h42079.webp",
    tagline:
      "A 28 by 64 double section: four bedrooms, two baths and 1,632 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te2864h42331",
    name: "TE2864H42331",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1707,
    sections: "double",
    widthFt: 28,
    lengthFt: 64,
    price: 193000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te2864h42331/",
    planImage: "/photos/plans/te2864h42331.webp",
    tagline:
      "A 28 by 64 double section: three bedrooms, two baths and 1,707 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te2876h42106",
    name: "TE2876H42106",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 2027,
    sections: "double",
    widthFt: 28,
    lengthFt: 76,
    price: 201000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te2876h42106/",
    planImage: "/photos/plans/te2876h42106.webp",
    tagline:
      "A 28 by 76 double section: four bedrooms, two baths and 2,027 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3248e",
    name: "TE3248E",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1456,
    sections: "double",
    widthFt: 32,
    lengthFt: 48,
    price: 177000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3248e/",
    planImage: "/photos/plans/te3248e.webp",
    tagline:
      "A 32 by 48 double section: three bedrooms, two baths and 1,456 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3256n",
    name: "TE3256N",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1699,
    sections: "double",
    widthFt: 32,
    lengthFt: 56,
    price: 179000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3256n/",
    planImage: "/photos/plans/te3256n.webp",
    tagline:
      "A 32 by 56 double section: three bedrooms, two baths and 1,699 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3260h32083",
    name: "TE3260H32083",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1810,
    sections: "double",
    widthFt: 32,
    lengthFt: 60,
    price: 200000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3260h32083/",
    planImage: "/photos/plans/te3260h32083.webp",
    tagline:
      "A 32 by 60 double section: three bedrooms, two baths and 1,810 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3260n",
    name: "TE3260N",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 1820,
    sections: "double",
    widthFt: 32,
    lengthFt: 60,
    price: 187000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3260n/",
    planImage: "/photos/plans/te3260n.webp",
    tagline:
      "A 32 by 60 double section: four bedrooms, two baths and 1,820 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te3264r",
    name: "TE3264R",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1941,
    sections: "double",
    widthFt: 32,
    lengthFt: 64,
    price: 204000,
    status: "available",
    featured: true,
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3264r/",
    planImage: "/photos/plans/te3264r.webp",
    tagline:
      "A 32 by 64 double section: three bedrooms, two baths and 1,941 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3266a",
    name: "TE3266A",
    series: "Titan Extreme",
    beds: 3,
    baths: 2,
    sqft: 1870,
    sections: "double",
    widthFt: 32,
    lengthFt: 66,
    price: 211000,
    status: "available",
    featured: true,
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3266a/",
    planImage: "/photos/plans/te3266a.webp",
    tagline:
      "A 32 by 66 double section: three bedrooms, two baths and 1,870 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3266d",
    name: "TE3266D",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 2002,
    sections: "double",
    widthFt: 32,
    lengthFt: 66,
    price: 205000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3266d/",
    planImage: "/photos/plans/te3266d.webp",
    tagline:
      "A 32 by 66 double section: four bedrooms, two baths and 2,002 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3266h42083",
    name: "TE3266H42083",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 1992,
    sections: "double",
    widthFt: 32,
    lengthFt: 66,
    price: 212000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3266h42083/",
    planImage: "/photos/plans/te3266h42083.webp",
    tagline:
      "A 32 by 66 double section: four bedrooms, two baths and 1,992 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te3272a",
    name: "TE3272A",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 2052,
    sections: "double",
    widthFt: 32,
    lengthFt: 72,
    price: 221000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3272a/",
    planImage: "/photos/plans/te3272a.webp",
    tagline:
      "A 32 by 72 double section: four bedrooms, two baths and 2,052 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te3272c",
    name: "TE3272C",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 2184,
    sections: "double",
    widthFt: 32,
    lengthFt: 72,
    price: 220000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3272c/",
    planImage: "/photos/plans/te3272c.webp",
    tagline:
      "A 32 by 72 double section: four bedrooms, two baths and 2,184 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3272e",
    name: "TE3272E",
    series: "Titan Extreme",
    beds: 3,
    baths: 3,
    sqft: 2007,
    sections: "double",
    widthFt: 32,
    lengthFt: 72,
    price: 225000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3272e/",
    planImage: "/photos/plans/te3272e.webp",
    tagline:
      "A 32 by 72 double section: three bedrooms, three baths and 2,007 square feet, priced before options.",
    scenes: scenes(
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3276d",
    name: "TE3276D",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 2305,
    sections: "double",
    widthFt: 32,
    lengthFt: 76,
    price: 226000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3276d/",
    planImage: "/photos/plans/te3276d.webp",
    tagline:
      "A 32 by 76 double section: four bedrooms, two baths and 2,305 square feet, priced before options.",
    /* The source publishes the plan drawing for this home and no
       photographs, so the gallery is empty rather than filled with
       pictures of a different house. */
    scenes: [],
  },
  {
    slug: "te3276f",
    name: "TE3276F",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sections: "double",
    widthFt: 32,
    lengthFt: 76,
    price: 236000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3276f/",
    tagline:
      "A 32 by 76 double section: four bedrooms and two baths, priced before options. The spec sheet does not publish a square footage for this plan.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
  {
    slug: "te3276t",
    name: "TE3276T",
    series: "Titan Extreme",
    beds: 4,
    baths: 2,
    sqft: 2281,
    sections: "double",
    widthFt: 32,
    lengthFt: 76,
    price: 227000,
    status: "available",
    sourceUrl: "https://manufacturedcountryhomes.com/home/te3276t/",
    planImage: "/photos/plans/te3276t.webp",
    tagline:
      "A 32 by 76 double section: four bedrooms, two baths and 2,281 square feet, priced before options.",
    scenes: scenes(
      ["exterior", "Front elevation"],
      ["living", "Living room"],
      ["kitchen", "Kitchen"],
      ["bedroom", "Primary bedroom"],
      ["bath", "Bath"],
    ),
  },
];

/* ------------------------------------------------------------------ *
 * Accessors
 * ------------------------------------------------------------------ */

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getPlan(listing: Listing): FloorPlan | undefined {
  return listing.planId ? floorPlans[listing.planId] : undefined;
}

export function featuredListings(): Listing[] {
  return listings.filter((l) => l.featured);
}

/** Homes that share a series or a community, minus the one being viewed. */
export function relatedListings(listing: Listing, count = 3): Listing[] {
  const scored = listings
    .filter((l) => l.slug !== listing.slug)
    .map((l) => ({
      listing: l,
      score:
        (l.series && l.series === listing.series ? 3 : 0) +
        (l.communitySlug && l.communitySlug === listing.communitySlug ? 2 : 0) +
        (l.beds === listing.beds ? 1 : 0) +
        (l.sqft !== undefined && listing.sqft !== undefined && Math.abs(l.sqft - listing.sqft) < 400
          ? 1
          : 0),
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.listing);
}

export const statusLabels: Record<ListingStatus, string> = {
  available: "Available",
  pending: "Sale pending",
  sold: "Sold",
  "coming-soon": "Coming soon",
};

export const sectionLabels: Record<Sections, string> = {
  single: "Single-section",
  double: "Double-section",
  triple: "Triple-section",
};

/**
 * A series rendered as a label. The lines on this lot are named for the
 * series alone — "Prime", "Redman", "Titan Extreme" — and read as "Prime
 * Series". A line whose own name already carries that noun is left alone
 * rather than doubled into "... Collection Series".
 */
export function seriesLabel(series: string): string {
  return /\b(series|collection)$/i.test(series) ? series : `${series} Series`;
}

export const styleLabels: Record<ArchStyle, string> = {
  farmhouse: "Modern farmhouse",
  craftsman: "Craftsman",
  modern: "Modern",
  coastal: "Coastal cottage",
  lodge: "Mountain lodge",
  ranch: "Ranch",
};

/** Series present in the catalogue, so the facet list follows the data. */
export const seriesList: string[] = [
  ...new Set(listings.map((l) => l.series).filter((s): s is string => Boolean(s))),
].sort();

const priced = listings.filter((l): l is Listing & { price: number } => l.price !== undefined);

/** Whether any home carries a price at all — the price UI hides when none do. */
export const hasPrices = priced.length > 0;

export const priceBounds = {
  min: hasPrices ? Math.min(...priced.map((l) => l.price)) : 0,
  max: hasPrices ? Math.max(...priced.map((l) => l.price)) : 0,
};

/* ------------------------------------------------------------------ *
 * Size categories
 * ------------------------------------------------------------------ */

/**
 * The four buckets a buyer actually shops by — tiny, single, double, triple.
 *
 * A note on how these are decided, because it matters. The obvious approach
 * is to sort purely on square footage, and plenty of dealership sites do
 * exactly that. It produces a lie: a 1,000-square-foot double-section home
 * filed under "Single wide" is a claim about its width, and it is wrong.
 *
 * So width comes from `sections`, which is the field that actually records
 * it, and square footage is only used for the tiny bucket and as the
 * fallback for a home whose `sections` was never filled in. The footprint
 * ranges shown under each label are computed from the homes really in that
 * bucket rather than being printed from a table, so they cannot drift away
 * from the catalogue either.
 */
export type SizeCategory = "tiny" | "single" | "double" | "triple";

/** Anything under this is a tiny home whatever its section count. */
const TINY_MAX_SQFT = 800;

/* Only reached by a home with no `sections` value — see the note above. */
const SQFT_FALLBACK: [number, SizeCategory][] = [
  [TINY_MAX_SQFT, "tiny"],
  [1200, "single"],
  [2000, "double"],
];

export function sizeCategoryOf(listing: Listing): SizeCategory {
  /* A declared section count wins outright, square footage included. "Single
     wide" is a claim about width, and a dealership that files a 750 sq ft
     single section under its own single-wide category has told us where the
     home belongs — re-filing it as a tiny home because it is under 800 feet
     would be contradicting the source with arithmetic.
     Square footage only buckets a home that declares no sections, and the
     `tiny` cut lives there; a home that declares neither cannot be measured
     at all and falls to the smallest bucket rather than the largest. */
  if (listing.sections) return listing.sections;
  if (listing.sqft === undefined) return "single";
  const sqft = listing.sqft;
  const match = SQFT_FALLBACK.find(([ceiling]) => sqft < ceiling);
  return match ? match[1] : "triple";
}

export const sizeCategoryLabels: Record<SizeCategory, string> = {
  tiny: "Tiny home",
  single: "Single wide",
  double: "Double wide",
  triple: "Triple wide",
};

/* The glyph on each bucket's button. Emoji rather than drawn icons on
   purpose: there is no icon set with four house silhouettes that read as
   "wider than the last one" at 32 pixels, and these do. Swap them for an
   `Icon` if a deployment would rather not use emoji. */
export const sizeCategoryGlyphs: Record<SizeCategory, string> = {
  tiny: "🏠",
  single: "🏡",
  double: "🏘️",
  triple: "🏰",
};

export const sizeCategoryOrder: SizeCategory[] = ["tiny", "single", "double", "triple"];

export type SizeCategoryFacet = {
  id: SizeCategory;
  label: string;
  /** How many homes are in it. Zero means the button is not worth showing. */
  count: number;
  /** The real footprint range of the homes in it, e.g. "812–1,144 sq ft". */
  range?: string;
  /** The glyph on the button. */
  glyph: string;
};

/** The four buckets, measured against whatever catalogue is passed in. */
export function sizeCategoryFacets(from: Listing[] = listings): SizeCategoryFacet[] {
  return sizeCategoryOrder.map((id) => {
    const inBucket = from.filter((l) => sizeCategoryOf(l) === id);
    /* A bucket's range is drawn from the homes in it that publish a
       footprint; a home that publishes none is counted but does not widen
       the range it is not measured on. */
    const sizes = inBucket.flatMap((l) => (l.sqft === undefined ? [] : [l.sqft]));
    const low = Math.min(...sizes);
    const high = Math.max(...sizes);
    return {
      id,
      label: sizeCategoryLabels[id],
      glyph: sizeCategoryGlyphs[id],
      count: inBucket.length,
      range: sizes.length
        ? low === high
          ? `${low.toLocaleString()} sq ft`
          : `${low.toLocaleString()}–${high.toLocaleString()} sq ft`
        : undefined,
    };
  });
}
