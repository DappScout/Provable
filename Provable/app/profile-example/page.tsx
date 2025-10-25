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
  Avatar,
  Badge,
  ProgressBar,
  InfoRow,
  StatCard,
  Tabs,
  VStack,
  HStack,
  Modal,
  ModalFooter
} from '@/components/ui';
import { Edit, Settings, Award, TrendingUp, DollarSign, Users, Star } from 'lucide-react';

export default function ProfileExample() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'settings', label: 'Settings' }
  ];

  const profile = {
    name: "Sarah Johnson",
    title: "Senior SEO Specialist",
    location: "San Francisco, CA",
    bio: "Experienced SEO professional with 8+ years in digital marketing. Specializing in technical SEO, content strategy, and link building. Helped 200+ clients achieve their organic growth goals.",
    skills: ["Technical SEO", "Content Strategy", "Link Building", "Analytics", "Local SEO"],
    stats: {
      projectsCompleted: 127,
      avgRating: 4.9,
      totalEarnings: 284750,
      responseTime: "< 2 hours"
    },
    certifications: [
      "Google Analytics Certified",
      "Google Ads Certified",
      "HubSpot Content Marketing Certified"
    ]
  };

  const recentProjects = [
    {
      title: "E-commerce Site Rankings",
      client: "FashionStore.com",
      status: "completed",
      rating: 5,
      earnings: 3500,
      duration: "3 months"
    },
    {
      title: "Local SEO Campaign",
      client: "LocalRestaurant.com",
      status: "completed",
      rating: 5,
      earnings: 2200,
      duration: "2 months"
    },
    {
      title: "Content Strategy & Implementation",
      client: "TechBlog.net",
      status: "in-progress",
      rating: null,
      earnings: 4100,
      duration: "4 months"
    }
  ];

  return (
    <div className="min-h-screen bg-[--color-bg-dark]">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <VStack space="xl">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <HStack space="lg" className="items-start">
                <Avatar
                  name={profile.name}
                  size="large"
                />

                <VStack space="md" className="flex-1">
                  <VStack space="sm">
                    <HStack space="md" className="items-center">
                      <Heading level={1}>{profile.name}</Heading>
                      <Badge variant="success">Verified</Badge>
                    </HStack>

                    <Text size="lg" color="secondary">{profile.title}</Text>
                    <Text size="sm" color="tertiary">{profile.location}</Text>
                  </VStack>

                  <Text size="sm">{profile.bio}</Text>

                  {/* Skills */}
                  <HStack space="sm" className="flex-wrap">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="info">{skill}</Badge>
                    ))}
                  </HStack>
                </VStack>

                <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </HStack>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              value={profile.stats.projectsCompleted}
              label="Projects Completed"
              size="small"
            />
            <StatCard
              value={profile.stats.avgRating}
              label="Average Rating"
              size="small"
            />
            <StatCard
              value={`$${profile.stats.totalEarnings.toLocaleString()}`}
              label="Total Earnings"
              size="small"
            />
            <div className="bg-[--color-bg-card] border border-[--color-bg-secondary] rounded-md p-4">
              <VStack space="xs">
                <Text size="3xl" weight="bold">{profile.stats.responseTime}</Text>
                <Text size="xs" color="secondary">Response Time</Text>
              </VStack>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <VStack space="lg">
              <Card>
                <CardHeader>
                  <Heading level={2}>Certifications</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="sm">
                    {profile.certifications.map((cert, index) => (
                      <HStack key={index} space="sm" className="items-center">
                        <Award className="w-5 h-5 text-[--color-primary-turquoise]" />
                        <Text size="sm">{cert}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Recent Performance</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    <VStack space="sm">
                      <HStack space="sm" className="justify-between">
                        <Text size="sm">Client Satisfaction</Text>
                        <Text size="sm" color="secondary">98%</Text>
                      </HStack>
                      <ProgressBar value={98} />
                    </VStack>

                    <VStack space="sm">
                      <HStack space="sm" className="justify-between">
                        <Text size="sm">On-time Delivery</Text>
                        <Text size="sm" color="secondary">95%</Text>
                      </HStack>
                      <ProgressBar value={95} />
                    </VStack>

                    <VStack space="sm">
                      <HStack space="sm" className="justify-between">
                        <Text size="sm">Repeat Business</Text>
                        <Text size="sm" color="secondary">87%</Text>
                      </HStack>
                      <ProgressBar value={87} />
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}

          {activeTab === 'portfolio' && (
            <VStack space="lg">
              <Card>
                <CardHeader>
                  <Heading level={2}>Recent Projects</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    {recentProjects.map((project, index) => (
                      <Card key={index} variant="clickable">
                        <CardContent className="p-4">
                          <VStack space="sm">
                            <HStack space="sm" className="justify-between items-start">
                              <VStack space="xs">
                                <Text weight="medium">{project.title}</Text>
                                <Text size="sm" color="secondary">{project.client}</Text>
                              </VStack>
                              <Badge variant={project.status === 'completed' ? 'success' : 'info'}>
                                {project.status === 'completed' ? 'Completed' : 'In Progress'}
                              </Badge>
                            </HStack>

                            <HStack space="md" className="justify-between">
                              <InfoRow label="Duration" value={project.duration} />
                              <InfoRow label="Earnings" value={`$${project.earnings}`} variant="success" />
                              {project.rating && (
                                <HStack space="xs">
                                  <Star className="w-4 h-4 text-[--color-warning] fill-current" />
                                  <Text size="sm">{project.rating}</Text>
                                </HStack>
                              )}
                            </HStack>
                          </VStack>
                        </CardContent>
                      </Card>
                    ))}
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}

          {activeTab === 'reviews' && (
            <VStack space="lg">
              <Card>
                <CardHeader>
                  <Heading level={2}>Client Reviews</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="lg">
                    <VStack space="md">
                      <HStack space="sm" className="items-center">
                        <Avatar name="John Smith" size="small" />
                        <VStack space="xs">
                          <Text size="sm" weight="medium">John Smith</Text>
                          <HStack space="xs">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[--color-warning] fill-current" />
                            ))}
                          </HStack>
                        </VStack>
                        <Text size="xs" color="secondary" className="ml-auto">2 weeks ago</Text>
                      </HStack>
                      <Text size="sm" color="secondary">
                        "Sarah is an exceptional SEO specialist. She delivered exactly what was promised and the results exceeded our expectations. Highly recommend!"
                      </Text>
                    </VStack>

                    <VStack space="md">
                      <HStack space="sm" className="items-center">
                        <Avatar name="Emily Chen" size="small" />
                        <VStack space="xs">
                          <Text size="sm" weight="medium">Emily Chen</Text>
                          <HStack space="xs">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[--color-warning] fill-current" />
                            ))}
                          </HStack>
                        </VStack>
                        <Text size="xs" color="secondary" className="ml-auto">1 month ago</Text>
                      </HStack>
                      <Text size="sm" color="secondary">
                        "Professional, knowledgeable, and great communicator. Our organic traffic increased by 150% in just 4 months. Will definitely work with again."
                      </Text>
                    </VStack>

                    <VStack space="md">
                      <HStack space="sm" className="items-center">
                        <Avatar name="Mike Johnson" size="small" />
                        <VStack space="xs">
                          <Text size="sm" weight="medium">Mike Johnson</Text>
                          <HStack space="xs">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[--color-warning] fill-current" />
                            ))}
                            <Star className="w-4 h-4 text-[--color-text-tertiary]" />
                          </HStack>
                        </VStack>
                        <Text size="xs" color="secondary" className="ml-auto">2 months ago</Text>
                      </HStack>
                      <Text size="sm" color="secondary">
                        "Very satisfied with the technical SEO work. Site speed improved significantly and rankings are moving up. Only minor issue was with communication timing."
                      </Text>
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}

          {activeTab === 'settings' && (
            <VStack space="lg">
              <Card>
                <CardHeader>
                  <Heading level={2}>Account Settings</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    <InfoRow label="Email" value="sarah.johnson@example.com" variant="link" onValueClick={() => alert('Edit email')} />
                    <InfoRow label="Phone" value="+1 (555) 123-4567" variant="link" onValueClick={() => alert('Edit phone')} />
                    <InfoRow label="Location" value="San Francisco, CA" variant="link" onValueClick={() => alert('Edit location')} />
                    <InfoRow label="Timezone" value="PST (UTC-8)" variant="link" onValueClick={() => alert('Edit timezone')} />
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heading level={2}>Privacy & Security</Heading>
                </CardHeader>
                <CardContent>
                  <VStack space="md">
                    <InfoRow label="Profile Visibility" value="Public" variant="link" onValueClick={() => alert('Change visibility')} />
                    <InfoRow label="Contact Preferences" value="Email & Messages" variant="link" onValueClick={() => alert('Edit preferences')} />
                    <InfoRow label="Two-Factor Auth" value="Enabled" />
                    <Button variant="alt2" className="w-full mt-4">
                      Delete Account
                    </Button>
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          )}
        </VStack>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile">
        <VStack space="md">
          <Text size="sm" color="secondary">
            Profile editing functionality would go here. This demonstrates the Modal component.
          </Text>
        </VStack>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsEditModalOpen(false)}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

