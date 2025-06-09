/**
 * Utility functions for SVG processing
 */

export const isSvgContent = (content: string): boolean => {
  return content.trim().startsWith("<svg");
};

export const isValidUri = (uri: string): boolean => {
  try {
    new URL(uri);
    return true;
  } catch {
    return false;
  }
};

export const processSvgAttributes = (
  svgContent: string,
  attributes: Record<string, string>
): string => {
  let processed = svgContent;

  Object.entries(attributes).forEach(([key, value]) => {
    const regex = new RegExp(`${key}="[^"]*"`, "g");
    if (processed.includes(`${key}=`)) {
      processed = processed.replace(regex, `${key}="${value}"`);
    } else {
      processed = processed.replace("<svg", `<svg ${key}="${value}"`);
    }
  });

  return processed;
};

export const createSvgCache = (maxSize = 100) => {
  const cache = new Map<string, string>();

  return {
    get: (key: string) => cache.get(key),
    set: (key: string, value: string) => {
      if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        if (typeof firstKey === "string") {
          cache.delete(firstKey);
        }
      }
      cache.set(key, value);
    },
    has: (key: string) => cache.has(key),
    clear: () => cache.clear(),
    delete: (key: string) => cache.delete(key),
  };
};
