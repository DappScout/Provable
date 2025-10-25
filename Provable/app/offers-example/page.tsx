"use client";
import React, { useState } from 'react';
import {
  Button,
  Text,
  Heading,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  OfferCard,
  StatCard,
  Tabs,
  PillToggle,
  ProgressBar,
  InfoRow,
  Badge,
  VStack,
  HStack
} from '@/components/ui';
import { ArrowLeft, MessageCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function OffersExample() {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'messages', label: 'Messages' }
  ];

  const offerDetails = {
    title: "Domain.com SEO Growth Campaign",
    client: "Domain.com",
    budget: "$2,500.00",
    deadline: "25-10-25",
    status: "In Progress",
    progress: 65,
    description: "Comprehensive SEO campaign to improve Domain.com's search rankings and organic traffic. Focus on technical SEO, content optimization, and link building strategies.",
    requirements: [
      "Technical SEO audit and fixes",
      "Content optimization for target keywords",
      "Monthly reporting and analysis",
      "Link building campaign"
    ]
  };

  const analytics = [
    { label: "Organic Traffic", value: "+45%", trend: "up" as const },
    { label: "Keyword Rankings", value: "+12", trend: "up" as const },
    { label: "Backlinks", value: "+28", trend: "up" as const },
    { label: "Conversion Rate", value: "+8%", trend: "up" as const }
  ];

  return (
    <div className="min-h-screen bg-[--color-bg-dark]">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <VStack space="xl">
          {/* Header */}
          <HStack space="md" className="items-center">
            <Button variant="alt1" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <VStack space="xs">
              <Heading level={1}>{offerDetails.title}</Heading>
              <HStack space="sm" className="items-center">
                <Badge variant="info">In Progress</Badge>
                <Text size="sm" color="secondary">29 days remaining</Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Quick Actions */}
          <HStack space="md">
            <Button variant="primary">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Client
            </Button>
            <Button variant="secondary">Update Progress</Button>
            <Button variant="alt2">End Contract</Button>
          </HStack>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <Heading level={2}>Project Progress</Heading>
            </CardHeader>
            <CardContent>
              <VStack space="md">
                <ProgressBar
                  value={offerDetails.progress}
                  label="Overall Completion"
                  showPercentage
                />
                <Text size="sm" color="secondary">
                  {offerDetails.progress}% of the project milestones have been completed.
                </Text>
              </VStack>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'details' && (
            <VStack space="lg">
              <Card>
                <CardHeader>
                  <Heading level={2}>Project Details</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    <Text>{offerDetails.description}</Text>

                    <VStack space="sm">
                      <Text weight="medium">Requirements:</Text>
                      <ul className="list-disc list-inside space-y-1">
                        {offerDetails.requirements.map((req, index) => (
                          <li key={index}>
                            <Text size="sm" color="secondary">{req}</Text>
                          </li>
                        ))}
                      </ul>
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Contract Information</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="sm">
                    <InfoRow label="Client" value={offerDetails.client} />
                    <InfoRow label="Budget" value={offerDetails.budget} variant="success" />
                    <InfoRow label="Deadline" value={offerDetails.deadline} />
                    <InfoRow label="Status" value={offerDetails.status} />
                    <InfoRow label="Progress" value={`${offerDetails.progress}%`} />
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Recent Updates</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    <VStack space="sm">
                      <HStack space="sm" className="items-center">
                        <CheckCircle className="w-4 h-4 text-[--color-success]" />
                        <Text size="sm" weight="medium">Technical SEO audit completed</Text>
                        <Text size="xs" color="secondary" className="ml-auto">2 days ago</Text>
                      </HStack>
                      <Text size="sm" color="secondary" className="ml-6">
                        Fixed 15 technical issues and improved site speed by 25%
                      </Text>
                    </VStack>

                    <VStack space="sm">
                      <HStack space="sm" className="items-center">
                        <Clock className="w-4 h-4 text-[--color-warning]" />
                        <Text size="sm" weight="medium">Content optimization in progress</Text>
                        <Text size="xs" color="secondary" className="ml-auto">1 day ago</Text>
                      </HStack>
                      <Text size="sm" color="secondary" className="ml-6">
                        Optimizing 20 key pages for target keywords
                      </Text>
                    </VStack>

                    <VStack space="sm">
                      <HStack space="sm" className="items-center">
                        <CheckCircle className="w-4 h-4 text-[--color-success]" />
                        <Text size="sm" weight="medium">Initial keyword research completed</Text>
                        <Text size="xs" color="secondary" className="ml-auto">1 week ago</Text>
                      </HStack>
                      <Text size="sm" color="secondary" className="ml-6">
                        Identified 50 target keywords with high commercial intent
                      </Text>
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}

          {activeTab === 'analytics' && (
            <VStack space="lg">
              <Card>
                <CardHeader>
                  <Heading level={2}>Performance Metrics</Heading>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {analytics.map((metric, index) => (
                      <StatCard
                        key={index}
                        value={metric.value}
                        label={metric.label}
                        trend={metric.trend}
                        size="small"
                      />
                    ))}
                  </div>

                  <VStack space="md">
                    <Text weight="medium">Traffic Trends</Text>
                    <div className="space-y-3">
                      <VStack space="sm">
                        <HStack space="sm" className="justify-between">
                          <Text size="sm">Organic Search Traffic</Text>
                          <Text size="sm" color="secondary">+45%</Text>
                        </HStack>
                        <ProgressBar value={75} />
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm" className="justify-between">
                          <Text size="sm">Keyword Rankings</Text>
                          <Text size="sm" color="secondary">+12 positions</Text>
                        </HStack>
                        <ProgressBar value={60} />
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm" className="justify-between">
                          <Text size="sm">Backlink Growth</Text>
                          <Text size="sm" color="secondary">+28 links</Text>
                        </HStack>
                        <ProgressBar value={85} />
                      </VStack>
                    </div>
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Monthly Reports</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    <VStack space="sm">
                      <HStack space="sm" className="justify-between">
                        <Text size="sm" weight="medium">October 2025 Report</Text>
                        <Button variant="alt1" size="sm">Download PDF</Button>
                      </HStack>
                      <Text size="xs" color="secondary">
                        Comprehensive analysis of SEO performance and recommendations
                      </Text>
                    </VStack>

                    <VStack space="sm">
                      <HStack space="sm" className="justify-between">
                        <Text size="sm" weight="medium">September 2025 Report</Text>
                        <Button variant="alt1" size="sm">Download PDF</Button>
                      </HStack>
                      <Text size="xs" color="secondary">
                        Mid-project progress report with detailed metrics
                      </Text>
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}

          {activeTab === 'messages' && (
            <VStack space="lg">
              <Card>
                <CardHeader>
                  <Heading level={2}>Messages</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="lg">
                    <VStack space="md">
                      <VStack space="sm">
                        <HStack space="sm">
                          <div className="w-8 h-8 bg-[--color-primary-turquoise] rounded-full flex items-center justify-center">
                            <Text size="xs" weight="bold" color="tertiary">AS</Text>
                          </div>
                          <VStack space="xs">
                            <Text size="sm" weight="medium">Adam Smith</Text>
                            <Text size="xs" color="secondary">2 hours ago</Text>
                          </VStack>
                        </HStack>
                        <Text size="sm" color="secondary" className="ml-10">
                          Great progress on the technical SEO fixes! The site speed improvements are already showing in our analytics. Keep up the excellent work.
                        </Text>
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm">
                          <div className="w-8 h-8 bg-[--color-bg-secondary] rounded-full flex items-center justify-center">
                            <Text size="xs" weight="bold" color="primary">ME</Text>
                          </div>
                          <VStack space="xs">
                            <Text size="sm" weight="medium">You</Text>
                            <Text size="xs" color="secondary">1 hour ago</Text>
                          </VStack>
                        </HStack>
                        <Text size="sm" color="secondary" className="ml-10">
                          Thanks Adam! I've completed the content optimization for 15 of the 20 target pages. Should have the remaining 5 done by end of day tomorrow.
                        </Text>
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm">
                          <div className="w-8 h-8 bg-[--color-primary-turquoise] rounded-full flex items-center justify-center">
                            <Text size="xs" weight="bold" color="tertiary">AS</Text>
                          </div>
                          <VStack space="xs">
                            <Text size="sm" weight="medium">Adam Smith</Text>
                            <Text size="xs" color="secondary">30 minutes ago</Text>
                          </VStack>
                        </HStack>
                        <Text size="sm" color="secondary" className="ml-10">
                          Perfect! Looking forward to seeing the final results. The organic traffic has already increased by 35% since we started.
                        </Text>
                      </VStack>
                    </VStack>

                    <HStack space="md">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 h-10 px-3 bg-[--color-bg-card] border border-[--color-text-tertiary] rounded-md text-[--color-text-primary] placeholder:text-[--color-text-tertiary]"
                      />
                      <Button variant="primary">Send</Button>
                    </HStack>
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}
        </VStack>
      </div>
    </div>
  );
}

