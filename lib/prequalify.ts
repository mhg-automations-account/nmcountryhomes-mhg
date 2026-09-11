/**
 * The "Get Pre-Qualified" widget on `/financing`.
 *
 * Not to be confused with `pages.prequalify` in `lib/page-config.ts`, which
 * switches the standalone `/prequalify` route (its own in-house lead form)
 * on and off — this file is the content and embed for the separate,
 * faster-path widget that sits on the financing page itself.
 *
 * Country Homes already runs a soft-credit pre-qualification flow through
 * QualifyWizard on its own inventory site at manufacturedcountryhomes.com.
 * `embedSnippet` is that dealer's own script, copied verbatim, dealer ID
 * and all — nothing about it is guessed at. It is a soft pull: no hit to
 * the applicant's credit score, and no Social Security number required to
 * get an answer.
 *
 * With `embedSnippet` set, the widget renders directly on the page — no
 * button in front of it. Ship `embedSnippet` empty and the panel falls back
 * to a `buttonText` link pointing at `externalApplicationLink` instead,
 * opening it in a new tab. Leave both empty and the whole panel disappears —
 * see `PrequalifyPanel`.
 */
export type Prequalify = {
  headline: string;
  subtext: string;
  buttonText: string;
  /** The "No SSN required" reassurance badge above the copy. */
  showNoSSNBadge: boolean;
  /** The "always selling" explainer — one paragraph per string. */
  body: string[];
  /** The dealer's own QualifyWizard (or equivalent) embed script, unmodified. */
  embedSnippet?: string;
  /** Only read when `embedSnippet` is empty. */
  externalApplicationLink?: string;
};

export const prequalify: Prequalify = {
  headline: "Prequalified in 30 seconds or less",
  subtext: "It's a soft credit check, no impact on score!",
  buttonText: "Get Pre-Qualified",
  showNoSSNBadge: true,
  body: [
    "Pre-qualification is a quick read on what you could likely borrow, before you fill out a full loan application or sit down with anyone to talk numbers.",
    "It runs on a soft credit check, so it never touches your score, and it does not ask for a Social Security number to give you an answer.",
    "Nothing about it commits you to a home or a lender. It is a starting point, not a decision — walk away from it any time, and use the number however you want.",
  ],
  embedSnippet:
    '<script type="text/javascript" src="https://plugin.qualifywizard.com/lib/qw-plugin.js?dealerId=18491&autoInstall"></script>',
};
