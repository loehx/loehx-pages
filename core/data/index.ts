import { memoize } from "../utils/async";
import client from "./client";
import { ContentfulConfig } from "./client";

export interface Entry {
  id: string;
  type: string;
  [k: string]: any;
}

export interface AssetEntry extends Entry {
  name: string;
  url: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface GetEntryOptions {
  include?: number;
}

export const contentful = (config: ContentfulConfig) => {
  const cf = client(config);

  async function getEntry<T extends Entry>(
    id: string,
    options?: GetEntryOptions
  ): Promise<T> {
    const result = await cf.getEntry<T>(id, options);
    return result;
  }

  async function getEntriesByType<T extends Entry>(
    typeName: string,
    options?: GetEntryOptions
  ): Promise<T[]> {
    const result = await cf.getEntries<T>({
      "sys.contentType.sys.id": typeName,
      include: options?.include,
    });
    return result;
  }

  async function getEntryBySlug<T extends Entry>(
    slug: string,
    options?: GetEntryOptions
  ): Promise<T> {
    if (slug[0] === "/") slug = slug.substring(1);
    const result = await cf.getEntries<T>({
      content_type: "page",
      "fields.slug[in]": `${slug},/${slug}`,
      limit: 1,
      include: options?.include,
    });
    return result[0];
  }

  return {
    getEntry: memoize(getEntry),
    getEntriesByType: memoize(getEntriesByType),
    getEntryBySlug: memoize(getEntryBySlug),
  };
};
