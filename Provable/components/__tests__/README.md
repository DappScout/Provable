# AppLayout Component Tests

## Overview
This directory contains comprehensive unit tests for the `AppLayout` component, which manages the application's layout and bottom navigation.

## Test Coverage

### 1. Rendering Tests
- Basic component rendering
- Children rendering
- BottomNavbar integration
- CSS classes and styling

### 2. Route Detection Tests
- All valid routes (/home, /offers, /profile)
- Unknown routes (default to home)
- Edge cases (empty string, null, undefined, nested routes, trailing slashes)
- Case sensitivity

### 3. Navigation Handling Tests
- Router.push calls with correct paths
- Multiple navigation calls
- Path formatting

### 4. Props Passing Tests
- onNavigate callback
- activeRoute prop
- Dynamic updates on pathname changes

### 5. Type Safety Tests
- ValidRoute type consistency
- ROUTES constant validation

### 6. Edge Cases & Error Handling
- Null/undefined pathname
- No children
- Multiple children
- Router errors

### 7. Integration Tests
- Next.js hooks integration
- Route change state management
- Complete layout structure

### 8. Accessibility Tests
- Semantic HTML (main element)
- Screen reader compatibility

### 9. Performance Tests
- Re-render behavior
- Rapid pathname changes

### 10. CSS & Styling Tests
- Background color
- Viewport height
- Navbar spacing

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test AppLayout.test.tsx
```

## Setup Required

Before running tests, install dependencies:

```bash
npm install
```

The following packages are required (already added to package.json):
- jest
- jest-environment-jsdom
- @testing-library/react
- @testing-library/jest-dom
- @types/jest

## Test Structure

Each test suite follows this pattern:
1. **Arrange**: Set up mocks and initial state
2. **Act**: Render component and interact with it
3. **Assert**: Verify expected behavior

## Mocking Strategy

- `next/navigation`: Mocked in `jest.setup.ts`
- `BottomNavbar`: Mocked per-test to control behavior
- `useRouter` and `usePathname`: Mocked to simulate different routes

## Key Testing Principles Applied

1. **Isolation**: Each test is independent and doesn't affect others
2. **Coverage**: Tests cover happy paths, edge cases, and error conditions
3. **Maintainability**: Clear test names and organized structure
4. **Readability**: Descriptive assertions and comments where needed
5. **Type Safety**: Leveraging TypeScript for compile-time checks