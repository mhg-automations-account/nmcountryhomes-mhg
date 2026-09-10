/**
 * Import the catalogue from NM Country Manufactured Homes' own site.
 *
 *   node scripts/import-nmch.mjs sheets [offset] [slug,slug]  # contact sheets
 *   node scripts/import-nmch.mjs singles                      # one sheet for the
 *                                                              one-photo homes
 *   node scripts/import-nmch.mjs photos                       # download + resize
 *   node scripts/import-nmch.mjs plans                        # the plan drawings
 *
 * The dealership runs two sites: nmcountryhomes.com carries the brand and the
 * contact details but no inventory, and manufacturedcountryhomes.com carries
 * all ninety homes, filed under six category pages (single/double × Titan
 * Extreme/Redman/Prime). `scripts/nmch-catalogue.json` is the scrape of the
 * second: for each home its model code, price before options, beds, baths,
 * square footage, series, section count and gallery URLs, plus the page it was
 * read from.
 *
 * What the source does NOT carry, and this script therefore never invents:
 * prose descriptions, feature lists, floor-plan geometry, HERS indices, build
 * years, warranty terms, community placements, or which room each photograph
 * shows. The last of those is what the contact sheets are for — a person tags
 * the scenes by eye into `scripts/nmch-selection.json` and `photos` downloads
 * exactly those.
 *
 * Widths and lengths are derived from the manufacturer's model code, which
 * encodes them (CHPR-1466H32P01 is a 14 × 66), and every one was checked
 * against both the published square footage and the single/double category
 * the home is filed under before being written down.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT_PHOTOS = "public/photos/homes";
const OUT_SHEETS = ".cache/sheets";

const catalogue = JSON.parse(
  await readFile(new URL("./nmch-catalogue.json", import.meta.url), "utf8"),
);

/** Which gallery image fills each scene, per home. Indices are into that
 *  home's ordered `gallery`, read off the contact sheets by eye. */
const SELECTION = existsSync(new URL("./nmch-selection.json", import.meta.url))
  ? JSON.parse(await readFile(new URL("./nmch-selection.json", import.meta.url), "utf8"))
  : {};

const byslug = (slug) => catalogue.find((h) => h.slug === slug);

const CACHE = ".cache/nmch-src";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch an original once and keep it, so a second run costs nothing.
 *
 * Two things this has to work around. WordPress's sized derivatives are not
 * predictable here — the heights vary per image — so it always asks for the
 * full file. And the host puts a "verifying your request" interstitial in
 * front of anything that looks automated, answering with HTML and a 200; that
 * is what the content-type check catches, and backing off clears it.
 */
async function fetchBuf(url, tries = 5) {
  await mkdir(CACHE, { recursive: true });
  const file = path.join(CACHE, url.split("/").slice(-2).join("_"));
  if (existsSync(file)) return readFile(file);
  let last;
  for (let i = 0; i < tries; i++) {
    if (i) await sleep(1000 * 2 ** i);
    const res = await fetch(url, {
      headers: { "user-agent": UA, referer: "https://manufacturedcountryhomes.com/available-homes/" },
    });
    if (!res.ok) { last = `${res.status}`; continue; }
    const type = res.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) { last = `${type} (challenge page)`; continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(file, buf);
    return buf;
  }
  throw new Error(`${last} after ${tries} tries: ${url}`);
}

function label(text, w, h, size = 30) {
  return Buffer.from(
    `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${
      12 + text.length * size * 0.62
    }" height="${size + 16}" fill="#000d"/>` +
      `<text x="8" y="${size + 2}" font-family="monospace" font-size="${size}" fill="#fff">${text}</text></svg>`,
  );
}

async function tile(url, text, cw, ch) {
  return sharp(await fetchBuf(url))
    .resize(cw, ch, { fit: "cover" })
    .composite([{ input: label(text, cw, ch), top: 0, left: 0 }])
    .toBuffer();
}

async function grid(tiles, cw, ch, cols, out) {
  const rows = Math.ceil(tiles.length / cols);
  await sharp({
    create: { width: cw * cols, height: ch * rows, channels: 3, background: "#111" },
  })
    .composite(
      tiles.map((input, i) => ({
        input,
        top: Math.floor(i / cols) * ch,
        left: (i % cols) * cw,
      })),
    )
    .jpeg({ quality: 80 })
    .toFile(out);
}

