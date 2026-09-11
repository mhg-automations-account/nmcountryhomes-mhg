import { Scene } from "./artwork/scene";
import { Reveal } from "./reveal";
import { ButtonLink, cx, Icon, Section, SectionHeading } from "./ui";
import type { TeamMember } from "@/lib/company";
import { photos } from "@/lib/photos";

const KINDS = ["living", "porch", "kitchen", "bedroom"] as const;

/**
 * The introduction band on the landing page: the people a visitor will
 * actually see a photograph of, then a link to the rest on `/about`.
 *
 * It renders whoever is in `company.team` and nothing else — no stock
 * portraits, no invented roles. A dealership that lists no staff turns
 * `sections.meetTeam` off, or simply leaves `team` empty, and the band
 * disappears. Portraits come from `page/about-team-N` in `lib/photos.ts`,
 * keyed by that person's position in `company.team`; someone with no
 * portrait there is left for the full roster on `/about` (which shows
 * everyone, photograph or not) rather than filling this band with an
 * empty plate. The grid's column count matches how many are actually
 * shown, so two people don't leave a dead column where a third would go.
 */
export function MeetTeam({
  index,
  team,
  note,
}: {
  index: string;
  team: TeamMember[];
  note?: string;
}) {
  const withPhoto = team
    .map((member, i) => ({ member, photoKey: `page/about-team-${i + 1}` }))
    .filter(({ photoKey }) => photoKey in photos);
  const shown = withPhoto.slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <Section id="meet-team">
      <Reveal>
        <SectionHeading
          index={index}
          eyebrow="Who you'll actually meet"
          title={
            <>
              The people who
              <br />
              answer the phone.
            </>
          }
          lede={note}
          action={
            team.length > shown.length ? (
              <ButtonLink href="/about" variant="outline">
                Meet everyone
                <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </ButtonLink>
            ) : undefined
          }
        />
      </Reveal>

      <div
        className={cx(
          "mt-14 grid gap-px overflow-hidden rounded-2xl bg-line",
          shown.length === 1
            ? "sm:grid-cols-1"
            : shown.length === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-3",
        )}
      >
        {shown.map(({ member, photoKey }, i) => (
          <Reveal key={member.name} delay={i * 90} className="bg-paper">
            <div className="flex h-full flex-col">
              <div className="grain relative aspect-[4/5] overflow-hidden bg-surface-2">
                <Scene
                  kind={KINDS[i % KINDS.length]}
                  photoKey={photoKey}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  label={member.name}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  {member.since && (
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/65">
                      Since {member.since}
                    </p>
                  )}
                  <p className="mt-1 font-display text-xl tracking-tight text-white">
                    {member.name}
                  </p>
                  <p className="text-sm text-white/75">{member.role}</p>
                </div>
              </div>
              <p className="flex-1 p-6 text-[0.95rem] leading-relaxed text-muted">{member.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
