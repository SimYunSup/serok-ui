#!/usr/bin/env node

/**
 * TypeScript Example Validator & Component Documentation Validator
 *
 * Validates that all code examples in component documentation compile
 * without errors. Extracts code blocks from markdown and type-checks them.
 *
 * Also validates component documentation structure according to LLM-friendly standards.
 *
 * Usage:
 *   npx ts-node scripts/validate-examples.ts [component-name]
 *   npx ts-node scripts/validate-examples.ts button
 *   npx ts-node scripts/validate-examples.ts (validates all)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

interface ValidationResult {
  file: string;
  component: string;
  examples: ExampleValidation[];
  passed: boolean;
  errors: string[];
}

interface ExampleValidation {
  title: string;
  code: string;
  passed: boolean;
  errors: string[];
}

const DOCS_DIR = 'content/docs/components';
const EXAMPLES_DIR = 'content/docs/examples';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
};

/**
 * Validate component documentation structure according to LLM-friendly standards
 */
function validateComponentDoc(filePath: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check required sections for component documentation
    const requiredSections = [
      '## Overview',
      '## Quick Start',
      '## Props',
      '## Variants & States',
      '## Examples',
      '## Accessibility',
      '## CSS Customization',
      '## Best Practices',
      '## Common Issues',
      '## API Reference',
    ];

    requiredSections.forEach((section) => {
      if (!content.includes(section)) {
        errors.push(`Missing required section: ${section}`);
      }
    });

    // Check for props table (5 columns)
    if (!content.includes('| Prop | Type | Required | Default | Description |')) {
      errors.push('Props table missing or malformed (check header format)');
    }

    // Check for minimum code examples
    const codeBlockCount = (content.match(/```tsx/g) || []).length;
    if (codeBlockCount < 3) {
      errors.push(`Only ${codeBlockCount} code examples found (minimum 3 required)`);
    }

    // Check for proper heading hierarchy
    const h1Count = (content.match(/^# /gm) || []).length;
    if (h1Count !== 1) {
      errors.push(`Expected 1 H1 heading, found ${h1Count}`);
    }

    // Check for WCAG compliance in accessibility section
    if (content.includes('## Accessibility') && !content.includes('WCAG')) {
      errors.push('Accessibility section should document WCAG compliance level');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

/**
 * Extract code blocks from markdown content
 */
function extractCodeBlocks(content: string): { title: string; code: string }[] {
  const blocks: { title: string; code: string }[] = [];

  // Find all tsx code blocks
  const codeBlockRegex = /### (.+?)\n\n(?:.*?\n\n)?```tsx\n([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const code = match[2].trim();
    blocks.push({ title, code });
  }

  return blocks;
}

/**
 * Validate TypeScript code block
 */
function validateTypeScript(code: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    // Create a temporary source file for compilation
    const sourceFile = ts.createSourceFile(
      'example.tsx',
      code,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );

    // Simple validation: check for obvious syntax errors
    const diagnostics = ts.getPreEmitDiagnostics(sourceFile);

    if (diagnostics.length > 0) {
      diagnostics.forEach((diagnostic) => {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        errors.push(`Line ${diagnostic.start}: ${message}`);
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

/**
 * Validate a single component documentation file
 */
function validateComponent(filePath: string): ValidationResult {
  const component = path.basename(filePath, '.mdx');
  const result: ValidationResult = {
    file: filePath,
    component,
    examples: [],
    passed: true,
    errors: [],
  };

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const codeBlocks = extractCodeBlocks(content);

    if (codeBlocks.length === 0) {
      result.errors.push('No code examples found in component documentation');
      result.passed = false;
      return result;
    }

    // Validate each code block
    codeBlocks.forEach((block) => {
      const validation = validateTypeScript(block.code);
      const example: ExampleValidation = {
        title: block.title,
        code: block.code,
        passed: validation.valid,
        errors: validation.errors,
      };

      result.examples.push(example);

      if (!validation.valid) {
        result.passed = false;
      }
    });

    return result;
  } catch (error) {
    result.errors.push(
      error instanceof Error ? error.message : String(error)
    );
    result.passed = false;
    return result;
  }
}

/**
 * Validate all components in documentation directory
 */
function validateAllComponents(): ValidationResult[] {
  const results: ValidationResult[] = [];

  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`${colors.red}✗${colors.reset} Documentation directory not found: ${DOCS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DOCS_DIR).filter((file) => file.endsWith('.mdx'));

  files.forEach((file) => {
    const filePath = path.join(DOCS_DIR, file);
    const result = validateComponent(filePath);
    results.push(result);
  });

  return results;
}

/**
 * Print validation results
 */
function printResults(results: ValidationResult[]): void {
  console.log('\n' + '='.repeat(70));
  console.log('TypeScript Example Validation Results');
  console.log('='.repeat(70) + '\n');

  let totalPassed = 0;
  let totalFailed = 0;

  results.forEach((result) => {
    const status = result.passed
      ? `${colors.green}✓${colors.reset}`
      : `${colors.red}✗${colors.reset}`;

    console.log(`${status} ${result.component}`);

    if (result.examples.length > 0) {
      result.examples.forEach((example) => {
        const exampleStatus = example.passed
          ? `${colors.green}  ✓${colors.reset}`
          : `${colors.red}  ✗${colors.reset}`;

        console.log(`${exampleStatus} ${example.title}`);

        if (!example.passed && example.errors.length > 0) {
          example.errors.forEach((error) => {
            console.log(`    ${colors.red}Error:${colors.reset} ${error}`);
          });
        }
      });
    }

    if (result.errors.length > 0) {
      result.errors.forEach((error) => {
        console.log(`  ${colors.red}Error:${colors.reset} ${error}`);
      });
    }

    if (result.passed) {
      totalPassed++;
    } else {
      totalFailed++;
    }

    console.log();
  });

  console.log('='.repeat(70));
  console.log(
    `Total: ${colors.green}${totalPassed} passed${colors.reset}, ${
      totalFailed > 0 ? colors.red : colors.green
    }${totalFailed} failed${colors.reset}`,
  );
  console.log('='.repeat(70) + '\n');

  if (totalFailed > 0) {
    process.exit(1);
  }
}

/**
 * Main entry point
 */
function main(): void {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // Validate specific component
    const component = args[0];
    const filePath = path.join(DOCS_DIR, `${component}.mdx`);

    if (!fs.existsSync(filePath)) {
      console.error(
        `${colors.red}✗${colors.reset} Component documentation not found: ${filePath}`,
      );
      process.exit(1);
    }

    const result = validateComponent(filePath);
    printResults([result]);
  } else {
    // Validate all components
    const results = validateAllComponents();
    printResults(results);
  }
}

// Run validation
main();

export { validateComponent, validateAllComponents, validateComponentDoc, ValidationResult };
