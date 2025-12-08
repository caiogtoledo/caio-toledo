import { c as createComponent, d as createAstro, f as addAttribute, j as renderHead, k as renderSlot, r as renderTemplate } from './astro/server_DTVCw4nn.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Caio Toledo - Developer & Content Creator"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"><meta name="google-adsense-account" content="ca-pub-7889495393756954"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/caio/Desktop/projects/my-links/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
