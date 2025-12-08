import { c as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DTVCw4nn.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DDfbbVeb.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
/* empty css                                 */
import { p as posts } from '../chunks/posts_B5iJxnTK.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

function PostCard({ title, subtitle, text, image, link }) {
  return /* @__PURE__ */ jsxs("div", { className: "post-card", children: [
    image && /* @__PURE__ */ jsx("img", { src: image, alt: title, className: "post-image" }),
    /* @__PURE__ */ jsxs("div", { className: "post-content", children: [
      /* @__PURE__ */ jsx("h2", { className: "post-title", children: title }),
      subtitle && /* @__PURE__ */ jsx("h3", { className: "post-subtitle", children: subtitle }),
      /* @__PURE__ */ jsx("p", { className: "post-text", children: text }),
      link && /* @__PURE__ */ jsx(
        "a",
        {
          href: link,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "post-link",
          children: "Ver mais"
        }
      )
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Posts - Caio Toledo" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="posts-container"> <div style="margin-bottom: 20px; text-align: left;"> <a href="/" style="color: white; text-decoration: none; display: flex; align-items: center; gap: 8px;">
← Voltar
</a> </div> <div class="posts-list"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", PostCard, { "title": post.title, "subtitle": post.subtitle, "text": post.text, "image": post.image, "link": `/posts/${post.slug}` })}`)} </div> </div> ` })}`;
}, "/Users/caio/Desktop/projects/my-links/src/pages/posts/index.astro", void 0);

const $$file = "/Users/caio/Desktop/projects/my-links/src/pages/posts/index.astro";
const $$url = "/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
