#!/bin/bash

##############################################################################
# Documentation Structure Validator
# Validates component documentation against LLM-friendly standards
#
# Usage: ./scripts/validate-docs.sh [component-name]
#
# Examples:
#   ./scripts/validate-docs.sh button
#   ./scripts/validate-docs.sh                    # Validate all components
##############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOCS_DIR="content/docs/components"
EXAMPLES_DIR="content/docs/examples"
TEMPLATE_FILE=".specify/templates/component-docs-template.md"
CHECKLIST_FILE=".specify/templates/component-docs-checklist.md"

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

##############################################################################
# Helper Functions
##############################################################################

print_header() {
  echo -e "\n${GREEN}=== $1 ===${NC}\n"
}

print_check() {
  local status=$1
  local message=$2

  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

  if [ "$status" = "PASS" ]; then
    echo -e "${GREEN}✓${NC} $message"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
  elif [ "$status" = "WARN" ]; then
    echo -e "${YELLOW}⚠${NC} $message"
  else
    echo -e "${RED}✗${NC} $message"
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
  fi
}

print_summary() {
  local component=$1

  echo ""
  echo -e "Component: ${GREEN}$component${NC}"
  echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC} | Failed: ${RED}$FAILED_CHECKS${NC} | Total: $TOTAL_CHECKS"

  if [ $FAILED_CHECKS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}\n"
    return 0
  else
    echo -e "${RED}✗ Some checks failed${NC}\n"
    return 1
  fi
}

##############################################################################
# Validation Functions
##############################################################################

validate_file_exists() {
  local file=$1

  if [ -f "$file" ]; then
    print_check "PASS" "File exists: $file"
    return 0
  else
    print_check "FAIL" "File missing: $file"
    return 1
  fi
}

validate_markdown_structure() {
  local file=$1

  # Check for H1 title
  if grep -q "^# " "$file"; then
    print_check "PASS" "H1 title present"
  else
    print_check "FAIL" "Missing H1 title (# ComponentName)"
  fi

  # Check for required sections
  local required_sections=(
    "## Overview"
    "## Quick Start"
    "## Props"
    "## Variants & States"
    "## Examples"
    "## Accessibility"
    "## CSS Customization"
    "## Best Practices"
    "## Common Issues"
    "## API Reference"
  )

  for section in "${required_sections[@]}"; do
    if grep -q "^$section" "$file"; then
      print_check "PASS" "Section present: $section"
    else
      print_check "FAIL" "Missing required section: $section"
    fi
  done

  # Check for H2 sections (not H3)
  if grep -q "^### " "$file"; then
    local h3_count=$(grep -c "^### " "$file" || true)
    if [ "$h3_count" -lt 20 ]; then
      print_check "PASS" "Subsection hierarchy correct ($h3_count H3 sections)"
    else
      print_check "WARN" "Many H3 sections found ($h3_count) - verify hierarchy"
    fi
  fi
}

validate_props_table() {
  local file=$1

  # Check if props table exists
  if grep -q "| Prop | Type | Required | Default | Description |" "$file"; then
    print_check "PASS" "Props table with correct headers found"

    # Count number of props
    local prop_count=$(grep -c "^\| \`" "$file" || true)
    if [ "$prop_count" -gt 0 ]; then
      print_check "PASS" "Props table contains $prop_count props"
    else
      print_check "WARN" "Props table found but no props listed"
    fi
  else
    print_check "FAIL" "Props table missing or incorrect header format"
  fi

  # Check for backtick types
  if grep "| \`" "$file" > /dev/null 2>&1; then
    print_check "PASS" "Props use backtick formatting for types"
  else
    print_check "WARN" "Props may not use backticks consistently"
  fi
}

validate_code_examples() {
  local file=$1

  # Count code blocks with tsx language
  local tsx_count=$(grep -c "^\`\`\`tsx" "$file" || true)

  if [ "$tsx_count" -ge 3 ]; then
    print_check "PASS" "At least 3 code examples found ($tsx_count)"
  elif [ "$tsx_count" -gt 0 ]; then
    print_check "WARN" "Only $tsx_count code examples (minimum 3 recommended)"
  else
    print_check "FAIL" "No code examples with tsx language identifier found"
  fi

  # Check if examples have descriptions
  local example_h3=$(grep -c "^### " "$file" || true)
  if [ "$example_h3" -ge 3 ]; then
    print_check "PASS" "At least 3 example sections with titles found"
  else
    print_check "WARN" "Examples sections may not have titles"
  fi

  # Check for imports in code blocks
  if grep -q "^import " "$file"; then
    print_check "PASS" "Import statements found in examples"
  else
    print_check "WARN" "No import statements found - ensure examples are complete"
  fi
}

