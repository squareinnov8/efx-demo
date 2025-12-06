import { useState } from 'react'
import { Container, Grid, Button, Input } from '../components'
import { ArticleCard, FeaturedArticleCard } from '../components/content'

// Sample avatars for authors
const avatars = {
  olivia: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  phoenix: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  lana: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  demi: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  candice: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
  natali: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
}

// Sample article data with enhanced info
const recentPosts = [
  {
    id: '1',
    title: 'Why Should I Check my Credit Reports and Credit Scores?',
    description: 'Your credit reports and credit scores are vital pieces of information that are important to your overall financial wellbeing.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60',
    href: '/articles/check-credit-reports',
    author: { name: 'Olivia Rhye', avatar: avatars.olivia },
    date: '20 Jan 2025',
    tags: [
      { label: 'Credit Reports', color: 'primary' as const },
      { label: 'Education', color: 'blue' as const },
    ],
  },
  {
    id: '2',
    title: 'Can You Remove Late Payments from Your Credit Reports?',
    description: 'Sometimes late payments happen. Learn how late payments impact your credit history and how long they stay.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60',
    href: '/articles/remove-late-payments',
    author: { name: 'Phoenix Baker', avatar: avatars.phoenix },
    date: '19 Jan 2025',
    tags: [
      { label: 'Payments', color: 'green' as const },
      { label: 'Tips', color: 'gray' as const },
    ],
  },
  {
    id: '3',
    title: 'What Does That Mean? A Guide to Credit Report Terminology',
    description: 'When reviewing your credit report, you might not know what some terms mean. We define common words.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60',
    href: '/articles/credit-terminology',
    author: { name: 'Lana Steiner', avatar: avatars.lana },
    date: '18 Jan 2025',
    tags: [
      { label: 'Terminology', color: 'purple' as const },
      { label: 'Guide', color: 'gray' as const },
    ],
  },
]

const allPosts = [
  {
    id: '4',
    title: 'What Is a Credit Report and What Is on It?',
    description: 'Learn what a credit report is! Read about the nationwide consumer reporting agencies and find out what\'s in a credit report.',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop&q=60',
    href: '/articles/what-is-credit-report',
    author: { name: 'Demi Wilkinson', avatar: avatars.demi },
    date: '17 Jan 2025',
    tags: [
      { label: 'Credit Reports', color: 'primary' as const },
      { label: 'Basics', color: 'gray' as const },
    ],
  },
  {
    id: '5',
    title: 'How Do Credit Bureaus Get My Credit Data?',
    description: 'Credit reports are a roadmap of your credit journey. It\'s important to know how your credit information goes from your lenders to the credit bureaus.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    href: '/articles/credit-bureaus-data',
    author: { name: 'Candice Wu', avatar: avatars.candice },
    date: '16 Jan 2025',
    tags: [
      { label: 'Credit Bureaus', color: 'blue' as const },
      { label: 'Data', color: 'gray' as const },
    ],
  },
  {
    id: '6',
    title: 'Why Did My Credit Score Drop for No Reason?',
    description: 'Wondering why your credit scores dropped for seemingly no reason? Learn the most common causes of a sudden decrease.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60',
    href: '/articles/credit-score-drop',
    author: { name: 'Natali Craig', avatar: avatars.natali },
    date: '15 Jan 2025',
    tags: [
      { label: 'Credit Score', color: 'orange' as const },
      { label: 'Analysis', color: 'gray' as const },
    ],
  },
  {
    id: '7',
    title: 'Hard Inquiry vs Soft Inquiry: What\'s the Difference?',
    description: 'Discover how a hard inquiry vs. soft inquiry affects your credit with this comprehensive overview.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
    href: '/articles/hard-vs-soft-inquiry',
    author: { name: 'Olivia Rhye', avatar: avatars.olivia },
    date: '14 Jan 2025',
    tags: [
      { label: 'Inquiries', color: 'green' as const },
      { label: 'Education', color: 'gray' as const },
    ],
  },
  {
    id: '8',
    title: 'A Guide to Credit Report Disputes',
    description: 'If there is information on your credit reports that you believe is inaccurate or incomplete, here are steps you can take.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60',
    href: '/articles/credit-disputes',
    author: { name: 'Phoenix Baker', avatar: avatars.phoenix },
    date: '13 Jan 2025',
    tags: [
      { label: 'Disputes', color: 'primary' as const },
      { label: 'Guide', color: 'gray' as const },
    ],
  },
  {
    id: '9',
    title: 'What is a Credit Bureau and What Do They Do?',
    description: 'Do the three nationwide credit bureaus make lending decisions? Where do they get their information? Answers to your questions.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
    href: '/articles/what-is-credit-bureau',
    author: { name: 'Lana Steiner', avatar: avatars.lana },
    date: '12 Jan 2025',
    tags: [
      { label: 'Credit Bureaus', color: 'blue' as const },
      { label: 'Basics', color: 'gray' as const },
    ],
  },
]

