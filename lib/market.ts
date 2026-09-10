/**
 * Facts that are true of this dealership's market and nowhere else.
 *
 * The editorial pages argue a case about manufactured housing that holds in
 * any state — the HUD Code, the chattel-versus-mortgage gap, how titling
 * works. But the moment copy names a county, a wind zone or a state statute,
 * it stops being portable, and shipping one market's answer to another
 * dealership is worse than saying nothing: it is confidently wrong.
 *
 * It is also the cheapest way to stop two sites built from this template
 * reading identically. A page that knows the buyer's wind zone and their
 * state's real-property conversion is both unique and more useful than the
 * generic version of itself.
 *
 * Same contract as `lib/company.ts`: every field is optional, and the copy
 * that reads one falls back to a portable sentence when it is absent. Fill
 * in what you can verify for the market; leave the rest out.
 */
export type Market = {
  /** Counties the dealership actually sells into, for USDA and permitting copy. */
  /** What people here call the area — "East Tennessee", "Central Maine".
      Used in the headline. Absent, the headline says the state instead. */
  regionName?: string;
  countiesServed?: string[];
  /**
   * HUD wind zone for the market — I inland, II and III coastal and
   * hurricane-prone. Decides what the home must be engineered to.
   */
  windZone?: "I" | "II" | "III";
  /** HUD thermal zone, 1–3, which sets the insulation requirement. */
  thermalZone?: 1 | 2 | 3;
  /**
   * How this state converts a manufactured home to real property, in one
   * sentence — the affidavit or certificate, and where it is filed. This
   * varies enough between states that a generic answer is useless.
   */
  realPropertyConversion?: string;
  /** Anything locally specific about USDA eligibility worth telling a buyer. */
  usdaNote?: string;
  /** Frost depth in inches, which drives footing depth on owned land. */
  frostDepthInches?: number;
};

export const market: Market = {
  regionName: "Central New Mexico",
  /* The counties containing the towns the dealership lists as its service
     area — Albuquerque, Rio Rancho, Corrales, Placitas and Algodones; Los
     Lunas, Bosque Farms and Peralta; Tijeras, Cedar Crest, Sandia Park,
     Sedillo, Chilili and Escobosa; Edgewood and Golden. */
  countiesServed: ["Bernalillo", "Sandoval", "Valencia", "Santa Fe"],
  /* New Mexico is Wind Zone I everywhere and Thermal Zone 2 under the HUD
     Code, so a home built for this market is engineered to the inland wind
     standard and the middle insulation requirement. */
  windZone: "I",
  thermalZone: 2,
  realPropertyConversion:
    "New Mexico does not record an affidavit — it retires the paperwork instead. MVD deactivates the manufactured home's title once every lien on it has been released and the county assessor certifies that the home will be taxed as real property from then on, and after that the house is part of the land it stands on.",
  usdaNote:
    "USDA Rural Development draws its line around the Albuquerque urbanized area rather than around the county, so ground in Valencia, Torrance and eastern Sandoval can qualify while a parcel a few miles closer in does not. Check the eligibility map against the actual parcel before you assume either way, and note that it applies to land you own rather than a leased pad.",
};

/** "Blount, Knox and Loudon" — for prose that lists the service area. */
export function countyList(): string | undefined {
  const c = market.countiesServed;
  if (!c || c.length === 0) return undefined;
  if (c.length === 1) return c[0];
  return `${c.slice(0, -1).join(", ")} and ${c[c.length - 1]}`;
}
