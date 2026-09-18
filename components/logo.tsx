import Image from "next/image";
import { cx } from "./ui";
import logo from "@/public/logo.png";

/**
 * The logo artwork is black on a white plate with no transparency, so it
 * carries its own white backing rather than inheriting `currentColor` the
 * way the old inline SVG did. That reads seamlessly against the paper-white
 * header in light mode; the rounded white card keeps it legible once the
 * page (and the header background with it) goes dark.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center rounded-md bg-white p-1", className)}>
      <Image src={logo} alt="Country Homes" className="h-9 w-auto sm:h-10" priority />
    </span>
  );
}
