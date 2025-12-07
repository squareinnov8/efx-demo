import { useState } from 'react'
import { Container, HStack, Card, CardHeader, Button, Grid } from '../components'

// Import all new components
import { Avatar, AvatarGroup } from '../components/primitives/Avatar'
import { Testimonial, TestimonialGrid } from '../components/marketing/Testimonial'
import { StatItem, StatsGrid, StatsSection } from '../components/marketing/Stats'
import { FeatureCard, FeatureGrid } from '../components/marketing/Feature'
import { Accordion } from '../components/content/Accordion'
import { Steps, ProgressBar } from '../components/navigation/Steps'
import { Breadcrumb } from '../components/navigation/Breadcrumb'
import { Banner, TopBanner } from '../components/feedback/Banner'
import { EmptyState, NoResults } from '../components/feedback/EmptyState'
import { TeamCard, TeamGrid } from '../components/marketing/TeamCard'
import { FileUpload } from '../components/forms/FileUpload'
import { Pagination } from '../components/navigation/Pagination'
import { Table, TableContainer, TableBadge } from '../components/data/Table'
import { Newsletter, NewsletterSection } from '../components/marketing/Newsletter'
import { SocialProof } from '../components/marketing/LogoCloud'
import { Hero } from '../components/marketing/Hero'

// Sample icons
const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

interface ComponentShowcaseProps {
  onBack?: () => void
}

