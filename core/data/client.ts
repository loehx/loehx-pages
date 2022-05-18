import * as cf from "contentful";
import { Entry } from "./";
import { mapEntry } from "./mapping";

export interface ContentfulConfig {
  space: string;
  environment: string;
  accessToken: string;
  previewAccessToken?: string;
  usePreview?: boolean;
}

export default (config: ContentfulConfig) => {
  const client = cf.createClient({
    accessToken: config.accessToken,
    space: config.space,
    environment: config.environment,
    removeUnresolved: true,
    ...(config.usePreview && {
      accessToken: config.previewAccessToken,
      host: "preview.contentful.com",
    }),
  });

  const DEFAULT_OPTIONS = {
    include: 10,
  };

  async function getEntry<T extends Entry>(
    id: string,
    options: any
  ): Promise<T> {
    const res = await client.getEntry(id, { ...DEFAULT_OPTIONS, ...options });
    return mapEntry<T>(res);
  }

  async function getEntries<T extends Entry>(query?: any): Promise<T[]> {
    const res = await client.getEntries({ ...DEFAULT_OPTIONS, ...query });
    return res.items.map<T>((item) => mapEntry<T>(item));
  }

  return {
    getEntry,
    getEntries,
  };
};
