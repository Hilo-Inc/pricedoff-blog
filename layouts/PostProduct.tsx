import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import {
  ProductHero,
  ProsCons,
  SpecsTable,
  BuyButton,
  PriceDisplay,
  DealBadge,
} from '@/components/product'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export default function PostProduct({ content, authorDetails, next, prev, children }: LayoutProps) {
  const {
    path,
    slug,
    date,
    title,
    tags,
    images,
    summary,
    // Product-specific fields
    currentPrice,
    originalPrice,
    currency,
    retailer,
    dealExpires,
    productRating,
    affiliateLink,
    productBrand,
    isTopDeal,
    pros,
    cons,
    specifications,
  } = content as CoreContent<Blog> & {
    currentPrice?: number
    originalPrice?: number
    currency?: string
    retailer?: string
    dealExpires?: string
    productRating?: number
    affiliateLink?: string
    productBrand?: string
    isTopDeal?: boolean
    pros?: string[]
    cons?: string[]
    specifications?: Record<string, string | number | boolean>
  }

  const basePath = path.split('/')[0]
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/800'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          {/* Header with date and category */}
          <header className="pt-6 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <time
                  dateTime={date}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
              </div>

              {/* Author */}
              {authorDetails.length > 0 && (
                <div className="flex items-center gap-2">
                  {authorDetails[0].avatar && (
                    <Image
                      src={authorDetails[0].avatar}
                      width={32}
                      height={32}
                      alt="avatar"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    by {authorDetails[0].name}
                  </span>
                </div>
              )}
            </div>
          </header>

          {/* Product Hero */}
          <ProductHero
            title={title}
            image={displayImage}
            currentPrice={currentPrice}
            originalPrice={originalPrice}
            currency={currency || 'USD'}
            rating={productRating}
            retailer={retailer}
            affiliateLink={affiliateLink}
            isTopDeal={isTopDeal}
            expiresAt={dealExpires}
            brand={productBrand}
            summary={summary}
          />

          {/* Quick verdict box */}
          {summary && (
            <div className="not-prose mb-8 rounded-xl border-l-4 border-primary-500 bg-primary-50 p-6 dark:bg-primary-950/30">
              <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Quick Verdict
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{summary}</p>
              {affiliateLink && currentPrice && (
                <div className="mt-4">
                  <BuyButton
                    href={affiliateLink}
                    retailer={retailer}
                    price={currentPrice}
                    currency={currency || 'USD'}
                    size="md"
                  />
                </div>
              )}
            </div>
          )}

          {/* Pros and Cons */}
          {(pros?.length || cons?.length) && <ProsCons pros={pros} cons={cons} />}

          {/* Main content */}
          <div className="prose dark:prose-invert max-w-none py-4">{children}</div>

          {/* Specifications */}
          {specifications && Object.keys(specifications).length > 0 && (
            <SpecsTable specifications={specifications} />
          )}

          {/* Final CTA */}
          {affiliateLink && currentPrice && (
            <div className="not-prose my-8 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-center text-white">
              <h3 className="mb-2 text-2xl font-bold">Ready to buy?</h3>
              <p className="mb-4 text-primary-100">
                Get the best price on {title} right now.
              </p>
              <div className="mb-4 flex justify-center">
                <PriceDisplay
                  currentPrice={currentPrice}
                  originalPrice={originalPrice}
                  currency={currency || 'USD'}
                  size="lg"
                  showSavings={false}
                />
              </div>
              {dealExpires && (
                <div className="mb-4 flex justify-center">
                  <DealBadge expiresAt={dealExpires} />
                </div>
              )}
              <BuyButton
                href={affiliateLink}
                retailer={retailer}
                price={currentPrice}
                currency={currency || 'USD'}
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Get This Deal at {retailer || 'Best Price'}
                </span>
              </BuyButton>
            </div>
          )}

          {/* Comments */}
          {siteMetadata.comments && (
            <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
              <Comments slug={slug} />
            </div>
          )}

          {/* Footer navigation */}
          <footer>
            <div className="divide-gray-200 text-sm leading-5 font-medium xl:divide-y dark:divide-gray-700">
              {/* All tags */}
              {tags && tags.length > 0 && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Tags
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}

              {/* Prev/Next */}
              {(next || prev) && (
                <div className="flex justify-between py-4 xl:py-8">
                  {prev && prev.path && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Previous Deal
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/${prev.path}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="text-right">
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Next Deal
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/${next.path}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 xl:pt-8">
              <Link
                href={`/${basePath}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="Back to the blog"
              >
                &larr; Back to all deals
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
