# LLM Documentation Accuracy Test Procedure

**Version**: 1.0.0
**Last Updated**: 2025-10-31

This document describes the manual testing procedure to validate that component documentation is accurate and parseable by Large Language Models (LLMs) like ChatGPT, Claude, and Copilot.

## Overview

The goal is to verify that LLMs can:
1. ✅ Accurately identify all component props
2. ✅ Correctly understand prop types and requirements
3. ✅ Generate working code examples using documented APIs
4. ✅ Understand component behaviors and best practices

**Success Criteria**: 95%+ accuracy on props identification and code generation

## Test Procedure

### Setup

1. **Choose LLM**: Pick one or more LLMs to test:
   - ChatGPT (openai.com/chat)
   - Claude (claude.ai)
   - GitHub Copilot (in VS Code)
   - Perplexity (perplexity.ai)

2. **Prepare Documentation**: Have the component documentation open
   - Navigate to the component documentation page
   - Ensure the full documentation is visible

3. **Clear Chat Context**: Start a new conversation with the LLM
   - Clear chat history
   - Don't reference previous conversations
   - Fresh context = clean test

### Test 1: Props Identification

**Objective**: Verify LLM can identify all props with correct types

**Procedure**:

1. Copy the entire "Props" section from the component documentation
2. Paste into the LLM chat
3. Ask: **"Based on this props documentation, list all the props for this component. Include the prop name, type, whether it's required, default value, and description."**

4. Compare LLM's response with actual documentation:
   - ✅ All props listed?
   - ✅ Types match exactly?
   - ✅ Required/optional status correct?
   - ✅ Default values accurate?
   - ❌ Any hallucinated props?
   - ❌ Any props missing?

**Recording Results**:

```markdown
### Test Results: Props Identification

Component: [ComponentName]
LLM: [ChatGPT/Claude/Copilot]
Date: [Date]

**Props Found**: [Count]
**Props Correct**: [Count]
**Accuracy**: [Percentage]%

**Correct Props**:
- ✓ propName1 (type1)
- ✓ propName2 (type2)

**Missing Props**:
- ✗ propName3

**Hallucinated Props**:
- None

**Type Errors**:
- None

**Status**: ✅ PASS / ❌ FAIL
```

### Test 2: Code Generation

**Objective**: Verify LLM can generate working code using the component

**Procedure**:

1. Copy the "Examples" section from documentation
2. Paste into the LLM chat
3. Ask: **"Based on these examples and the component documentation, write a new example that demonstrates [specific use case]. Make sure to include all necessary imports and ensure the code is valid TypeScript/React."**

**Example Prompts**:
- "Create an example showing how to handle click events on a Button component"
- "Show how to validate user input in a TextField component"
- "Demonstrate how to create a controlled Checkbox component"
- "Write an example of using a Picker with custom option rendering"

4. Evaluate generated code:
   - ✅ Code compiles? (paste into TypeScript)
   - ✅ Correct import paths?
   - ✅ Correct API usage?
   - ✅ All required props provided?
   - ✅ Handles mentioned use case?
   - ❌ Syntax errors?
   - ❌ Wrong prop names?
   - ❌ Missing imports?

**Recording Results**:

