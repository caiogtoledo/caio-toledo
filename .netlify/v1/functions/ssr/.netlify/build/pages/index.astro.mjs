import { c as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DTVCw4nn.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DDfbbVeb.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function Header() {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: "/glasses.png",
      className: "header-pic"
    }
  );
}

function Profile() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "https://avatars.githubusercontent.com/u/63592244?s=400&u=4838eef867080d58bb9281573b66ee3fce7ab338&v=4",
        className: "profile-picture",
        alt: "Foto de perfil"
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { children: "Caio Toledo" })
  ] });
}

function LinkCard({ logo, linkName, link }) {
  const isInternal = link.startsWith("/");
  const content = /* @__PURE__ */ jsxs("div", { className: "link-card", children: [
    logo && /* @__PURE__ */ jsx("img", { src: logo, alt: linkName }),
    /* @__PURE__ */ jsx("div", { className: "link-name", children: linkName })
  ] });
  if (isInternal) {
    return /* @__PURE__ */ jsx("a", { href: link, children: content });
  }
  return /* @__PURE__ */ jsx("a", { href: link, target: "_blank", rel: "noopener noreferrer", children: content });
}

function Cards({ links }) {
  return /* @__PURE__ */ jsx("div", { className: "list-cards", children: links.map(
    (item) => /* @__PURE__ */ jsx(
      LinkCard,
      {
        link: item.link,
        logo: item.logo,
        linkName: item.linkName
      }
    )
  ) });
}

const links = [
    {
        link: "/posts",
        logo: "/posts.png",
        linkName: "Meus Posts",
    },
    {
        link: "https://www.youtube.com/@caiotoledodev",
        logo: "/youtube.png",
        linkName: "YouTube",
    },
    {
        link: "https://github.com/caiogtoledo",
        logo: "/github.png",
        linkName: "GitHub",
    },
    {
        link: "https://www.linkedin.com/in/caio-toledo",
        logo: "/linkedin.png",
        linkName: "LinkedIn",
    },
    {
        link: "https://www.instagram.com/caiotoledo.dev/",
        logo: "/instagram.png",
        linkName: "Instagram",
    },
    {
        link: "https://x.com/caiogtoledo",
        logo: "/x.png",
        linkName: "X",
    }
];

function Footer() {
  return /* @__PURE__ */ jsx("p", { className: "read-the-docs", children: "Desenvolvido por: Caio Toledo" });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Caio Toledo" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="link-tree"> ${renderComponent($$result2, "Header", Header, {})} ${renderComponent($$result2, "Profile", Profile, {})} ${renderComponent($$result2, "Cards", Cards, { "links": links })} ${renderComponent($$result2, "Footer", Footer, {})} </div> ` })}`;
}, "/Users/caio/Desktop/projects/my-links/src/pages/index.astro", void 0);

const $$file = "/Users/caio/Desktop/projects/my-links/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
