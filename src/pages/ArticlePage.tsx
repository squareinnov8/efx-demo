import { useState } from 'react'
import { Container, Grid, HStack, Card, Badge, Button } from '../components'
import { ArticleCard, TopicPill, PricingCard, PricingToggle, PricingSection } from '../components/content'

interface ArticlePageProps {
  onBack?: () => void
}

// Sample related articles
const relatedArticles = [
  {
    id: '1',
    title: 'Hard Inquiry vs Soft Inquiry: What\'s the Difference?',
    description: 'Discover how a hard inquiry vs. soft inquiry affects your credit with this overview.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
    href: '/articles/hard-vs-soft-inquiry',
  },
  {
    id: '2',
    title: 'Why Did My Credit Score Drop for No Reason?',
    description: 'Wondering why your credit scores dropped for seemingly no reason? Learn the most common causes.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60',
    href: '/articles/credit-score-drop',
  },
  {
    id: '3',
    title: 'A Guide to Credit Report Disputes',
    description: 'If there is information on your credit reports that you believe is inaccurate, here\'s how to resolve it.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60',
    href: '/articles/credit-disputes',
  },
]

// Pricing data
const pricingPlans = {
  basic: {
    title: 'Equifax Core',
    description: 'Essential credit monitoring for individuals',
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    features: [
      { text: 'Equifax credit report', included: true },
      { text: 'Equifax credit score', included: true },
      { text: 'Credit score tracking', included: true },
      { text: 'Credit monitoring alerts', included: true },
      { text: '3-bureau credit reports', included: false },
      { text: 'Identity theft protection', included: false },
      { text: 'Social Security monitoring', included: false },
    ],
  },
  complete: {
    title: 'Equifax Complete',
    description: 'Comprehensive credit & identity monitoring',
    monthlyPrice: 19.99,
    annualPrice: 15.99,
    features: [
      { text: 'Equifax credit report', included: true },
      { text: 'Equifax credit score', included: true },
      { text: 'Credit score tracking', included: true },
      { text: 'Credit monitoring alerts', included: true },
      { text: '3-bureau credit reports', included: true },
      { text: 'Identity theft protection', included: true },
      { text: 'Social Security monitoring', included: false },
    ],
  },
  premier: {
    title: 'Equifax Premier',
    description: 'Maximum protection for you and your family',
    monthlyPrice: 29.99,
    annualPrice: 23.99,
    features: [
      { text: 'Equifax credit report', included: true },
      { text: 'Equifax credit score', included: true },
      { text: 'Credit score tracking', included: true },
      { text: 'Credit monitoring alerts', included: true },
      { text: '3-bureau credit reports', included: true },
      { text: 'Identity theft protection', included: true },
      { text: 'Social Security monitoring', included: true },
    ],
  },
}

