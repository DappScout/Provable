# Component Example Pages

This directory contains example pages that demonstrate how to use the component library in real-world scenarios for the SEO Freelance App.

## Available Examples

### `/components-showcase`
**Purpose**: Comprehensive showcase of all available components
**Features**:
- Tabbed interface organizing components by category
- Interactive examples of every component
- Form components with validation
- Card layouts and data display
- Navigation and utility components

**Components Demonstrated**:
- All form inputs (Input, Select, DatePicker, PillToggle)
- Card variants and layouts
- Navigation (Tabs, SearchBar, ListItem)
- Data display (Avatar, Badge, ProgressBar, Notifications)
- Utility components (Typography, Buttons, Modal)

### `/home-example`
**Purpose**: Realistic home dashboard showing offers, analytics, and recent activity
**Features**:
- Analytics dashboard with key metrics
- Tabbed offers interface (Received/Sent/Drafts)
- Activity feed
- Featured specialists section
- Floating action button for new offers

**Real-world Usage**:
- Main dashboard for SEO freelancers
- Overview of active projects and earnings
- Quick access to important actions

### `/offers-example`
**Purpose**: Detailed offer/project management interface
**Features**:
- Project progress tracking
- Tabbed interface (Details/Analytics/Messages)
- Contract information display
- Performance metrics and reports
- Message thread simulation
- Status updates and milestones

**Real-world Usage**:
- Individual project management
- Client communication hub
- Progress tracking and reporting
- Contract and payment management

### `/profile-example`
**Purpose**: Professional profile/dashboard for SEO specialists
**Features**:
- Profile header with avatar and stats
- Certification display
- Portfolio showcase
- Client reviews and ratings
- Settings management
- Performance metrics

**Real-world Usage**:
- Personal branding and portfolio
- Client acquisition and credibility
- Account and preference management
- Performance tracking

## Navigation

To view these examples in your browser:

1. Start the development server: `npm run dev`
2. Navigate to:
   - `http://localhost:3000/components-showcase`
   - `http://localhost:3000/home-example`
   - `http://localhost:3000/offers-example`
   - `http://localhost:3000/profile-example`

## Usage in Your App

These examples show how to:

### Import Components
```tsx
import {
  Button,
  Text,
  Card,
  Input,
  OfferCard,
  StatCard,
  Tabs
} from '@/components/ui';
```

### Combine Components
```tsx
function MyPage() {
  return (
    <VStack space="lg">
      <Card>
        <CardHeader>
          <Heading level={1}>Page Title</Heading>
        </CardHeader>
        <CardContent>
          <Text>Content goes here</Text>
        </CardContent>
      </Card>
    </VStack>
  );
}
```

### Handle State
```tsx
const [activeTab, setActiveTab] = useState('overview');
const [searchQuery, setSearchQuery] = useState('');

<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

## Design System Adherence

All examples follow the Style_spec.md guidelines:

- **Colors**: Semantic design tokens for consistency
- **Typography**: Proper size and weight scales
- **Spacing**: Consistent spacing system
- **Accessibility**: Focus states, ARIA labels, keyboard navigation
- **Responsive**: Mobile-first design principles

## Customization

Each example includes realistic data and interactions to demonstrate:

- Component composition
- State management patterns
- Event handling
- Conditional rendering
- Responsive layouts

Modify these examples to fit your specific use cases or create new ones following the same patterns.

## Component API Reference

For detailed component APIs, see `/components/README.md` which includes:
- Props documentation
- Usage examples
- TypeScript interfaces
- Design system integration

