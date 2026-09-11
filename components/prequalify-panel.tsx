"use client";

import { useEffect, useRef, useState } from "react";
import { prequalify } from "@/lib/prequalify";
import { Badge, buttonStyles, cx, Icon } from "./ui";

/**
 * Re-creates real DOM nodes for an HTML snippet instead of using
 * `dangerouslySetInnerHTML`. The DOM spec never executes a `<script>` tag
 * that arrived via `innerHTML` — only one the browser's own parser met while
 * reading the original document. Almost every visitor reaches `/financing`
 * through the site's own nav, a client-side transition, so this component
 * mounts via React's client renderer rather than a fresh HTML parse; a
 * `dangerouslySetInnerHTML` script tag is inert on that path, which is what
 * left the QualifyWizard panel blank. Building the script element by hand in
 * an effect runs it on every mount, hydration or client navigation alike.
 */
function EmbedWidget({ html, className }: { html: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // A snippet that is nothing but a bare `<script>` tag parses into
    // `<head>`, not `<body>` — the HTML5 parser only switches into the body
    // insertion mode once it meets content that isn't itself head material.
    const parsed = new DOMParser().parseFromString(html, "text/html");
    const nodes = [...parsed.head.childNodes, ...parsed.body.childNodes];
    for (const node of nodes) {
      if (node instanceof HTMLScriptElement) {
        const script = document.createElement("script");
        for (const attr of Array.from(node.attributes)) {
          script.setAttribute(attr.name, attr.value);
        }
        script.text = node.text;
        container.appendChild(script);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    }

    return () => {
      container.replaceChildren();
    };
  }, [html]);

  return <div ref={containerRef} className={className} />;
}

/**
 * The financing page's fast-path prequalification card: reassurance copy on
 * one side, the dealer's embedded credit-check widget on the other.
 *
 * The "Get Pre-Qualified" button only toggles CSS visibility — `EmbedWidget`
 * loads the QualifyWizard script on mount, before anyone clicks, so it is
 * already running underneath by the time the panel is revealed.
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
          <EmbedWidget
            html={prequalify.embedSnippet!}
            className={cx("min-h-[34rem] w-full p-1", !open && "hidden")}
          />
        )}
      </div>
    </div>
  );
}
