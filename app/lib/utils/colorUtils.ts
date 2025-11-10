import { formatHex, formatCss, oklch, rgb } from "culori";
import type { Oklch, Rgb } from "culori";

/**
 * Convert hex color to oklch format
 * @param hex - Hex color string (e.g., "#FF0000")
 * @returns OKLCH color string in CSS format
 */
export function hexToOklch(hex: string): string {
  const color = oklch(hex);
  if (!color) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return formatCss(color);
}

/**
 * Convert hex color to oklch object
 * @param hex - Hex color string
 * @returns OKLCH color object with l, c, h properties
 */
export function hexToOklchObject(hex: string): Oklch {
  const color = oklch(hex);
  if (!color) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return color;
}

/**
 * Extract lightness from hex color
 * @param hex - Hex color string
 * @returns Lightness value (0-1)
 */
export function getLightness(hex: string): number {
  const color = oklch(hex);
  return color?.l ?? 0;
}

/**
 * Extract chroma from hex color
 * @param hex - Hex color string
 * @returns Chroma value
 */
export function getChroma(hex: string): number {
  const color = oklch(hex);
  return color?.c ?? 0;
}

/**
 * Extract hue from hex color
 * @param hex - Hex color string
 * @returns Hue value (0-360 degrees)
 */
export function getHue(hex: string): number | undefined {
  const color = oklch(hex);
  return color?.h;
}

/**
 * Convert hex to RGB object for APCA calculations
 * @param hex - Hex color string
 * @returns RGB color object
 */
export function hexToRgb(hex: string): Rgb {
  const color = rgb(hex);
  if (!color) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return color;
}

/**
 * Format oklch components to CSS string
 * @param l - Lightness (0-1)
 * @param c - Chroma
 * @param h - Hue (0-360)
 * @returns CSS oklch string
 */
export function formatOklchString(l: number, c: number, h: number | undefined): string {
  const hue = h ?? 0;
  return `oklch(${(l * 100).toFixed(2)}% ${c.toFixed(4)} ${hue.toFixed(2)})`;
}
