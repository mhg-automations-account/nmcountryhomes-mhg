/**
 * Business identity.
 *
 * Country Homes of New Mexico is a real manufactured-home dealership on
 * Central Avenue in Albuquerque, trading as NM Country Manufactured Homes.
 * Every value below was read from what the business already publishes — its
 * own sites at nmcountryhomes.com and manufacturedcountryhomes.com — and
 * nothing here is inferred. The telephone number dials and the address is
 * the lot.
 */
export const site = {
  name: "Country Homes of New Mexico",
  short: "Country Homes",
  tagline: "We turn your land into home sweet home",
  description:
    "Manufactured homes in Albuquerque, New Mexico. Ninety single- and double-section homes on the lot from Titan Extreme, Redman and Prime — walk them, price them, and we handle financing, delivery and setup.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nmcountryhomes.com",
  phone: "(505) 908-8856",
  phoneHref: "tel:+15059088856",
  email: "info@manufacturedcountryhomes.com",
  address: {
    street: "11500 Central Ave SE",
    city: "Albuquerque",
    region: "NM",
    postalCode: "87123",
    country: "US",
  },
  hours: "Mon–Fri, 9am–5pm · Sat, 10am–4pm · Sunday closed",
  /**
   * The same opening hours, day by day, for the table on `/address` and the
   * landing page's location band. It has to agree with `hours` above — the
   * two are the same fact written twice, and a visitor who finds them
   * disagreeing will believe neither.
   *
   * Delete this and both places fall back to the one-line `hours`, which is
   * a perfectly good answer for a lot that keeps the same hours all week.
   */
  hoursByDay: [
    { day: "Monday", hours: "9:00 AM – 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 5:00 PM" },
    { day: "Friday", hours: "9:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ] as { day: string; hours: string }[] | undefined,
} as const;
