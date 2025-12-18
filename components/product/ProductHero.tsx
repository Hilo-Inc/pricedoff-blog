import Image from '@/components/Image'
import PriceDisplay from './PriceDisplay'
import StarRating from './StarRating'
import DealBadge from './DealBadge'
import BuyButton from './BuyButton'

interface ProductHeroProps {
  title: string
  image: string
  currentPrice?: number
  originalPrice?: number
  currency?: string
  rating?: number
  retailer?: string
  affiliateLink?: string
  isTopDeal?: boolean
  expiresAt?: string | Date
  brand?: string
  summary?: string
}

export default function ProductHero({
  title,
  image,
  currentPrice,
  originalPrice,
  currency = 'USD',
  rating,
  retailer,
  affiliateLink,
  isTopDeal,
  expiresAt,
  brand,
  summary,
}: ProductHeroProps) {
  return (
    <div className="not-prose mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Image section */}
        <div className="relative bg-gray-100 dark:bg-gray-800">
          <div className="relative aspect-square">
            <Image src={image} alt={title} fill className="object-contain p-6" />
          </div>

          {/* Badges overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isTopDeal && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Top Deal
              </span>
            )}
            {originalPrice && currentPrice && originalPrice > currentPrice && (
              <span className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                -{Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-center p-6 md:p-8">
          {/* Brand */}
          {brand && (
            <span className="mb-2 text-sm font-medium tracking-wide text-primary-600 uppercase dark:text-primary-400">
              {brand}
            </span>
          )}

          {/* Title */}
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
            {title}
          </h1>

          {/* Rating */}
          {rating && (
            <div className="mb-4">
              <StarRating rating={rating} size="lg" />
            </div>
          )}

          {/* Summary */}
          {summary && (
            <p className="mb-6 text-gray-600 dark:text-gray-400">{summary}</p>
          )}

          {/* Price */}
          {currentPrice && (
            <div className="mb-6">
              <PriceDisplay
                currentPrice={currentPrice}
                originalPrice={originalPrice}
                currency={currency}
                size="lg"
                showSavings={true}
              />
            </div>
          )}

          {/* Deal badge */}
          <div className="mb-6">
            <DealBadge expiresAt={expiresAt} retailer={retailer} />
          </div>

          {/* CTA Button */}
          {affiliateLink && (
            <BuyButton
              href={affiliateLink}
              retailer={retailer}
              price={currentPrice}
              currency={currency}
              size="lg"
              fullWidth
            />
          )}
        </div>
      </div>
    </div>
  )
}
