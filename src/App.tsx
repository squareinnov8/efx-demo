import { useState } from 'react'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardFooter,
  Badge,
  Checkbox,
  RadioGroup,
  Toggle,
  Select,
  Container,
  HStack,
  VStack,
  Grid,
  Alert,
  Modal,
  Toast,
  ToastContainer,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  HeaderNavigation,
  TopBar,
} from './components'
import { KnowledgeBase } from './pages/KnowledgeBase'
import { ArticlePage } from './pages/ArticlePage'
import { ComponentShowcase } from './pages/ComponentShowcase'
import { navigationItems, topBarLeftItems, topBarRightItems } from './data/navigation'

type Page = 'components' | 'knowledge-base' | 'article' | 'education' | 'showcase'

// Equifax Logo Component
const EquifaxLogo = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="flex items-center gap-2">
    <svg className="h-8 w-auto" viewBox="0 0 150 28" fill="none">
      {/* Equifax-style logo */}
      <rect x="0" y="0" width="28" height="28" rx="2" fill="#C8102E" />
      <text x="6" y="20" fill="white" fontSize="16" fontWeight="bold" fontFamily="Montserrat, sans-serif">E</text>
      <text x="36" y="20" fill="#C8102E" fontSize="18" fontWeight="700" fontFamily="Montserrat, sans-serif">equifax</text>
    </svg>
  </button>
)

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('components')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [selectedTab, setSelectedTab] = useState('components')
  const [radioValue, setRadioValue] = useState('option1')
  const [toggleValue, setToggleValue] = useState(false)

  // Handle navigation
  const handleNavigate = (href: string) => {
    if (href.includes('education') || href.includes('/education')) {
      setCurrentPage('knowledge-base')
    } else if (href === '/article') {
      setCurrentPage('article')
    } else if (href === '/' || href.includes('components')) {
      setCurrentPage('components')
    }
    // In a real app, this would use a router
    console.log('Navigate to:', href)
  }

  // Shared Header Component
  const SharedHeader = () => (
    <HeaderNavigation
      sticky
      logo={<EquifaxLogo onClick={() => setCurrentPage('components')} />}
      items={navigationItems}
      onNavigate={handleNavigate}
      topBar={
        <TopBar
          leftItems={topBarLeftItems}
          rightItems={topBarRightItems}
          onNavigate={handleNavigate}
        />
      }
      actions={
        <HStack spacing={3}>
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </HStack>
      }
    />
  )

  // Page router
  if (currentPage === 'knowledge-base') {
    return (
      <>
        <SharedHeader />
        <KnowledgeBase onBack={() => setCurrentPage('components')} />
      </>
    )
  }

  if (currentPage === 'article') {
    return (
      <>
        <SharedHeader />
        <ArticlePage onBack={() => setCurrentPage('components')} />
      </>
    )
  }

  if (currentPage === 'showcase') {
    return (
      <ComponentShowcase onBack={() => setCurrentPage('components')} />
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header with Mega Menu Navigation */}
      <SharedHeader />

      <Container size="xl" className="py-12">
        {/* Hero Section */}
        <VStack spacing={4} className="text-center mb-16">
          <Badge variant="gold" size="lg">Design System</Badge>
          <h1 className="text-5xl font-bold text-neutral-900">
            Equifax Component Library
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            A professional React component library built with the Equifax brand identity.
            Enterprise-grade components for building trusted financial applications.
          </p>
          <HStack spacing={4} className="mt-4" wrap>
            <Button size="lg" onClick={() => setCurrentPage('showcase')}>
              View Component Showcase
            </Button>
            <Button variant="outline" size="lg" onClick={() => setCurrentPage('knowledge-base')}>
              Knowledge Base Demo
            </Button>
            <Button variant="ghost" size="lg" onClick={() => setCurrentPage('article')}>
              Article Page
            </Button>
          </HStack>
        </VStack>

        {/* Navigation Demo Card */}
        <Card className="mb-8 border-2 border-primary-200 bg-primary-50/50">
          <div className="p-6">
            <HStack spacing={4} align="start">
              <div className="shrink-0 w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-900">
                  Hierarchical Navigation
                </h3>
                <p className="mt-1 text-primary-700">
                  Hover over the navigation items above to see the Untitled UI-style mega-menu dropdowns.
                  The navigation replicates the full Equifax.com structure with Products, Credit Report Help, Learn (Education), Credit Offers, and Support.
                </p>
                <HStack spacing={2} className="mt-3">
                  <Badge variant="primary" size="sm">Mega Menu</Badge>
                  <Badge variant="secondary" size="sm">Mobile Responsive</Badge>
                  <Badge variant="gold" size="sm">Icon Support</Badge>
                </HStack>
              </div>
            </HStack>
          </div>
        </Card>

        {/* Tabs for sections */}
        <Tabs value={selectedTab} onChange={setSelectedTab} variant="line">
          <TabList>
            <Tab value="components">Components</Tab>
            <Tab value="forms">Forms</Tab>
            <Tab value="feedback">Feedback</Tab>
          </TabList>

          <TabPanel value="components">
            <Grid cols={1} colsMd={2} colsLg={3} gap={6} className="mt-8">
              {/* Buttons Card */}
              <Card>
                <CardHeader title="Buttons" subtitle="Primary action elements" />
                <VStack spacing={4}>
                  <HStack spacing={3} wrap>
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                  </HStack>
                  <HStack spacing={3} wrap>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button isLoading>Loading</Button>
                  </HStack>
                  <HStack spacing={3}>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </HStack>
                </VStack>
              </Card>

              {/* Badges Card */}
              <Card>
                <CardHeader title="Badges" subtitle="Status indicators" />
                <VStack spacing={4}>
                  <HStack spacing={2} wrap>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="gold">Gold</Badge>
                  </HStack>
                  <HStack spacing={2} wrap>
                    <Badge variant="success" dot>Success</Badge>
                    <Badge variant="warning" dot>Warning</Badge>
                    <Badge variant="error" dot>Error</Badge>
                    <Badge variant="info" dot>Info</Badge>
                  </HStack>
                </VStack>
              </Card>

              {/* Typography Card */}
              <Card>
                <CardHeader title="Typography" subtitle="Montserrat & Inter" />
                <VStack spacing={3} align="start">
                  <h1 className="text-2xl">Heading 1</h1>
                  <h2 className="text-xl">Heading 2</h2>
                  <h3 className="text-lg">Heading 3</h3>
                  <p className="text-neutral-600">
                    Body text using Inter for optimal readability in long-form content.
                  </p>
                  <p className="text-sm text-neutral-500">
                    Small text for captions and metadata.
                  </p>
                </VStack>
              </Card>

              {/* Colors Card */}
              <Card className="col-span-full lg:col-span-2">
                <CardHeader title="Color Palette" subtitle="Equifax brand colors" />
                <VStack spacing={4}>
                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-2">Primary</p>
                    <HStack spacing={2}>
                      <div className="w-12 h-12 rounded-md bg-primary-100" title="100" />
                      <div className="w-12 h-12 rounded-md bg-primary-300" title="300" />
                      <div className="w-12 h-12 rounded-md bg-primary-500" title="500" />
                      <div className="w-12 h-12 rounded-md bg-primary-700" title="700" />
                      <div className="w-12 h-12 rounded-md bg-primary-900" title="900" />
                    </HStack>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-2">Neutral</p>
                    <HStack spacing={2}>
                      <div className="w-12 h-12 rounded-md bg-neutral-100 border" title="100" />
                      <div className="w-12 h-12 rounded-md bg-neutral-300" title="300" />
                      <div className="w-12 h-12 rounded-md bg-neutral-500" title="500" />
                      <div className="w-12 h-12 rounded-md bg-neutral-700" title="700" />
                      <div className="w-12 h-12 rounded-md bg-neutral-900" title="900" />
                    </HStack>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-2">Accent</p>
                    <HStack spacing={2}>
                      <div className="w-12 h-12 rounded-md bg-gold-light" title="Gold Light" />
                      <div className="w-12 h-12 rounded-md bg-gold" title="Gold" />
                      <div className="w-12 h-12 rounded-md bg-gold-dark" title="Gold Dark" />
                      <div className="w-12 h-12 rounded-md bg-accent-blue-light" title="Blue Light" />
                      <div className="w-12 h-12 rounded-md bg-accent-blue" title="Blue" />
                    </HStack>
                  </div>
                </VStack>
              </Card>

              {/* Card Variants */}
              <Card variant="outlined">
                <CardHeader title="Card Variants" subtitle="Different styles" />
                <VStack spacing={3}>
                  <Card variant="elevated" padding="sm">
                    <p className="text-sm">Elevated card</p>
                  </Card>
                  <Card variant="outlined" padding="sm">
                    <p className="text-sm">Outlined card</p>
                  </Card>
                  <Card variant="filled" padding="sm">
                    <p className="text-sm">Filled card</p>
                  </Card>
                </VStack>
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel value="forms">
            <Grid cols={1} colsMd={2} gap={6} className="mt-8">
              {/* Inputs Card */}
              <Card>
                <CardHeader title="Input Fields" subtitle="Text input variations" />
                <VStack spacing={4}>
                  <Input label="Email Address" placeholder="you@example.com" />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    helperText="Must be at least 8 characters"
                  />
                  <Input
                    label="With Error"
                    error="This field is required"
                    defaultValue="Invalid input"
                  />
                  <Input
                    label="Disabled"
                    disabled
                    defaultValue="Cannot edit"
                  />
                </VStack>
              </Card>

              {/* Select Card */}
              <Card>
                <CardHeader title="Select" subtitle="Dropdown selection" />
                <VStack spacing={4}>
                  <Select
                    label="Country"
                    placeholder="Select a country"
                    options={[
                      { value: 'us', label: 'United States' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'uk', label: 'United Kingdom' },
                      { value: 'au', label: 'Australia' },
                    ]}
                  />
                  <Select
                    label="With Error"
                    error="Please select an option"
                    options={[
                      { value: '1', label: 'Option 1' },
                      { value: '2', label: 'Option 2' },
                    ]}
                  />
                </VStack>
              </Card>

              {/* Checkboxes & Toggles */}
              <Card>
                <CardHeader title="Checkboxes & Toggles" subtitle="Boolean inputs" />
                <VStack spacing={4}>
                  <Checkbox
                    label="Accept terms and conditions"
                    description="You agree to our Terms of Service and Privacy Policy"
                  />
                  <Checkbox
                    label="Subscribe to newsletter"
                    defaultChecked
                  />
                  <Checkbox
                    label="Disabled option"
                    disabled
                  />
                  <hr className="border-neutral-200" />
                  <Toggle
                    label="Enable notifications"
                    description="Receive email updates"
                    checked={toggleValue}
                    onChange={() => setToggleValue(!toggleValue)}
                  />
                  <Toggle
                    label="Dark mode"
                    size="sm"
                  />
                </VStack>
              </Card>

              {/* Radio Groups */}
              <Card>
                <CardHeader title="Radio Groups" subtitle="Single selection" />
                <RadioGroup
                  name="plan"
                  label="Select a plan"
                  value={radioValue}
                  onChange={setRadioValue}
                  options={[
                    { value: 'option1', label: 'Equifax Complete', description: '$9.95/month' },
                    { value: 'option2', label: 'Complete Premier', description: '$19.95/month' },
                    { value: 'option3', label: 'Family Plan', description: '$29.95/month' },
                  ]}
                />
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel value="feedback">
            <Grid cols={1} colsMd={2} gap={6} className="mt-8">
              {/* Alerts */}
              <Card className="col-span-full">
                <CardHeader title="Alerts" subtitle="Contextual messages" />
                <VStack spacing={4}>
                  <Alert variant="info" title="Information">
                    Your credit report will be updated within 24 hours.
                  </Alert>
                  <Alert variant="success" title="Success">
                    Your payment has been processed successfully.
                  </Alert>
                  <Alert variant="warning" title="Warning">
                    Your subscription will expire in 7 days.
                  </Alert>
                  <Alert
                    variant="error"
                    title="Error"
                    onClose={() => {}}
                  >
                    We couldn't verify your identity. Please try again.
                  </Alert>
                </VStack>
              </Card>

              {/* Modal Demo */}
              <Card>
                <CardHeader title="Modal" subtitle="Dialog windows" />
                <Button onClick={() => setIsModalOpen(true)}>
                  Open Modal
                </Button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Confirm Action"
                  description="Are you sure you want to proceed with this action?"
                  footer={
                    <HStack spacing={3} justify="end">
                      <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>
                        Confirm
                      </Button>
                    </HStack>
                  }
                >
                  <p className="text-neutral-600">
                    This action cannot be undone. Please make sure you want to proceed.
                  </p>
                </Modal>
              </Card>

              {/* Toast Demo */}
              <Card>
                <CardHeader title="Toast" subtitle="Notification messages" />
                <Button onClick={() => setShowToast(true)}>
                  Show Toast
                </Button>
              </Card>
            </Grid>
          </TabPanel>
        </Tabs>

        {/* Page Demo Cards */}
        <section className="mt-16 pt-12 border-t border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Page Templates
          </h2>
          <Grid cols={1} colsMd={3} gap={6}>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-primary-200"
              onClick={() => setCurrentPage('showcase')}
            >
              <div className="aspect-video bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-t-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <CardHeader
                title="Component Showcase"
                subtitle="20+ Untitled UI-style components themed with Equifax colors"
              />
              <div className="px-4 pb-4">
                <Badge variant="gold" size="sm">Featured</Badge>
              </div>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentPage('knowledge-base')}
            >
              <div className="aspect-video bg-primary-500 rounded-t-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <CardHeader
                title="Knowledge Base"
                subtitle="Article listing page with tiles, categories, and load more"
              />
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentPage('article')}
            >
              <div className="aspect-video bg-neutral-800 rounded-t-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <CardHeader
                title="Article Page"
                subtitle="Full article template with rich content, related articles, and CTAs"
              />
            </Card>
          </Grid>
        </section>

        {/* Footer */}
        <Card variant="filled" className="mt-16">
          <CardFooter>
            <HStack justify="between" align="center">
              <p className="text-sm text-neutral-500">
                Built with the Equifax Design System
              </p>
              <HStack spacing={4}>
                <Badge variant="secondary" size="sm">v1.0.0</Badge>
                <Badge variant="success" size="sm" dot>Stable</Badge>
              </HStack>
            </HStack>
          </CardFooter>
        </Card>
      </Container>

      {/* Toast Container */}
      {showToast && (
        <ToastContainer position="top-right">
          <Toast
            variant="success"
            title="Changes saved"
            description="Your preferences have been updated successfully."
            onClose={() => setShowToast(false)}
          />
        </ToastContainer>
      )}
    </div>
  )
}

export default App
