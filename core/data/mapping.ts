import { AssetEntry, Entry } from "./";
import { Entry as _Entry } from "contentful";

const getKeys = Object.keys as <T extends any>(obj: T) => Array<string>;

function getValue(value: any, level: number): any {
  if (Array.isArray(value)) {
    return value.map((v) => getValue(v, level + 1));
  }
  if (value && value.sys) {
    return mapEntry(value, level + 1);
  }
  return value;
}

export function mapEntry<T extends Entry>(
  entry: _Entry<unknown>,
  level = 0
): T {
  if (level > 10) return { error: "CIRCULAR_STRUCTURE" } as unknown as T;
  if (entry.sys.type === "Asset") return mapAsset(entry) as unknown as T;

  const result: Entry = {
    id: entry.sys.id,
    type: entry.sys.contentType?.sys.id || entry.sys.type || "[unknown]",
  };

  for (const fieldName of getKeys(entry.fields)) {
    result[fieldName] = getValue(
      (<Record<string, any>>entry.fields)[fieldName],
      level
    );
  }

  switch (result.type) {
    case "page":
      if (result.slug && result.slug[0] !== "/") {
        result.slug = "/" + result.slug;
      }
      break;
  }

  return result as T;
}
function mapAsset(entry: _Entry<any>): AssetEntry | null {
  const fields = entry.fields as any;
  if (!fields.file) return null;
  return {
    id: entry.sys.id,
    type: "asset",
    name: fields.title,
    ...(fields.description && { description: fields.description }),
    url: fields.file?.url || null,
    ...(fields.file?.details?.image || {}),
  };
}
