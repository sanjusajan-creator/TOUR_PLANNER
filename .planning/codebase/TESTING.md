# Testing Patterns

**Analysis Date:** 2026-05-03

## Test Framework

**Runner:** None detected
- No Jest, Vitest, Mocha, or other test runner configured
- No test commands in project

**Assertion Library:** N/A
- Manual testing via browser
- Console.log debugging

**Run Commands:** None available
- No npm test or similar scripts
- Project lacks any testing infrastructure

## Test File Organization

**Location:** N/A
- No dedicated test directory
- No test files anywhere in project

**Naming:** Not applicable
- No `*.test.js`, `*.spec.js`, `*.test.ts` files

**Structure:** N/A
- No testing patterns present

## Test Structure

**Suite Organization:** None
- No test suites

**Patterns:** N/A
- No setup/teardown patterns
- No assertion patterns

## Mocking

**Framework:** None used
- No mocking library (Sinon, Jest mock, etc.)

**Patterns:** N/A
- No mocking patterns

**What to Mock:** N/A
- No test guidance

**What NOT to Mock:** N/A
- No test guidance

## Fixtures and Factories

**Test Data:** None
- No fixture files
- No factory functions for testing

**Location:** N/A
- No fixtures directory

## Coverage

**Requirements:** None enforced
- No coverage targets
- No coverage tool configured

**View Coverage:** N/A
- No coverage reports

## Test Types

**Unit Tests:** Not present
- No unit test files
- No unit testing patterns

**Integration Tests:** Not present
- Manual browser testing expected
- No automated integration tests

**E2E Tests:** Not present
- No Playwright, Cypress, or similar
- Manual testing practiced

## Common Patterns

**Manual Testing Approach Observed:**
- Browser-based manual verification
- Console logging for debugging
- Developer Tools (F12) for inspection
- Live reload during development

**Testing in Codebase:**
```javascript
// Debug logging extensively used
console.log("showDay called with:", id);
console.log("Element found:", el);
console.log("Set display to block for:", id);

// Error catching with logging
catch (e) {
  console.error("Error updating tracker:", e);
}

// Warning messages for non-critical issues
console.warn("Error initializing carousel:", e);
```

**Manual Verification Checklist Used:**
- [ ] Page loads without console errors
- [ ] Navigation between days works
- [ ] PDF viewing functional
- [ ] Train tracker updates correctly
- [ ] Responsive on mobile viewport
- [ ] Service worker registers
- [ ] PWA installable

---

## Recommendations

**Add Testing Infrastructure:**
1. Install test runner: `npm install --save-dev vitest`
2. Add test script: `"test": "vitest"`
3. Create test directory: `tests/`
4. Add test files: `tests/navigation.test.js`, `tests/tracking.test.js`

**Example Test File:**
```javascript
// tests/navigation.test.js
import { describe, it, expect } from 'vitest';

describe('Navigation functions', () => {
  it('showDay should navigate to correct day', () => {
    const result = showDay('day1');
    expect(result).toBeUndefined();
  });

  it('goHome should reset currentDay to 0', () => {
    goHome();
    expect(currentDay).toBe(0);
  });
});
```

**Current Deficit:**
- Zero automated tests
- Manual testing required for all features
- No regression protection
- High risk of breaking changes

---

*Testing analysis: 2026-05-03*