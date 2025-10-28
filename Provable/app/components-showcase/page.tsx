"use client";
import React, { useState } from 'react';
import {
  Button,
  Text,
  Heading,
  Card,
  CardHeader,
  CardContent,
  Input,
  Select,
  DatePicker,
  PillToggle,
  Label,
  OfferCard,
  StatCard,
  ProfileCard,
  Tabs,
  SearchBar,
  ListItem,
  Avatar,
  Badge,
  ProgressBar,
  NotificationCard,
  SectionHeader,
  InfoRow,
  Modal,
  Fab,
  VStack,
  HStack
} from '@/components/ui';
import { User, Search, Calendar, Plus } from 'lucide-react';

export default function ComponentsShowcase() {
  const [activeTab, setActiveTab] = useState('forms');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedMetric, setSelectedMetric] = useState('impressions');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: 'forms', label: 'Form Components' },
    { id: 'cards', label: 'Cards & Layout' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'data', label: 'Data Display' },
    { id: 'utilities', label: 'Utilities' }
  ];

  return (
    <div className="min-h-screen bg-[--color-bg-dark] p-6">
      <div className="max-w-6xl mx-auto">
        <VStack space="xl">
          {/* Header */}
          <VStack space="md">
            <Heading level={1}>Component Library Showcase</Heading>
            <Text size="lg" color="secondary">
              A comprehensive showcase of all UI components following Style_spec.md
            </Text>
          </VStack>

          {/* Navigation Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Content based on active tab */}
          {activeTab === 'forms' && (
            <VStack space="xl">
              <SectionHeader>Form Components</SectionHeader>

              <Card>
                <CardHeader>
                  <Heading level={2}>Input Components</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="lg">
                    <VStack space="sm">
                      <Label htmlFor="basic-input">Basic Input</Label>
                      <Input
                        id="basic-input"
                        placeholder="Enter your text here..."
                      />
                    </VStack>

                    <VStack space="sm">
                      <Label htmlFor="search-input">Search Input</Label>
                      <Input
                        id="search-input"
                        variant="search"
                        placeholder="Search for something..."
                        leftIcon={<Search className="w-5 h-5" />}
                      />
                    </VStack>

                    <VStack space="sm">
                      <Label htmlFor="input-with-icons">Input with Icons</Label>
                      <Input
                        id="input-with-icons"
                        placeholder="With left and right icons"
                        leftIcon={<User className="w-5 h-5" />}
                        rightIcon={<Calendar className="w-5 h-5" />}
                      />
                    </VStack>

                    <VStack space="sm">
                      <Label htmlFor="error-input">Input with Error</Label>
                      <Input
                        id="error-input"
                        placeholder="This has an error"
                        error="This field is required"
                      />
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Select & Date Picker</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="lg">
                    <Select
                      label="Choose an option"
                      options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' }
                      ]}
                      placeholder="Select something"
                    />

                    <DatePicker
                      label="Select a date"
                      value={selectedDate}
                      onChange={(date) => setSelectedDate(date ?? undefined)}
                      placeholder="Choose a date"
                    />
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Pill Toggle</Heading>
                </CardHeader>
                <CardContent>
                  <PillToggle
                    options={[
                      { value: 'impressions', label: 'Impressions' },
                      { value: 'views', label: 'Views' },
                      { value: 'sales', label: 'Sales' }
                    ]}
                    value={selectedMetric}
                    onChange={setSelectedMetric}
                  />
                </CardContent>
              </Card>
            </VStack>
          )}

          {activeTab === 'cards' && (
            <VStack space="xl">
              <SectionHeader>Card Components</SectionHeader>

              <Card>
                <CardHeader>
                  <Heading level={2}>Basic Card</Heading>
                </CardHeader>
                <CardContent>
                  <Text>This is a basic card with header and content sections.</Text>
                </CardContent>
              </Card>

              <HStack space="lg" className="flex-wrap">
                <StatCard
                  value={855}
                  label="Impressions"
                  trend="up"
                  size="medium"
                />
                <StatCard
                  value={36}
                  label="Views"
                  trend="down"
                  size="medium"
                />
                <StatCard
                  value={24}
                  label="Sales"
                  trend="up"
                  size="medium"
                />
              </HStack>

              <OfferCard
                title="Domain.com SEO Growth"
                timeRemaining="29 days left"
                userName="Adam Smith"
                userSubtitle="Working on Domain.com"
                status="pending"
                statusText="In Progress"
              />

              <ProfileCard
                name="Sarah Johnson"
                subtitle="SEO Specialist"
                actionText="Message"
                onAction={() => alert('Message clicked!')}
              />
            </VStack>
          )}

          {activeTab === 'navigation' && (
            <VStack space="xl">
              <SectionHeader>Navigation Components</SectionHeader>

              <Card>
                <CardHeader>
                  <Heading level={2}>Search Bar</Heading>
                </CardHeader>
                <CardContent>
                  <SearchBar
                    placeholder="Search SEO specialists..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>List Items</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="sm">
                    <ListItem
                      name="John Doe"
                      subtitle="SEO Expert"
                      actionText="Message"
                      onAction={() => alert('Message John!')}
                    />
                    <ListItem
                      name="Jane Smith"
                      subtitle="Content Strategist"
                      actionText="View Profile"
                      onAction={() => alert('View Jane!')}
                    />
                    <ListItem
                      name="Mike Johnson"
                      subtitle="Technical SEO"
                      actionText="Connect"
                      onAction={() => alert('Connect with Mike!')}
                    />
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}

          {activeTab === 'data' && (
            <VStack space="xl">
              <SectionHeader>Data Display Components</SectionHeader>

              <HStack space="lg" className="flex-wrap">
                <VStack space="md">
                  <Text size="sm" weight="medium">Avatar Sizes</Text>
                  <HStack space="md">
                    <Avatar name="John Doe" size="sm" />
                    <Avatar name="John Doe" size="md" />
                    <Avatar name="John Doe" size="lg" />
                  </HStack>
                </VStack>

                <VStack space="md">
                  <Text size="sm" weight="medium">Badge Variants</Text>
                  <HStack space="sm" className="flex-wrap">
                    <Badge variant="success">Complete</Badge>
                    <Badge variant="warning">1 Alert</Badge>
                    <Badge variant="error">Disputed</Badge>
                    <Badge variant="info">29 days left</Badge>
                  </HStack>
                </VStack>
              </HStack>

              <Card>
                <CardHeader>
                  <Heading level={2}>Progress Bar</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="lg">
                    <ProgressBar value={75} label="Goal Progress" showPercentage />
                    <ProgressBar value={39} showPercentage />
                    <ProgressBar value={100} showPercentage />
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Notifications</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    <NotificationCard
                      type="success"
                      title="Offer Accepted"
                      message="Your offer has been accepted by the client"
                    />
                    <NotificationCard
                      type="warning"
                      title="Suspicious Activity"
                      message="Unusual login detected"
                      details="View Details"
                      onDetailsClick={() => alert('Details clicked!')}
                    />
                    <NotificationCard
                      type="info"
                      title="New Message"
                      message="You have a new message from Adam Smith"
                    />
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Info Rows</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="sm">
                    <InfoRow label="Client" value="Domain.com" />
                    <InfoRow label="Budget" value="$2,500.00" variant="success" />
                    <InfoRow label="Deadline" value="25-10-25" variant="link" onValueClick={() => alert('Date clicked!')} />
                    <InfoRow label="Status" value="1 alert" variant="warning" />
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}

          {activeTab === 'utilities' && (
            <VStack space="xl">
              <SectionHeader>Utility Components</SectionHeader>

              <Card>
                <CardHeader>
                  <Heading level={2}>Typography</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    <Heading level={1}>Heading Level 1 (24px)</Heading>
                    <Heading level={2}>Heading Level 2 (20px)</Heading>
                    <Heading level={3}>Heading Level 3 (16px)</Heading>
                    <Heading level={4}>Heading Level 4 (14px)</Heading>

                    <VStack space="sm">
                      <Text size="3xl" weight="bold" color="primary">Large Bold Text (48px)</Text>
                      <Text size="xl" weight="medium" color="primary">Medium Text (24px)</Text>
                      <Text size="md" color="secondary">Regular Text (16px)</Text>
                      <Text size="sm" color="tertiary">Small Text (14px)</Text>
                      <Text size="xs" color="tertiary">Extra Small Text (12px)</Text>
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Buttons</Heading>
                </CardHeader>
                <CardContent>
                  <HStack space="md" className="flex-wrap">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="alt1">Text Link</Button>
                    <Button variant="alt2">Danger Link</Button>
                    <Button variant="round">Round</Button>
                    <Button disabled>Disabled</Button>
                  </HStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Modal Demo</Heading>
                </CardHeader>
                <CardContent>
                  <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Open Modal
                  </Button>
                </CardContent>
              </Card>
            </VStack>
          )}
        </VStack>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Demo Modal">
        <VStack space="md">
          <Text>This is a demo modal to show how the Modal component works.</Text>
          <Text size="sm" color="secondary">
            It includes proper overlay, focus management, and escape key handling.
          </Text>
        </VStack>
      </Modal>

      {/* Floating Action Button */}
      <Fab
        onClick={() => alert('FAB clicked!')}
        position="bottom-right"
      >
        <Plus className="w-6 h-6" />
      </Fab>
    </div>
  );
}

