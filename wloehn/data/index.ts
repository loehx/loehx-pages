import {
  AssetEntry,
  contentful as cf,
  Entry,
  GetEntryOptions,
} from "../../core/data";
import config from "../config.json";

export { GetEntryOptions, Entry };

export interface PageEntry extends Entry {
  name: string;
  slug: string;
  title: string;
  teaserTitle: string;
  ogtitle: string;
  ogdescription: string;
  ogimage: AssetEntry;
  contents: Array<Entry>;
}

export interface ConfigEntry extends Entry {
  name: string;
  author: string;
  favicon: AssetEntry;
}

export const contentful = cf(config.contentful) as {
  getEntry: <T extends Entry>(
    id: string,
    options?: GetEntryOptions
  ) => Promise<T>;
  getEntriesByType: <T extends Entry>(
    typeName: string,
    options?: GetEntryOptions
  ) => Promise<T[]>;
  getEntryBySlug: <T extends Entry>(
    slug: string,
    options?: GetEntryOptions
  ) => Promise<T>;
};
