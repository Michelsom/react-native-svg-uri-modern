import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SvgUri, SvgXml } from "react-native-svg";

export interface SvgUriProps {
  /**
   * SVG source URI or SVG string content
   */
  source: string | { uri: string };

  /**
   * Width of the SVG
   */
  width?: number | string;

  /**
   * Height of the SVG
   */
  height?: number | string;

  /**
   * Fill color for the SVG
   */
  fill?: string;

  /**
   * Stroke color for the SVG
   */
  stroke?: string;

  /**
   * Show loading indicator while fetching
   */
  showLoading?: boolean;

  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;

  /**
   * Callback when SVG loads successfully
   */
  onLoad?: () => void;

  /**
   * Callback when SVG fails to load
   */
  onError?: (error: Error) => void;

  /**
   * Custom style for the container
   */
  style?: any;

  /**
   * Cache the SVG content (default: true)
   */
  cache?: boolean;

  /**
   * Timeout for fetching SVG (in milliseconds)
   */
  timeout?: number;

  /**
   * Custom headers for the request
   */
  headers?: Record<string, string>;
}

// Simple cache implementation
const svgCache = new Map<string, string>();

export const SvgUriModern: React.FC<SvgUriProps> = ({
  source,
  width = 100,
  height = 100,
  fill,
  stroke,
  showLoading = true,
  loadingComponent,
  onLoad,
  onError,
  style,
  cache = true,
  timeout = 10000,
  headers = {},
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sourceUri = useMemo(() => {
    if (typeof source === "string") {
      // Check if it's already SVG content
      if (source.trim().startsWith("<svg")) {
        return null; // It's SVG content, not URI
      }
      return source;
    }
    return source.uri;
  }, [source]);

  const isDirectSvgContent = useMemo(() => {
    return typeof source === "string" && source.trim().startsWith("<svg");
  }, [source]);

  useEffect(() => {
    if (isDirectSvgContent) {
      setSvgContent(source as string);
      onLoad?.();
      return;
    }

    if (!sourceUri) return;

    const fetchSvg = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        if (cache && svgCache.has(sourceUri)) {
          const cachedContent = svgCache.get(sourceUri)!;
          setSvgContent(cachedContent);
          onLoad?.();
          return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(sourceUri, {
          headers: {
            Accept: "image/svg+xml, text/plain, */*",
            ...headers,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const content = await response.text();

        if (!content.trim().startsWith("<svg")) {
          throw new Error("Response is not valid SVG content");
        }

        // Cache the content
        if (cache) {
          svgCache.set(sourceUri, content);
        }

        setSvgContent(content);
        onLoad?.();
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to load SVG");
        setError(error);
        onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSvg();
  }, [
    sourceUri,
    isDirectSvgContent,
    cache,
    timeout,
    headers,
    onLoad,
    onError,
    source,
  ]);

  const processedSvgContent = useMemo(() => {
    if (!svgContent) return null;

    let processed = svgContent;

    // Apply fill and stroke if provided
    if (fill || stroke) {
      // Simple regex replacement - for more complex scenarios, you might want to use an XML parser
      if (fill) {
        processed = processed.replace(/fill="[^"]*"/g, `fill="${fill}"`);
        if (!processed.includes("fill=")) {
          processed = processed.replace("<svg", `<svg fill="${fill}"`);
        }
      }

      if (stroke) {
        processed = processed.replace(/stroke="[^"]*"/g, `stroke="${stroke}"`);
        if (!processed.includes("stroke=")) {
          processed = processed.replace("<svg", `<svg stroke="${stroke}"`);
        }
      }
    }

    return processed;
  }, [svgContent, fill, stroke]);

  if (loading && showLoading) {
    return (
      <View style={[styles.container, { width, height }, style]}>
        {loadingComponent || <ActivityIndicator size="small" color="#666" />}
      </View>
    );
  }

  if (error || !processedSvgContent) {
    return <View style={[styles.container, { width, height }, style]} />;
  }

  // Use SvgUri for direct URI rendering (more efficient for remote SVGs)
  if (sourceUri && !isDirectSvgContent && !fill && !stroke) {
    return (
      <SvgUri uri={sourceUri} width={width} height={height} style={style} />
    );
  }

  // Use SvgXml for processed content or direct SVG strings
  return (
    <SvgXml
      xml={processedSvgContent}
      width={width}
      height={height}
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SvgUriModern;