```markdown
### Test Results: Code Generation

Component: [ComponentName]
LLM: [ChatGPT/Claude/Copilot]
Date: [Date]

**Use Case**: [Describe what LLM was asked to generate]

**Generated Code**:
```tsx
[LLM's generated code here]
```

**Compilation**: ✅ YES / ❌ NO
**API Correct**: ✅ YES / ❌ NO
**Accuracy**: [Percentage]%

**Issues Found** (if any):
- [Issue 1]
- [Issue 2]

**Status**: ✅ PASS / ❌ FAIL
```

### Test 3: Behavior Understanding

**Objective**: Verify LLM understands component behavior and constraints

**Procedure**:

1. Copy the "Best Practices" and "Common Issues" sections
2. Paste into the LLM chat
3. Ask: **"Based on the component documentation, what are the common pitfalls when using [Component]? What should developers avoid?"**

4. Compare LLM's response with documented best practices:
   - ✅ Identifies documented pitfalls?
   - ✅ Suggests documented solutions?
   - ✅ Understands accessibility requirements?
   - ✅ Knows about prop interactions?
   - ❌ Contradicts documentation?
   - ❌ Suggests anti-patterns?

**Recording Results**:

```markdown
### Test Results: Behavior Understanding

Component: [ComponentName]
LLM: [ChatGPT/Claude/Copilot]
Date: [Date]

**Question**: What are common pitfalls?

**LLM Response**:
[LLM's response here]

**Matches Documentation**: ✅ YES / ⚠️ PARTIAL / ❌ NO

**Correct Points Identified**:
- [Point 1]
- [Point 2]

**Misconceptions**:
- [Misconception 1]

**Status**: ✅ PASS / ✅ PARTIAL PASS / ❌ FAIL
```

## Acceptance Criteria

| Test | Pass Criteria | Weight |
|------|---------------|--------|
| Props Identification | 95%+ props correct | 40% |
| Code Generation | Generated code compiles and works | 40% |
| Behavior Understanding | Matches 90%+ of documented behaviors | 20% |

**Overall**: Must achieve 95%+ on Props + Code = PASS

## Troubleshooting

### Issue: LLM Missing Props

**Cause**: Props table may be unclear or not in standard format

**Fix**:
- Check props table has exact header: `| Prop | Type | Required | Default | Description |`
- Ensure all types are in backticks
- Verify column alignment

**Update Documentation**: Make props table clearer, add prop grouping if needed

### Issue: LLM Generates Incorrect Code

**Cause**: Examples may be incomplete or contradictory

**Fix**:
- Verify all examples compile
- Check imports are correct
- Ensure examples follow documented props exactly

**Update Documentation**: Add clearer examples, document prop combinations better

### Issue: LLM Contradicts Documentation

**Cause**: Documentation may contain errors or be ambiguous

**Fix**:
- Verify documented behavior against actual component code
- Check for conflicting information in different sections
- Clarify ambiguous descriptions

**Update Documentation**: Correct errors, remove contradictions, clarify wording

## Multiple LLM Testing

Test with multiple LLMs to verify documentation works across different models:

```markdown
## LLM Compatibility Matrix

| Component | ChatGPT | Claude | Copilot | Perplexity | Average |
|-----------|---------|--------|---------|------------|---------|
| Button | 98% | 97% | 95% | 96% | 96.5% ✅ |
| TextField | 93% | 94% | 91% | 92% | 92.5% ✅ |
| Provider | 87% | 88% | 85% | 86% | 86.5% ❌ |

**Note**: Provider needs documentation improvements
```

## Integration into CI/CD

These tests should be run:
- ✅ Before merging new documentation
- ✅ Before publishing updates
- ✅ Monthly for all components (detect regressions)
- ✅ When component API changes

**Not Automated**: Currently manual because it requires LLM API interaction

## Documentation Quality Indicators

Well-documented components will show:
- ✅ Consistent 95%+ accuracy across all LLMs
- ✅ Code generation with zero compilation errors
- ✅ Consistent behavior understanding
- ✅ Identical accuracy across different test variations

Poorly-documented components will show:
- ❌ Varying accuracy (60-80%) across LLMs
- ❌ Generated code with errors
- ❌ LLM confusion about behavior
- ❌ Accuracy drops with different question phrasing

## Template Test Report

```markdown
# LLM Accuracy Test Report

**Component**: [ComponentName]
**Date**: [Date]
**Tester**: [Name]

## Test Results

### Props Identification
- **LLM**: [ChatGPT/Claude]
- **Result**: [X]/[Total] props correct
- **Accuracy**: [X]%
- **Status**: ✅ PASS / ❌ FAIL

### Code Generation
- **LLM**: [ChatGPT/Claude]
- **Use Cases Tested**: [List]
- **Successful**: [Count]/[Total]
- **Compilation**: ✅ All pass / ❌ Some fail
- **Status**: ✅ PASS / ❌ FAIL

### Behavior Understanding
- **LLM**: [ChatGPT/Claude]
- **Score**: [X]%
- **Status**: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

## Summary

**Overall Accuracy**: [X]%
**Documentation Quality**: [Excellent/Good/Fair/Poor]
**Recommended Actions**: [List]

## Sign-Off

- Tested by: [Name]
- Date: [Date]
- Next review: [Date]
```

---

## Related Documentation

- [Component Documentation Template](../.specify/templates/component-docs-template.md)
- [LLM Documentation Checklist](../.specify/templates/component-docs-checklist.md)
- [Quick Start Guide](../specs/001-llm-friendly-docs/quickstart.md)

---

**Procedure Version**: 1.0.0
**Last Updated**: 2025-10-31
**Status**: Ready for LLM accuracy testing
