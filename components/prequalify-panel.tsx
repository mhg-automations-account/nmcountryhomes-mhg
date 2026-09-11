"use client";

import { useState } from "react";
import Script from "next/script";
import { prequalify } from "@/lib/prequalify";
import { Badge, buttonStyles, cx, Icon } from "./ui";

/** Pull the `src` out of a copy-pasted `<script>` snippet so it can be
    handed to `next/script`, which needs the URL rather than raw markup. */
function scriptSrc(snippet: string): string | null {
  return snippet.match(/<script[^>]*\ssrc=["']([^"']+)["']/i)?.[1] ?? null;
}

/**
 * The financing page's fast-path prequalification card: reassurance copy on
 * one side, a button that reveals the dealer's embedded credit-check widget
 * on the other. Renders nothing if neither an embed nor a fallback link is
 * configured in `lib/prequalify.ts`.
 */
export function PrequalifyPanel({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const embedSrc = prequalify.embedSnippet ? scriptSrc(prequalify.embedSnippet) : null;
  const hasEmbed = !!embedSrc;
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
        {!open ? (
          <div className="flex flex-col items-center gap-5 p-8 text-center sm:p-10">
            <span className="grid size-14 place-items-center rounded-full bg-surface-2 text-ember">
              <Icon.Shield className="size-6" />
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Soft check only — answering these questions will not affect your credit score.
            </p>
            <button
              type="button"
              onClick={() =>
                hasEmbed
                  ? setOpen(true)
                  : window.open(prequalify.externalApplicationLink, "_blank", "noopener")
              }
              className={cx(buttonStyles.primary, "!px-7 !py-4 !text-base")}
            >
              {prequalify.buttonText}
              <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        ) : (
          <div className="min-h-[34rem] w-full p-1">
            {embedSrc && <Script src={embedSrc} strategy="lazyOnload" />}
          </div>
        )}
      </div>
    </div>
  );
}
