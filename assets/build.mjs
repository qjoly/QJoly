// Regenerates the README artwork: node assets/build.mjs
import fs from "node:fs";
import vm from "node:vm";

const PAPER = "#F4F1EA", INK = "#16161D", AMBER = "#CD6A2B", MUTED = "#16161D94", LINE = "#16161D24";
const MONO = `font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"`;
const W = 960;
const out = new URL(".", import.meta.url);

// Each renderer declares top-level functions with the same names, so each one gets its own context.
async function load(url) {
  const ctx = vm.createContext({ window: {} });
  vm.runInContext(await (await fetch(url)).text(), ctx);
  return ctx.window;
}
const { Orbitale } = await load("https://une-tasse-de-cafe.tngl.io/Orbital/orbitale.js");
const { Vacua } = await load("https://une-tasse-de-cafe.tngl.io/vacua/vacua.js");

// Renderers return a root <svg viewBox>; nest it at a given box.
const place = (svg, x, y, w, h) => svg.replace("<svg ", `<svg x="${x}" y="${y}" width="${w}" height="${h}" `);
const text = (x, y, size, body, extra = "") =>
  `<text x="${x}" y="${y}" font-size="${size}" ${MONO} ${extra.includes("fill=") ? "" : `fill="${INK}"`} ${extra}>${body}</text>`;
const write = (name, h, body) =>
  fs.writeFileSync(new URL(name, out),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="${W}" height="${h}">` +
    `<rect width="${W}" height="${h}" fill="${PAPER}"/><rect x="0.5" y="0.5" width="${W - 1}" height="${h - 1}" fill="none" stroke="${LINE}"/>` +
    body + `</svg>`);

const H = 360, cx = 190, cy = 212;
const rings = Array.from({ length: 9 }, (_, i) =>
  `<circle cx="${cx}" cy="${cy}" r="${40 + i * 22}" fill="none" stroke="${LINE}"/>`).join("");
write("header.svg", H,
  text(32, 42, 13, "QJOLY / 5×5", `font-weight="700" letter-spacing="2"`) +
  text(W - 32, 42, 12, "UNE TASSE DE CAFÉ", `fill="${MUTED}" letter-spacing="2" text-anchor="end"`) +
  `<line x1="32" y1="60" x2="${W - 32}" y2="60" stroke="${LINE}"/>` +
  `<svg x="0" y="60" width="${W}" height="${H - 60}" overflow="hidden"><g transform="translate(0,-60)">${rings}</g></svg>` +
  place(Orbitale.renderRing("QJOLY", { R: 34, color: INK, orientColor: AMBER }), cx - 125, cy - 125, 250, 250) +
  text(380, 168, 52, "QUENTIN JOLY", `font-weight="700" letter-spacing="7"`) +
  text(382, 214, 16, "Working at Lucca. Writing about Kubernetes,") +
  text(382, 240, 16, "Talos and the rest of the stack.") +
  text(382, 296, 12, "CONTAINERS · KUBERNETES · TALOS · GOLANG · PYTHON", `fill="${MUTED}" letter-spacing="2"`) +
  place(Vacua.renderWord("CAFE", { cell: 6, barW: 2.6, gap: 8, color: AMBER }), W - 32 - 160, H - 50, 160, 36));

const SH = 76;
for (const [num, label, word] of [["01", "ABOUT", "ABOUT"], ["02", "LATEST POSTS", "BLOG"], ["03", "METRICS", "STATS"]]) {
  const glyphs = Vacua.renderWord(word, { cell: 6, barW: 2.6, gap: 8, color: INK });
  const [vw, vh] = glyphs.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).slice(1).map(Number);
  const gw = (vw * 44) / vh;
  const labelEnd = 76 + label.length * 11.4 + 16;
  write(`${num}.svg`, SH,
    text(32, 44, 14, num, `font-weight="700" fill="${AMBER}"`) +
    text(76, 44, 14, label, `font-weight="700" letter-spacing="3"`) +
    `<line x1="${labelEnd}" y1="39" x2="${W - 48 - gw}" y2="39" stroke="${LINE}"/>` +
    place(glyphs, W - 32 - gw, (SH - 44) / 2, gw, 44));
}
