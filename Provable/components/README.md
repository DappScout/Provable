# Component Library

A comprehensive component library built for the SEO Freelance App, following the design specifications in `Style_spec.md`.

## Design System

This component library follows a strict dark mode design system with the following key characteristics:

- **Primary Colors**: Turquoise (#98F7E9) with gradient support
- **Backgrounds**: Dark (#121212), Card (#1E1E1E), Secondary (#2C2C2C)
- **Text Colors**: Primary (#FFFFFF), Secondary (#b3b3b3), Tertiary (#6D6D6D)
- **Semantic Colors**: Success, Warning, Error, Disabled states
- **Typography**: System fonts with consistent sizing (12px-48px)
- **Spacing**: 4px-48px scale with semantic tokens

## Components

### Form Components

#### Input
```tsx
import { Input } from '@/components/ui';

<Input 
  placeholder="Enter text..."
  label="Username"
  error="This field is required"
  leftIcon={<User />}
  rightIcon={<Eye />}
/>
```

#### Select
```tsx
import { Select } from '@/components/ui';

<Select
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Choose an option"
/>
```

#### DatePicker
```tsx
import { DatePicker } from '@/components/ui';

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select date"
  minDate={new Date()}
/>
```

#### PillToggle
```tsx
import { PillToggle } from '@/components/ui';

<PillToggle
  options={[
    { value: 'impressions', label: 'Impressions' },
    { value: 'views', label: 'Views' },
    { value: 'sales', label: 'Sales' }
  ]}
  value={selectedMetric}
  onChange={setSelectedMetric}
/>
```

### Card Components

#### Card
```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui';

<Card variant="clickable" onClick={handleClick}>
  <CardHeader>
    <Heading level={2}>Card Title</Heading>
  </CardHeader>
  <CardContent>
    <Text>Card content goes here</Text>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

#### OfferCard
```tsx
import { OfferCard } from '@/components/ui';

<OfferCard
  title="Domain.com SEO Growth"
  timeRemaining="29 days left"
  userName="Adam Smith"
  userSubtitle="Working on Domain.com"
  userAvatar="/avatar.jpg"
  status="pending"
  statusText="In Progress"
  onClick={handleOfferClick}
/>
```

#### StatCard
```tsx
import { StatCard } from '@/components/ui';

<StatCard
  value={855}
  label="Impressions"
  trend="up"
  size="medium"
/>
```

### Navigation Components

#### Tabs
```tsx
import { Tabs } from '@/components/ui';

<Tabs
  tabs={[
    { id: 'received', label: 'Received', count: 3 },
    { id: 'sent', label: 'Sent', count: 1 },
    { id: 'drafts', label: 'Drafts', count: 2 }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

#### SearchBar
```tsx
import { SearchBar } from '@/components/ui';

<SearchBar
  placeholder="Search SEO specialists..."
  value={searchQuery}
  onChange={setSearchQuery}
  onSearch={handleSearch}
/>
```

### Data Display Components

#### Avatar
```tsx
import { Avatar } from '@/components/ui';

<Avatar
  src="/user-avatar.jpg"
  name="John Doe"
  size="medium"
/>
```

#### Badge
```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">Complete</Badge>
<Badge variant="warning">1 Alert</Badge>
<Badge variant="error">Disputed</Badge>
<Badge variant="info">29 days left</Badge>
```

#### ProgressBar
```tsx
import { ProgressBar } from '@/components/ui';

<ProgressBar
  value={75}
  label="Goal Progress"
  showPercentage
/>
```

#### NotificationCard
```tsx
import { NotificationCard } from '@/components/ui';

<NotificationCard
  type="success"
  title="Offer Accepted"
  message="Your offer has been accepted by the client"
  details="View Details"
  onDetailsClick={handleDetailsClick}
/>
```

### Utility Components

#### Text
```tsx
import { Text } from '@/components/ui';

<Text size="lg" weight="bold" color="primary">
  Large Bold Text
</Text>
<Text size="sm" color="secondary">
  Small secondary text
</Text>
```

#### Heading
```tsx
import { Heading } from '@/components/ui';

<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>
```

#### Button
```tsx
import { Button } from '@/components/ui';

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="alt1">Text Link</Button>
<Button variant="round">Round Button</Button>
```

## Layout Components

#### VStack & HStack
```tsx
import { VStack, HStack } from '@/components/ui';

<VStack space="lg">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</VStack>

<HStack space="md">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</HStack>
```

## Usage Guidelines

### Importing Components
```tsx
// Import individual components
import { Button, Text, Card } from '@/components/ui';

// Or import from specific files
import { Button } from '@/components/ui/button';
```

### Styling
- All components use semantic design tokens from `globals.css`
- Custom styling can be applied via `className` prop
- Components support responsive design with Tailwind breakpoints

### Accessibility
- All interactive components include proper focus states
- ARIA labels and keyboard navigation support
- Color contrast meets WCAG guidelines
- Touch targets are minimum 48px

### TypeScript
- All components are fully typed
- Props interfaces are exported for custom extensions
- Generic types support for flexible usage

## Design System Reference

For complete design specifications, see `AIs/Style_spec.md` which includes:
- Color palette and semantic tokens
- Typography scale and weights
- Spacing system
- Component specifications
- Animation guidelines
- Accessibility requirements

## Development

### Adding New Components
1. Create component file in `/components/ui/`
2. Follow existing patterns for props and styling
3. Use semantic design tokens from `globals.css`
4. Include TypeScript interfaces
5. Add to `index.ts` exports
6. Update this README with usage examples

### Testing
- Components include proper error boundaries
- Loading states for async operations
- Graceful fallbacks for missing data
- Responsive behavior testing

## Performance
- Tree-shakeable exports
- Minimal bundle impact
- Optimized re-renders with React.memo where appropriate
- CSS-in-JS with Tailwind for optimal performance