interface KnowledgeBaseProps {
  onBack?: () => void
}

export function KnowledgeBase({ onBack }: KnowledgeBaseProps) {
  const [visibleArticles, setVisibleArticles] = useState(6)
  const [email, setEmail] = useState('')

  const loadMore = () => {
    setVisibleArticles(prev => Math.min(prev + 3, allPosts.length))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean, centered like Untitled UI */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container size="xl" className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-6">
            <span className="text-sm font-medium text-primary-700">Our blog</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight">
            Stories and interviews
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Subscribe to learn about new product features, the latest in technology, solutions, and updates.
          </p>

          {/* Newsletter signup */}
          <div className="mt-10 max-w-md mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button className="shrink-0 whitespace-nowrap">Get started</Button>
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              We care about your data in our{' '}
              <a href="#" className="underline hover:text-neutral-700">privacy policy</a>.
            </p>
          </div>
        </Container>
      </section>

      {/* Back button for demo */}
      {onBack && (
        <Container size="xl">
          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Components
          </button>
        </Container>
      )}

      {/* Recent blog posts section */}
      <section className="py-12 md:py-16">
        <Container size="xl">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
            Recent blog posts
          </h2>

          {/* Featured layout - 1 large + 2 stacked */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Large featured post */}
            <FeaturedArticleCard
              href={recentPosts[0].href}
              image={recentPosts[0].image}
              title={recentPosts[0].title}
              description={recentPosts[0].description}
              author={recentPosts[0].author}
              date={recentPosts[0].date}
              tags={recentPosts[0].tags}
              layout="overlay"
            />

            {/* 2 stacked posts */}
            <div className="flex flex-col gap-8">
              {recentPosts.slice(1, 3).map(post => (
                <ArticleCard
                  key={post.id}
                  href={post.href}
                  image={post.image}
                  title={post.title}
                  description={post.description}
                  author={post.author}
                  date={post.date}
                  tags={post.tags}
                  variant="horizontal"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <Container size="xl">
        <hr className="border-neutral-200" />
      </Container>

      {/* All blog posts section */}
      <section className="py-12 md:py-16">
        <Container size="xl">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
            All blog posts
          </h2>

          {/* Article Grid - 3 columns */}
          <Grid cols={1} colsMd={2} colsLg={3} gap={8}>
            {allPosts.slice(0, visibleArticles).map(post => (
              <ArticleCard
                key={post.id}
                href={post.href}
                image={post.image}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
                tags={post.tags}
              />
            ))}
          </Grid>

          {/* Load More */}
          {visibleArticles < allPosts.length && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" onClick={loadMore}>
                Load more articles
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section - App download style like Untitled UI */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <Container size="lg">
          <div className="relative rounded-2xl bg-neutral-900 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                Growth performance tracking made easy
              </h2>
              <p className="mt-4 text-lg text-neutral-300 max-w-xl mx-auto">
                Start your 30-day free trial today.
              </p>

              {/* App store buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-neutral-500">Download on the</div>
                    <div className="text-sm font-semibold text-neutral-900">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-neutral-500">Get it on</div>
                    <div className="text-sm font-semibold text-neutral-900">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12 md:py-16">
        <Container size="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Logo */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="text-lg font-semibold text-neutral-900">Equifax</span>
              </div>
              <p className="text-neutral-600 text-sm max-w-xs">
                Empowering consumers with credit education and identity protection resources.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Credit Monitoring</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Identity Protection</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Credit Lock</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Blog</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Newsletter</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Events</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Help centre</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">About us</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Careers</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Press</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Terms</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Privacy</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Cookies</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 text-sm">Licenses</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; 2025 Equifax Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