/** A numbered 4-wide contact sheet per home, so scenes can be tagged by eye. */
async function sheets(offset = 0, only = null) {
  await mkdir(OUT_SHEETS, { recursive: true });
  for (const home of catalogue) {
    if (only && !only.includes(home.slug)) continue;
    const take = home.gallery.slice(offset, offset + 12);
    if (take.length === 0) continue;
    const tiles = [];
    for (const [i, url] of take.entries()) {
      tiles.push(await tile(url, String(i + offset).padStart(2, "0"), 400, 284));
    }
    await grid(tiles, 400, 284, 4, path.join(OUT_SHEETS, `${home.slug}${offset ? `-${offset}` : ""}.jpg`));
    console.log(`sheet ${home.slug} (${take.length} from ${offset})`);
  }
}

/** Homes with a single photograph, sixteen to a sheet and captioned with the
 *  slug, so the whole tail can be tagged in a handful of looks. */
async function singles(page = 0, per = 16) {
  await mkdir(OUT_SHEETS, { recursive: true });
  const ones = catalogue.filter((h) => h.gallery.length === 1);
  const take = ones.slice(page * per, page * per + per);
  if (take.length === 0) return console.log("no more");
  const tiles = [];
  for (const h of take) tiles.push(await tile(h.gallery[0], h.name, 400, 284, 22));
  await grid(tiles, 400, 284, 4, path.join(OUT_SHEETS, `_singles-${page}.jpg`));
  console.log(`singles sheet ${page}: ${take.map((h) => h.slug).join(", ")}`);
}

/** Download each home's manufacturer floor-plan drawing.
 *
 *  These are line art rather than photographs, so they are kept wider and
 *  written as lossless webp — a lossy pass smears the dimension strings that
 *  are the only reason to look at the drawing at all. */
async function plans() {
  const dir = "public/photos/plans";
  await mkdir(dir, { recursive: true });
  let n = 0;
  for (const home of catalogue) {
    if (!home.planImage) continue;
    const out = path.join(dir, `${home.slug}.webp`);
    if (!existsSync(out)) {
      await sharp(await fetchBuf(home.planImage))
        .resize(2000, null, { withoutEnlargement: true })
        .webp({ quality: 90, effort: 5 })
        .toFile(out);
    }
    n++;
  }
  console.log(`${n} floor-plan drawings in ${dir}`);
}

/** Download the selected scenes and write them at web size. */
async function photos() {
  const manifest = {};
  let n = 0;
  for (const [slug, scenes] of Object.entries(SELECTION)) {
    const home = byslug(slug);
    if (!home) throw new Error(`unknown home ${slug}`);
    const dir = path.join(OUT_PHOTOS, slug);
    await mkdir(dir, { recursive: true });
    for (const [kind, index] of Object.entries(scenes)) {
      const src = home.gallery[index];
      if (!src) throw new Error(`${slug}: no gallery image ${index}`);
      const out = path.join(dir, `${kind}.webp`);
      if (!existsSync(out)) {
        await sharp(await fetchBuf(src))
          .resize(1500, null, { withoutEnlargement: true })
          .webp({ quality: 72 })
          .toFile(out);
      }
      manifest[`${slug}/${kind}`] = `/${path.relative("public", out).split(path.sep).join("/")}`;
      n++;
    }
    console.log(`photos ${slug} (${Object.keys(scenes).length})`);
  }
  await mkdir(".cache", { recursive: true });
  await writeFile(".cache/nmch-photo-manifest.json", JSON.stringify(manifest, null, 2));
  console.log(`\n${n} photographs; manifest at .cache/nmch-photo-manifest.json`);
}

const cmd = process.argv[2];
if (cmd === "sheets") await sheets(Number(process.argv[3] ?? 0), process.argv[4]?.split(","));
else if (cmd === "singles") await singles(Number(process.argv[3] ?? 0));
else if (cmd === "photos") await photos();
else if (cmd === "plans") await plans();
else console.log("usage: node scripts/import-nmch.mjs sheets|singles|photos|plans");
