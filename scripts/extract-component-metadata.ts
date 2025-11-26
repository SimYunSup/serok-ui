#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Component Documentation Metadata Extractor
 *
 * Parses component documentation files and extracts structured metadata
 * including props, types, defaults, and examples for programmatic use.
 *
 * Output: JSON with extracted metadata for all components
 *
 * Usage:
 *   tsx scripts/extract-component-metadata.ts > metadata.json
 *   tsx scripts/extract-component-metadata.ts [component-name] > button-metadata.json
 */

import * as fs from 'fs';
import * as path from 'path';

interface PropMetadata {
  name: string
  type: string
  required: boolean
  default: string | null
  description: string
}

interface ComponentMetadata {
  name: string
  title: string
  path: string
  description: string
  props: PropMetadata[]
  examples: { title: string, count: number }[]
  sections: string[]
  frontmatter: Record<string, any>
}

const DOCS_DIR = 'content/docs/components';
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
};

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, any>, content: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const [, frontmatterStr, restContent] = match;
  const frontmatter: Record<string, any> = {};

  // Simple YAML parser for basic key-value pairs
  frontmatterStr.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      // Parse boolean and number values
      if (value === 'true') value = true as any;
      else if (value === 'false') value = false as any;
      else if (!isNaN(Number(value))) value = Number(value) as any;

      frontmatter[key.trim()] = value;
    }
  });

  return { frontmatter, content: restContent };
}

/**
 * Extract props table from markdown content
 */
function extractProps(content: string): PropMetadata[] {
  const props: PropMetadata[] = [];

  // Find props table
  const tableMatch = content.match(
    /## Props[\s\S]*?\| Prop \| Type \| Required \| Default \| Description \|\n\|[\s\S]*?\n([\s\S]*?)\n\n/,
  );

  if (!tableMatch) {
    return props;
  }

  const tableContent = tableMatch[1];
  const rows = tableContent.split('\n').filter(row => row.startsWith('|'));

  rows.forEach((row) => {
    const cells = row.split('|').map(cell => cell.trim()).filter(Boolean);

    if (cells.length === 5) {
      const [name, type, required, defaultVal, description] = cells;

      props.push({
        name: name.replace(/^`|`$/g, ''),
        type: type.replace(/^`|`$/g, ''),
        required: required.toLowerCase() === 'yes',
        default: defaultVal === '—' || defaultVal === '-' ? null : defaultVal.replace(/^`|`$/g, ''),
        description,
      });
    }
  });

  return props;
}

/**
 * Extract examples from markdown content
 */
function extractExamples(content: string): { title: string, count: number }[] {
  const examples: { title: string, count: number }[] = [];

  // Find all example sections (### Example Title)
  const exampleMatches = content.matchAll(/### (.+?)\n/g);

  for (const match of exampleMatches) {
    const title = match[1].trim();
    examples.push({ title, count: 1 });
  }

  return examples;
}

/**
 * Extract sections from markdown content
 */
function extractSections(content: string): string[] {
  const sections: string[] = [];
  const sectionMatches = content.matchAll(/^## (.+?)$/gm);

  for (const match of sectionMatches) {
    sections.push(match[1].trim());
  }

  return sections;
}

/**
 * Extract metadata from a single component documentation file
 */
function extractComponentMetadata(filePath: string): ComponentMetadata | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content: docContent } = parseFrontmatter(content);

    // Extract component name from filename
    const filename = path.basename(filePath, '.mdx');

    // Extract title from H1 heading
    const titleMatch = docContent.match(/^# (.+?)$/m);
    const title = titleMatch ? titleMatch[1].trim() : filename;

    // Extract overview (first paragraph after ## Overview)
    const overviewMatch = docContent.match(/## Overview\n\n(.+?)(?:\n\n|## )/);
    const description = overviewMatch ? overviewMatch[1].trim().substring(0, 200) : '';

    // Extract metadata
    const props = extractProps(docContent);
    const examples = extractExamples(docContent);
    const sections = extractSections(docContent);

    return {
      name: frontmatter.componentName || filename,
      title,
      path: filePath,
      description,
      props,
      examples,
      sections,
      frontmatter,
    };
  }
  catch (error) {
    console.error(
      `${colors.red}✗${colors.reset} Error processing ${filePath}:`,
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

/**
 * Extract metadata from all component documentation files
 */
function extractAllComponentMetadata(): ComponentMetadata[] {
  const metadata: ComponentMetadata[] = [];

  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`${colors.red}✗${colors.reset} Documentation directory not found: ${DOCS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DOCS_DIR).filter(file => file.endsWith('.mdx'));

  if (files.length === 0) {
    console.warn(`${colors.yellow}⚠${colors.reset} No component documentation files found in ${DOCS_DIR}`);
    return metadata;
  }

  files.forEach((file) => {
    const filePath = path.join(DOCS_DIR, file);
    const componentMetadata = extractComponentMetadata(filePath);

    if (componentMetadata) {
      metadata.push(componentMetadata);
    }
  });

  return metadata;
}

/**
 * Generate metadata report
 */
function generateReport(metadata: ComponentMetadata[]): void {
  console.log(`\n${colors.green}=== Component Metadata Extraction Report ===${colors.reset}\n`);
  console.log(`Total components: ${metadata.length}`);

  if (metadata.length > 0) {
    console.log('\nDocumented Components:');
    metadata.forEach((comp) => {
      const propCount = comp.props.length;
      const exampleCount = comp.examples.length;
      const sectionCount = comp.sections.length;

      console.log(
        `  ${colors.green}✓${colors.reset} ${comp.name} - ${propCount} props, ${exampleCount} examples, ${sectionCount} sections`,
      );
    });
  }

  console.log(`\n${colors.green}=== Metadata Extraction Complete ===${colors.reset}\n`);
}

/**
 * Main entry point
 */
function main(): void {
  const args = process.argv.slice(2);

  let metadata: ComponentMetadata[] = [];

  if (args.length > 0) {
    // Extract metadata for specific component
    const component = args[0];
    const filePath = path.join(DOCS_DIR, `${component}.mdx`);

    if (!fs.existsSync(filePath)) {
      console.error(
        `${colors.red}✗${colors.reset} Component documentation not found: ${filePath}`,
      );
      process.exit(1);
    }

    const componentMetadata = extractComponentMetadata(filePath);
    if (componentMetadata) {
      metadata = [componentMetadata];
    }
  }
  else {
    // Extract metadata for all components
    metadata = extractAllComponentMetadata();
  }

  // Output JSON to stdout
  console.log(JSON.stringify(metadata, null, 2));

  // Print report to stderr
  if (args.includes('--report')) {
    generateReport(metadata);
  }
}

// Run extraction
main();

export { extractComponentMetadata, extractAllComponentMetadata };
export type { ComponentMetadata };