export function ComponentShowcase({ onBack }: ComponentShowcaseProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentStep, setCurrentStep] = useState(1)

  // Sample table data
  const tableColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <TableBadge variant={value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'error'}>
          {value}
        </TableBadge>
      ),
    },
  ]

  const tableData = [
    { name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Doe', email: 'jane@example.com', role: 'User', status: 'Active' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Pending' },
    { name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Inactive' },
  ]

  // FAQ items
  const faqItems = [
    { title: 'What is a credit score?', content: 'A credit score is a three-digit number that represents your creditworthiness. It helps lenders determine how likely you are to repay a loan.' },
    { title: 'How can I improve my credit score?', content: 'Pay your bills on time, keep credit utilization low, maintain a long credit history, and regularly check your credit report for errors.' },
    { title: 'How often is my credit report updated?', content: 'Credit reports are typically updated monthly when your lenders report your account activity to the credit bureaus.' },
  ]

  // Steps data
  const steps = [
    { label: 'Account Setup', description: 'Create your account' },
    { label: 'Verification', description: 'Verify your identity' },
    { label: 'Subscription', description: 'Choose your plan' },
    { label: 'Complete', description: 'Start monitoring' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Banner */}
      <TopBanner variant="primary">
        New Feature: 20+ Untitled UI-style components now available!
      </TopBanner>

      {/* Hero Section */}
      <Hero
        badge="Component Library"
        title={<>Build Beautiful UIs with <span className="text-primary-500">Equifax Components</span></>}
        description="A comprehensive collection of 20+ professionally designed components, themed with Equifax brand colors and ready for production use."
        primaryAction={{ label: 'Get Started', href: '#components' }}
        secondaryAction={{ label: 'View Documentation', onClick: onBack }}
        variant="centered"
        background="light"
      />

      {/* Stats Section */}
      <StatsSection title="Component Library at a Glance" variant="light">
        <StatsGrid columns={4}>
          <StatItem value="20+" label="Components" description="Ready to use" />
          <StatItem value="100%" label="TypeScript" description="Full type safety" />
          <StatItem value="A11y" label="Accessible" description="WCAG compliant" />
          <StatItem value="<10KB" label="Bundle Size" description="Per component" />
        </StatsGrid>
      </StatsSection>

      <Container size="xl" className="py-12">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-8">
          ← Back to Main Demo
        </Button>

        {/* Components Grid */}
        <section id="components">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">All Components</h2>

          {/* Avatar & Team */}
          <Card className="mb-8">
            <CardHeader title="Avatars & Team Cards" subtitle="User representation components" />
            <div className="p-6">
              <h4 className="text-sm font-medium text-neutral-700 mb-4">Avatars</h4>
              <HStack spacing={4} className="mb-8">
                <Avatar name="John Doe" size="xs" />
                <Avatar name="Jane Smith" size="sm" />
                <Avatar name="Bob Johnson" size="md" status="online" />
                <Avatar name="Alice Brown" size="lg" status="away" />
                <Avatar name="Charlie Wilson" size="xl" status="busy" />
              </HStack>

              <h4 className="text-sm font-medium text-neutral-700 mb-4">Avatar Group</h4>
              <AvatarGroup max={4}>
                <Avatar name="User 1" />
                <Avatar name="User 2" />
                <Avatar name="User 3" />
                <Avatar name="User 4" />
                <Avatar name="User 5" />
                <Avatar name="User 6" />
              </AvatarGroup>

              <h4 className="text-sm font-medium text-neutral-700 mb-4 mt-8">Team Cards</h4>
              <TeamGrid columns={3}>
                <TeamCard
                  name="Sarah Johnson"
                  role="CEO & Founder"
                  bio="Leading the company vision"
                  socialLinks={[
                    { platform: 'linkedin', href: '#' },
                    { platform: 'twitter', href: '#' },
                  ]}
                />
                <TeamCard
                  name="Michael Chen"
                  role="CTO"
                  bio="Engineering excellence"
                  variant="card"
                  socialLinks={[
                    { platform: 'github', href: '#' },
                    { platform: 'linkedin', href: '#' },
                  ]}
                />
                <TeamCard
                  name="Emily Davis"
                  role="Head of Design"
                  bio="Creating beautiful experiences"
                  variant="card"
                />
              </TeamGrid>
            </div>
          </Card>

          {/* Features */}
          <Card className="mb-8">
            <CardHeader title="Feature Cards" subtitle="Highlight product features" />
            <div className="p-6">
              <FeatureGrid columns={3}>
                <FeatureCard
                  icon={<ShieldIcon />}
                  title="Identity Protection"
                  description="Monitor and protect your personal information from identity theft."
                />
                <FeatureCard
                  icon={<ChartIcon />}
                  title="Credit Monitoring"
                  description="Track your credit score and get alerts on important changes."
                  variant="centered"
                />
                <FeatureCard
                  icon={<BellIcon />}
                  title="Real-time Alerts"
                  description="Get instant notifications about suspicious activity."
                  variant="horizontal"
                />
              </FeatureGrid>
            </div>
          </Card>

          {/* Testimonials */}
          <Card className="mb-8">
            <CardHeader title="Testimonials" subtitle="Customer reviews and feedback" />
            <div className="p-6">
              <TestimonialGrid columns={3}>
                <Testimonial
                  quote="Equifax helped me understand my credit score and improve it significantly."
                  author={{ name: 'John Smith', title: 'Small Business Owner' }}
                  rating={5}
                  variant="card"
                />
                <Testimonial
                  quote="The identity protection service gave me peace of mind."
                  author={{ name: 'Jane Doe', title: 'Marketing Director', company: 'TechCorp' }}
                  rating={5}
                  variant="card"
                />
                <Testimonial
                  quote="Excellent customer service and easy-to-use platform."
                  author={{ name: 'Bob Johnson', title: 'Freelancer' }}
                  rating={4}
                  variant="card"
                />
              </TestimonialGrid>
            </div>
          </Card>

          {/* Navigation Components */}
          <Card className="mb-8">
            <CardHeader title="Navigation Components" subtitle="Steps, breadcrumbs, and pagination" />
            <div className="p-6 space-y-8">
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-4">Breadcrumb</h4>
                <Breadcrumb
                  items={[
                    { label: 'Products', href: '#' },
                    { label: 'Credit Monitoring', href: '#' },
                    { label: 'Complete Premier' },
                  ]}
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-4">Steps (Horizontal)</h4>
                <Steps steps={steps} currentStep={currentStep} />
                <HStack spacing={2} className="mt-4">
                  <Button size="sm" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>Previous</Button>
                  <Button size="sm" onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}>Next</Button>
                </HStack>
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-4">Progress Bar</h4>
                <ProgressBar value={65} label="Profile Completion" showValue variant="default" />
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-4">Pagination</h4>
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                  showFirstLast
                />
              </div>
            </div>
          </Card>

          {/* Feedback Components */}
          <Card className="mb-8">
            <CardHeader title="Feedback Components" subtitle="Banners, alerts, and states" />
            <div className="p-6 space-y-6">
              <Banner variant="info" title="Information">
                Your credit report has been updated with the latest information.
              </Banner>
              <Banner variant="success" title="Success" dismissible>
                Your subscription has been activated successfully.
              </Banner>
              <Banner variant="warning" title="Warning">
                Your payment method will expire in 7 days.
              </Banner>
              <Banner variant="error" title="Error">
                We couldn't process your request. Please try again.
              </Banner>

              <div className="pt-6">
                <h4 className="text-sm font-medium text-neutral-700 mb-4">Empty States</h4>
                <Grid cols={1} colsMd={2} gap={6}>
                  <EmptyState
                    title="No reports yet"
                    description="Your credit reports will appear here once you subscribe."
                    action={{ label: 'Subscribe Now' }}
                    variant="card"
                  />
                  <NoResults searchQuery="credit score tips" onClear={() => {}} />
                </Grid>
              </div>
            </div>
          </Card>

          {/* Data Table */}
          <Card className="mb-8">
            <CardHeader title="Data Table" subtitle="Display and manage data" />
            <div className="p-6">
              <TableContainer
                title="Team Members"
                description="A list of all team members in your organization"
                actions={<Button size="sm">Add Member</Button>}
              >
                <Table columns={tableColumns} data={tableData} variant="striped" />
              </TableContainer>
            </div>
          </Card>

          {/* Forms */}
          <Card className="mb-8">
            <CardHeader title="Form Components" subtitle="File upload and more" />
            <div className="p-6">
              <Grid cols={1} colsMd={2} gap={6}>
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-4">File Upload (Default)</h4>
                  <FileUpload
                    accept=".pdf,.doc,.docx"
                    onFilesSelected={(files) => console.log('Files:', files)}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-4">File Upload (Compact)</h4>
                  <FileUpload variant="compact" />
                </div>
              </Grid>
            </div>
          </Card>

          {/* FAQ Accordion */}
          <Card className="mb-8">
            <CardHeader title="FAQ Accordion" subtitle="Expandable content sections" />
            <div className="p-6">
              <Accordion items={faqItems} variant="bordered" />
            </div>
          </Card>

          {/* Newsletter */}
          <Card className="mb-8">
            <CardHeader title="Newsletter" subtitle="Email subscription forms" />
            <div className="p-6">
              <Grid cols={1} colsMd={2} gap={8}>
                <Newsletter variant="inline" />
                <Newsletter variant="stacked" title="Stay Updated" />
              </Grid>
            </div>
          </Card>

          {/* Social Proof */}
          <Card className="mb-8">
            <CardHeader title="Social Proof" subtitle="Trust indicators and logos" />
            <div className="p-6">
              <SocialProof
                stats={[
                  { value: '1M+', label: 'Active Users' },
                  { value: '99.9%', label: 'Uptime' },
                  { value: '24/7', label: 'Support' },
                  { value: '4.9/5', label: 'Rating' },
                ]}
                variant="centered"
              />
            </div>
          </Card>
        </section>
      </Container>

      {/* Newsletter CTA Section */}
      <NewsletterSection
        title="Stay Protected"
        description="Subscribe to receive credit alerts and identity protection tips."
        variant="dark"
      />
    </div>
  )
}
