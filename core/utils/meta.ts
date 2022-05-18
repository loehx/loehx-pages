import { AssetEntry } from "../data";
import { MetaInfo } from "vue-meta";

export interface GenerateHeadOptions {
  title: string;
  description?: string;
  faviconSrc?: string;
  author?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: AssetEntry;
  };
  custom?: MetaInfo;
}

export function generateMeta(options: GenerateHeadOptions): MetaInfo {
  const head = {
    title: options.title,
    meta: [],
    link: [],
  } as MetaInfo;

  if (options.description) {
    head.meta?.push({ name: "description", content: options.description });
  }

  if (options.author) {
    head.meta?.push({ name: "author", content: options.author });
  }

  head.meta?.push({
    name: "og:title",
    content: options.openGraph?.title ?? options.title,
  });

  if (options.openGraph?.description || options.description) {
    head.meta?.push({
      name: "og:description",
      content: options.openGraph?.description || options.description || "",
    });
  }

  if (options.openGraph?.image) {
    head.meta?.push({
      name: "og:image",
      content: `https:${options.openGraph?.image.url}?fm=webp&w=1200&h=630`,
    });
  }

  if (options.faviconSrc) {
    head.link?.push({
      rel: "shortcut icon",
      href: options.faviconSrc,
    });
  }

  if (options.custom) {
    const { link, meta, ...other } = options.custom;
    if (meta) head.meta?.push(...meta);
    if (link) head.link?.push(...link);
    Object.assign(head, other);
  }

  head.__dangerouslyDisableSanitizers = ["meta", "link"];
  return head;
}
