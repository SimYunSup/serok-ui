import { contrast } from "@adobe/leonardo-contrast-colors";
import { hexToOklchObject, hexToRgb } from "./colorUtils";
import type { Oklch } from "culori";

export interface ColorInfo {
  name: string;
  hex: string;
  oklch: Oklch;
  lightness: number;
  chroma: number;
  hue: number | undefined;
}

export interface ContrastInfo {
  foreground: string;
  background: string;
  apca: number;
  passes: boolean;
}

/**
 * Analyze color properties from hex value
 */
export function analyzeColor(name: string, hex: string): ColorInfo {
  const oklch = hexToOklchObject(hex);
  return {
    name,
    hex,
    oklch,
    lightness: oklch.l,
    chroma: oklch.c,
    hue: oklch.h,
  };
}

/**
 * Calculate APCA contrast between two colors using Leonardo
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @returns APCA contrast value (Lc value)
 */
export function calculateAPCA(foreground: string, background: string): number {
  // Convert hex to RGB arrays (0-255 range)
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  const fgArray: [number, number, number] = [
    Math.round(fgRgb.r * 255),
    Math.round(fgRgb.g * 255),
    Math.round(fgRgb.b * 255),
  ];
  const bgArray: [number, number, number] = [
    Math.round(bgRgb.r * 255),
    Math.round(bgRgb.g * 255),
    Math.round(bgRgb.b * 255),
  ];

  // Leonardo's contrast function with 'wcag3' calculates APCA
  const apcaValue = contrast(fgArray, bgArray, undefined, "wcag3");
  return Math.abs(apcaValue);
}

/**
 * Check if APCA contrast passes minimum threshold
 * @param contrast - APCA contrast value
 * @param level - Minimum level: 'body-text' (75), 'large-text' (60), 'ui' (45)
 * @returns true if contrast meets or exceeds the threshold
 */
export function passesAPCA(
  contrast: number,
  level: "body-text" | "large-text" | "ui" = "body-text"
): boolean {
  const thresholds = {
    "body-text": 75,
    "large-text": 60,
    ui: 45,
  };
  return Math.abs(contrast) >= thresholds[level];
}

/**
 * Analyze contrast between foreground and background
 */
export function analyzeContrast(
  foreground: string,
  background: string,
  level: "body-text" | "large-text" | "ui" = "body-text"
): ContrastInfo {
  const apca = calculateAPCA(foreground, background);
  return {
    foreground,
    background,
    apca,
    passes: passesAPCA(apca, level),
  };
}

/**
 * Analyze all colors from tokens
 */
export function analyzeColorTokens(tokens: Record<string, Record<string, { value: string }>>): ColorInfo[] {
  const colors: ColorInfo[] = [];

  for (const [colorFamily, shades] of Object.entries(tokens)) {
    for (const [shade, token] of Object.entries(shades)) {
      const name = `${colorFamily}-${shade}`;
      colors.push(analyzeColor(name, token.value));
    }
  }

  return colors;
}

/**
 * Group colors by their family
 */
export function groupColorsByFamily(colors: ColorInfo[]): Record<string, ColorInfo[]> {
  const grouped: Record<string, ColorInfo[]> = {};

  for (const color of colors) {
    const [family] = color.name.split("-");
    if (!grouped[family]) {
      grouped[family] = [];
    }
    grouped[family].push(color);
  }

  return grouped;
}