export function ArticlePage({ onBack }: ArticlePageProps) {
  const [isAnnualPricing, setIsAnnualPricing] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Bar */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="py-4">
          <nav>
            <ol className="flex items-center gap-2 text-sm text-neutral-500">
              <li>
                <a href="/" className="hover:text-primary-500">Home</a>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <a href="/education" className="hover:text-primary-500">Education</a>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <a href="/education/credit" className="hover:text-primary-500">Credit Reports</a>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-neutral-900">What Is a Credit Report</li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Article Content */}
      <Container size="lg" className="py-12">
        {/* Back button for demo */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center text-sm text-neutral-600 hover:text-primary-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Components
          </button>
        )}

        <article>
          {/* Article Header */}
          <header className="mb-8">
            <HStack spacing={2} className="mb-4">
              <Badge variant="primary">Credit Reports</Badge>
              <span className="text-sm text-neutral-500">5 min read</span>
            </HStack>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
              What Is a Credit Report and What Is on It?
            </h1>
            <p className="mt-4 text-xl text-neutral-600">
              Learn what a credit report is, who creates them, how to get yours, and what information is included.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-neutral-500">
              <span>Updated: December 6, 2024</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>By Equifax Education Team</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-10 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&auto=format&fit=crop&q=80"
              alt="Person reviewing financial documents"
              className="w-full h-auto"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-neutral-700">
              Your credit report is one of the most important documents in your financial life. Understanding what's in it can help you make better financial decisions and improve your creditworthiness over time.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">
              What Is a Credit Report?
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              A credit report is a detailed summary of your credit history. It's compiled by credit bureaus—also known as credit reporting agencies—using information provided by lenders, creditors, and public records. Think of it as a financial report card that shows how you've managed credit over time.
            </p>
            <p className="text-neutral-700 leading-relaxed mt-4">
              The three major credit bureaus in the United States are Equifax, Experian, and TransUnion. Each bureau may have slightly different information because not all creditors report to all three bureaus.
            </p>

            <Card variant="filled" className="my-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Key Takeaway
                </h3>
                <p className="text-neutral-700">
                  Your credit report is used by lenders to evaluate your creditworthiness when you apply for loans, credit cards, mortgages, and other forms of credit.
                </p>
              </div>
            </Card>

            <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">
              What Information Is Included on a Credit Report?
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Your credit report typically includes four main types of information:
            </p>

            <div className="mt-6 space-y-4">
              <Card variant="outlined" className="p-5">
                <h4 className="font-semibold text-neutral-900">1. Personal Information</h4>
                <p className="mt-2 text-neutral-600 text-sm">
                  Your name, address, Social Security number, date of birth, and employment information.
                </p>
              </Card>
              <Card variant="outlined" className="p-5">
                <h4 className="font-semibold text-neutral-900">2. Credit Accounts</h4>
                <p className="mt-2 text-neutral-600 text-sm">
                  Details about your credit cards, mortgages, auto loans, student loans, and other credit accounts, including payment history and current balances.
                </p>
              </Card>
              <Card variant="outlined" className="p-5">
                <h4 className="font-semibold text-neutral-900">3. Credit Inquiries</h4>
                <p className="mt-2 text-neutral-600 text-sm">
                  A record of who has accessed your credit report, including both hard inquiries (when you apply for credit) and soft inquiries.
                </p>
              </Card>
              <Card variant="outlined" className="p-5">
                <h4 className="font-semibold text-neutral-900">4. Public Records</h4>
                <p className="mt-2 text-neutral-600 text-sm">
                  Information from public records such as bankruptcies that may impact your creditworthiness.
                </p>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">
              How to Get Your Credit Report
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Under federal law, you're entitled to one free credit report from each of the three major credit bureaus every 12 months. You can request your free reports at AnnualCreditReport.com, the only authorized source for free annual credit reports.
            </p>

            <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
              <HStack spacing={4} align="start">
                <div className="shrink-0 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900">Get Your Free Equifax Credit Report</h4>
                  <p className="mt-1 text-primary-700 text-sm">
                    Check your Equifax credit report for free and monitor your credit activity.
                  </p>
                  <Button className="mt-4" size="sm">
                    Get Your Free Report
                  </Button>
                </div>
              </HStack>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-700 mb-3">Related Topics</h3>
            <HStack spacing={2} wrap>
              <TopicPill href="#" title="Credit Reports" />
              <TopicPill href="#" title="Credit Score" />
              <TopicPill href="#" title="Credit Bureaus" />
              <TopicPill href="#" title="Free Credit Report" />
            </HStack>
          </div>

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <HStack justify="between" align="center">
              <span className="text-sm font-medium text-neutral-700">Share this article</span>
              <HStack spacing={2}>
                <Button variant="ghost" size="sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </Button>
              </HStack>
            </HStack>
          </div>
        </article>
      </Container>

      {/* Related Articles */}
      <section className="bg-neutral-50 py-16">
        <Container size="xl">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">
            Related Articles
          </h2>
          <Grid cols={1} colsMd={3} gap={6}>
            {relatedArticles.map(article => (
              <ArticleCard
                key={article.id}
                href={article.href}
                image={article.image}
                title={article.title}
                description={article.description}
              />
            ))}
          </Grid>
        </Container>
      </section>

      {/* Pricing Section */}
      <PricingSection
        title="Protect Your Credit & Identity"
        subtitle="Choose the monitoring plan that fits your needs. All plans include access to your Equifax credit report."
      >
        <div className="col-span-full mb-8">
          <PricingToggle isAnnual={isAnnualPricing} onChange={setIsAnnualPricing} />
        </div>
        <PricingCard
          tier="basic"
          title={pricingPlans.basic.title}
          description={pricingPlans.basic.description}
          price={isAnnualPricing ? pricingPlans.basic.annualPrice : pricingPlans.basic.monthlyPrice}
          period={isAnnualPricing ? 'month' : 'month'}
          features={pricingPlans.basic.features}
          ctaText="Start Free Trial"
        />
        <PricingCard
          tier="complete"
          title={pricingPlans.complete.title}
          description={pricingPlans.complete.description}
          price={isAnnualPricing ? pricingPlans.complete.annualPrice : pricingPlans.complete.monthlyPrice}
          period={isAnnualPricing ? 'month' : 'month'}
          features={pricingPlans.complete.features}
          ctaText="Start Free Trial"
          popular
        />
        <PricingCard
          tier="premier"
          title={pricingPlans.premier.title}
          description={pricingPlans.premier.description}
          price={isAnnualPricing ? pricingPlans.premier.annualPrice : pricingPlans.premier.monthlyPrice}
          period={isAnnualPricing ? 'month' : 'month'}
          features={pricingPlans.premier.features}
          ctaText="Start Free Trial"
        />
      </PricingSection>

      {/* CTA Section */}
      <section className="bg-primary-500 py-16">
        <Container size="lg" className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Monitor Your Credit Today
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Stay informed about changes to your credit report and protect your financial identity.
          </p>
          <HStack justify="center" spacing={4}>
            <Button
              size="lg"
              className="!bg-white !text-primary-500 hover:!bg-primary-50"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="!border-white !text-white hover:!bg-primary-600"
            >
              Learn More
            </Button>
          </HStack>
        </Container>
      </section>
    </div>
  )
}
