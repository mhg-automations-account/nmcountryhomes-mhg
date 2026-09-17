/**
 * Claims the dealership makes about itself.
 *
 * Everything in here is a statement a *specific* business makes — how long
 * it has traded, who works there, what the price includes, what it warrants.
 * None of it is true of whoever deploys this template next, which is why it
 * lives in one file instead of being written into the pages.
 *
 * The rule is the same one `lib/communities.ts` and `lib/photos.ts` follow:
 * an absent value is hidden, never guessed at. Every field below is
 * optional, and every section that consumes one disappears when it is
 * missing — delete `team` and the About page has no team section; delete
 * `founded` and nothing anywhere claims a founding year. A shorter page is
 * always the correct outcome. Inventing a plausible-sounding number is not.
 *
 * What is filled in below was read off what Country Homes of New Mexico
 * already publishes about itself — the About pages at nmcountryhomes.com and
 * manufacturedcountryhomes.com, and the trust row on its own home page.
 * Everything the business does not publish has been deleted rather than
 * carried over from the template, which is why there is no founding year, no
 * sales figure, no dealer licence number, no warranty term, no transport
 * radius and no deposit schedule here. Those are all real claims, and this
 * dealership has not made any of them in public. If it makes one, add it.
 */

/** Icon keys from `components/ui.tsx`, referenced by name so this file stays free of components. */
export type PrincipleIcon = "Shield" | "Wrench" | "Truck" | "Bolt" | "Leaf" | "Plan" | "Pin";

export type TeamMember = {
  name: string;
  role: string;
  /** Year they joined. Omit if you don't know it — the card drops the line. */
  since?: string;
  /** Their published biography. Omit where the business publishes none and
      the card shows the name and the role alone. */
  body?: string;
};

export type Principle = {
  icon: PrincipleIcon;
  title: string;
  body: string;
};

export type Company = {
  /** Year the business started trading. Drives the About hero, the story and the "Years" stat. */
  founded?: number;
  /** Homes sold or set to date, written out for prose, e.g. "four thousand".
      Becomes the first line of the About headline. */
  homesSoldWords?: string;
  /** Headcount, for the team section heading. Omit and the heading loses the count. */
  teamSize?: number;
  /** Homes standing open on the lot for walkthroughs. */
  homesOpenOnLot?: number;

  /** The founding story. Both halves are required together or the section is dropped. */
  story?: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };

  /** Operating rules the business will stand behind. Shipped empty is fine. */
  principles?: Principle[];

  /** Named staff. Portraits are wired through `page/about-team-N` in `lib/photos.ts`. */
  team?: TeamMember[];
  /** One-line note under the team grid, e.g. about how nobody works on commission. */
  teamNote?: string;

  /** Dealer licence number, where the state issues one and the business
      publishes it. Shown in the trust row under the hero and nowhere else.
      Omit it rather than inventing one — an unverifiable licence number is
      the single worst field on this list to guess at. */
  licenseId?: string;
  /** Short claims for the trust row under the hero, three or four at most.
      Every one is a promise the business has to keep, so write them from what
      it already advertises and delete the rest. */
  badges?: string[];
  /** Where the business's public reviews live — a Google Business Profile, a
      Facebook page, a Better Business Bureau listing. The testimonials band
      links to it so a sceptic can check the quotes against a source we do not
      control. Omit it and the band simply does not offer the link; do not
      point it at a profile with no reviews on it. */
  reviewsUrl?: string;
  /** What to call that source in the link — "Google", "Facebook". */
  reviewsLabel?: string;
  /** The Google Place ID for this location, from the Google Business Profile.
      `lib/reviews.ts` uses it to pull live reviews through the Places API —
      see that file for the API key it needs. Omit it and the testimonials
      band shows video testimonials only, with no Google reviews mixed in. */
  googlePlaceId?: string;

  /** Structural warranty on a new home, in months. Omit to make no warranty claim. */
  warrantyMonths?: number;
  /** Transport included in the listed price, in miles from the lot. */
  transportIncludedMiles?: number;
  /** Deposit schedule for a cash purchase, as a sentence. */
  cashDepositSchedule?: string;
};