validate_accessibility() {
  local file=$1

  # Check for keyboard support table
  if grep -q "| Key | Behavior |" "$file"; then
    print_check "PASS" "Keyboard support table present"
  else
    print_check "FAIL" "Keyboard support table missing"
  fi

  # Check for ARIA documentation
  if grep -q "aria-" "$file"; then
    print_check "PASS" "ARIA attributes documented"
  else
    print_check "WARN" "No ARIA attributes documented"
  fi

  # Check for WCAG compliance
  if grep -q "WCAG" "$file"; then
    print_check "PASS" "WCAG compliance documented"
  else
    print_check "FAIL" "WCAG compliance not documented"
  fi
}

validate_api_reference() {
  local file=$1

  # Check for TypeScript interface
  if grep -q "export interface" "$file"; then
    print_check "PASS" "TypeScript interface documented"
  else
    print_check "WARN" "TypeScript interface not found"
  fi

  # Check for code block in API reference
  if tail -50 "$file" | grep -q "^\`\`\`typescript"; then
    print_check "PASS" "API reference contains TypeScript code block"
  else
    print_check "WARN" "API reference may not have proper TypeScript syntax"
  fi
}

validate_frontmatter() {
  local file=$1

  # Check for YAML frontmatter
  if head -1 "$file" | grep -q "^---"; then
    print_check "PASS" "YAML frontmatter present"

    # Check for required frontmatter fields
    local required_fields=(
      "title:"
      "componentName:"
      "status:"
      "since:"
      "lastUpdated:"
      "spectrumBased:"
      "accessibility:"
    )

    for field in "${required_fields[@]}"; do
      if grep -q "$field" "$file"; then
        print_check "PASS" "Frontmatter field present: $field"
      else
        print_check "WARN" "Missing frontmatter field: $field"
      fi
    done
  else
    print_check "FAIL" "YAML frontmatter missing (--- at start of file)"
  fi
}

##############################################################################
# Main Validation
##############################################################################

validate_component() {
  local component=$1
  local doc_file="$DOCS_DIR/${component}.mdx"

  # Reset counters
  TOTAL_CHECKS=0
  PASSED_CHECKS=0
  FAILED_CHECKS=0

  print_header "Validating: $component"

  # Check file exists
  if ! validate_file_exists "$doc_file"; then
    return 1
  fi

  # Run validation checks
  validate_frontmatter "$doc_file"
  validate_markdown_structure "$doc_file"
  validate_props_table "$doc_file"
  validate_code_examples "$doc_file"
  validate_accessibility "$doc_file"
  validate_api_reference "$doc_file"

  # Print summary
  print_summary "$component"
}

validate_all_components() {
  print_header "Scanning for all components..."

  if [ ! -d "$DOCS_DIR" ]; then
    echo -e "${RED}Error: Documentation directory not found: $DOCS_DIR${NC}"
    exit 1
  fi

  local total_passed=0
  local total_failed=0

  # Find all .mdx files
  for file in "$DOCS_DIR"/*.mdx; do
    if [ -f "$file" ]; then
      local component=$(basename "$file" .mdx)
      validate_component "$component"

      total_passed=$((total_passed + PASSED_CHECKS))
      total_failed=$((total_failed + FAILED_CHECKS))
    fi
  done

  print_header "Validation Summary"
  echo "Total components checked: $(ls "$DOCS_DIR"/*.mdx 2>/dev/null | wc -l)"
  echo -e "Total passed: ${GREEN}$total_passed${NC}"
  echo -e "Total failed: ${RED}$total_failed${NC}"

  if [ $total_failed -eq 0 ]; then
    echo -e "\n${GREEN}✓ All documentation validated successfully!${NC}\n"
    return 0
  else
    echo -e "\n${RED}✗ Some validations failed${NC}\n"
    return 1
  fi
}

##############################################################################
# Entry Point
##############################################################################

if [ $# -eq 0 ]; then
  # Validate all components
  validate_all_components
else
  # Validate specific component
  validate_component "$1"
fi
