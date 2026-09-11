"use client";

import { useState } from "react";
import { prequalify } from "@/lib/prequalify";
import { Badge, buttonStyles, cx, Icon } from "./ui";

/**
 * The financing page's fast-path prequalification card: reassurance copy on
 * one side, the dealer's embedded credit-check widget on the other.
 *
 * `embedSnippet` is rendered verbatim, unconditionally, from the page's
 * first paint — QualifyWizard's `autoInstall` script does its own DOM work,
 * and browsers silently ignore that kind of work when the script was
 * inserted after the fact by client-side JS (a click handler, `next/script`)
 * rather than parsed as part of the page's original HTML. Loading it only
 * after a click, into an empty div, is what left the panel blank. The
 * "Get Pre-Qualified" button below only toggles CSS visibility: the widget
 * has already loaded underneath it by the time anyone clicks.
 *
 * Renders nothing if neither an embed nor a fallback link is configured in
 * `lib/prequalify.ts`.
 */
export function PrequalifyPanel({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const hasEmbed = !!prequalify.embedSnippet;
  const hasLink = !!prequalify.externalApplicationLink;

  if (!hasEmbed && !hasLink) return null;

  return (
    <div className={cx("grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16", className)}>
      <div>
        {prequalify.showNoSSNBadge && (
          <Badge tone="moss" className="mb-5">
            <Icon.Shield className="size-3.5" />
            No SSN required
          </Badge>
        )}
        <div className="grid gap-4 text-[0.98rem] leading-relaxed text-muted">
          {prequalify.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-card border border-line bg-paper">
        <div className={cx("flex flex-col items-center gap-5 p-8 text-center sm:p-10", open && "hidden")}>
          <span className="grid size-14 place-items-center rounded-full bg-surface-2 text-ember">
            <Icon.Shield className="size-6" />
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Soft check only — answering these questions will not affect your credit score.
          </p>
          {hasEmbed ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cx(buttonStyles.primary, "!px-7 !py-4 !text-base")}
            >
              {prequalify.buttonText}
              <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          ) : (
            <a
              href={prequalify.externalApplicationLink}
              target="_blank"
              rel="noopener"
              className={cx(buttonStyles.primary, "!px-7 !py-4 !text-base")}
            >
              {prequalify.buttonText}
              <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          )}
        </div>
        {hasEmbed && (
          <div
            className={cx("min-h-[34rem] w-full p-1", !open && "hidden")}
            dangerouslySetInnerHTML={{ __html: prequalify.embedSnippet! }}
          />
        )}
      </div>
    </div>
  );
}