export const company: Company = {
  /* The three promises the dealership's own home page makes under its
     headline, in its words. Nothing else is claimed here. */
  badges: ["Licensed dealer", "Financing available", "Delivery included"],
  teamSize: 2,

  /* The dealership's Google Business Profile. `googlePlaceId` is what
     `lib/reviews.ts` fetches live reviews by; `reviewsUrl` is the same
     listing as a link a visitor can click through to and check the quotes
     against. */
  googlePlaceId: "ChIJMewEtKWhGIcRbj6SSJmgklY",
  reviewsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJMewEtKWhGIcRbj6SSJmgklY",
  reviewsLabel: "Google",

  story: {
    eyebrow: "About NM Country Manufactured Homes",
    heading: "Two owners with a construction background, and one lot on Central Avenue.",
    paragraphs: [
      "Country Homes of New Mexico is owned and operated by Matt Darnell and Andrew Fellows, who also helm NM Trailer Depot. Between them they bring a shared background in construction to a trade that mostly sells on payment, and they understand what quality, affordability and customer satisfaction are supposed to mean on a lot like this one.",
      "The homes on the lot at 11500 Central Avenue SE are Titan Extreme, Redman and Prime, single-section and double-section. Every one of them is priced before options, so the number on the listing is the house itself rather than the package somebody talked you into.",
      "We handle the financing conversation, the delivery and the set. If something goes wrong after the sale, we work it until it is right.",
    ],
  },

  /* What the dealership tells buyers to expect, taken from its own two About
     pages. These are promises about service, not about construction — nothing
     here claims a warranty, an inspection regime or an in-house set crew,
     because the business publishes none of those. */
  principles: [
    {
      icon: "Shield",
      title: "Quality homes",
      body: "We offer carefully selected manufactured homes built to the highest standards. Every home on the lot is priced before options, so the number you see is the house rather than the package.",
    },
    {
      icon: "Bolt",
      title: "Accessible home ownership",
      body: "We offer various financing options that are flexible and efficient, so you get access to the home you want quickly. Talk to our financing team for the details on yours.",
    },
    {
      icon: "Wrench",
      title: "Personalized customer care",
      body: "Whether you reach out or walk into the showroom, our team is here to help you find the right home — and if anything comes up after your purchase, we work diligently to resolve it.",
    },
    {
      icon: "Truck",
      title: "Always available",
      body: "Have a question? We are a phone call away and ready to help, six days a week from the lot on Central Avenue.",
    },
  ],

  /* The two owners, who publish biographies. */
  team: [
    {
      name: "Matt Darnell",
      role: "CEO / Founder / CMO",
      body: "Brings over twenty years of sales and customer service experience across diverse industries, and a Bachelor's in Business Administration with an accounting focus. Committed to making sure every client gets a personalised, positive home-buying journey.",
    },
    {
      name: "Andrew Fellows",
      role: "CEO / Founder / Head of Logistics & Install/Construction",
      body: "A GB98-licensed contractor with fifteen years as a business owner, holding a Bachelor's in Business Administration and a Master's in Hebrew Studies. His construction expertise and detail-oriented approach are what stand behind the install and the set.",
    },
  ],
};

const SMALL_NUMBERS = [
  "zero", "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve",
];

/**
 * Small counts read better spelled out in display type — "Nine people", not
 * "9 people". Anything past twelve stays a numeral, which is also the house
 * style for the catalogue.
 */
export function spellCount(n: number): string {
  return SMALL_NUMBERS[n] ?? String(n);
}

/** Years trading, or undefined when no founding year is on record. */
export function yearsTrading(now = new Date().getFullYear()): number | undefined {
  return company.founded ? now - company.founded : undefined;
}
