import { c as createComponent, d as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, f as addAttribute } from '../../chunks/astro/server_DTVCw4nn.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_DDfbbVeb.mjs';
import { p as posts } from '../../chunks/posts_B5iJxnTK.mjs';
/* empty css                                     */
import { marked } from 'marked';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return Astro2.redirect("/404");
  }
  const contentHtml = marked.parse(post.content);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.title} - Caio Toledo` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="posts-container"> <div style="margin-bottom: 20px; text-align: left;"> <a href="/posts" style="color: white; text-decoration: none; display: flex; align-items: center; gap: 8px;">
← Voltar para Posts
</a> </div> <article class="post-content" style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 12px;"> ${post.image && renderTemplate`<img${addAttribute(post.image, "src")}${addAttribute(post.title, "alt")} style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 2rem;">`} <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${post.title}</h1> <h2 style="font-size: 1.5rem; color: #ccc; margin-bottom: 2rem;">${post.subtitle}</h2> <div class="markdown-content" style="font-size: 1.1rem; line-height: 1.6;">${unescapeHTML(contentHtml)}</div> ${post.externalLink && renderTemplate`<div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);"> <a${addAttribute(post.externalLink, "href")} target="_blank" rel="noopener noreferrer" style="display: inline-block; background: white; color: black; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold;">
Ver conteúdo original ↗
</a> </div>`} </article> </div> ` })}`;
}, "/Users/caio/Desktop/projects/my-links/src/pages/posts/[slug].astro", void 0);

const $$file = "/Users/caio/Desktop/projects/my-links/src/pages/posts/[slug].astro";
const $$url = "/posts/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
