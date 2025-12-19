import Image from '@/components/Image'
import Link from '@/components/Link'
import PriceDisplay from './PriceDisplay'
import StarRating from './StarRating'
import DealBadge from './DealBadge'

interface ProductCardProps {
  title: string
  image: string
  currentPrice: number
  originalPrice?: number
  currency?: string
  rating?: number
  retailer?: string
  href: string
  isTopDeal?: boolean
  expiresAt?: string | Date
  summary?: string
}

export default function ProductCard({
  title,
  image,
  currentPrice,
  originalPrice,
  currency = 'USD',
  rating,
  retailer,
  href,
  isTopDeal,
  expiresAt,
  summary,
}: ProductCardProps) {
  const discountPercentage =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {/* Discount badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 rounded-full bg-rose-500 px-2.5 py-1 text-sm font-bold text-white">
          -{discountPercentage}%
        </div>
      )}

      {/* Top deal badge */}
      {isTopDeal && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-violet-600 px-2.5 py-1 text-sm font-bold text-white">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Top Deal
        </div>
      )}

      {/* Image */}
      <Link href={href} className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Retailer & Rating */}
        <div className="mb-2 flex items-center justify-between">
          {retailer && (
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{retailer}</span>
          )}
          {rating && <StarRating rating={rating} size="sm" />}
        </div>

        {/* Title */}
        <Link href={href}>
          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
            {title}
          </h3>
        </Link>

        {/* Summary */}
        {summary && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{summary}</p>
        )}

        {/* Price */}
        <div className="mt-auto">
          <PriceDisplay
            currentPrice={currentPrice}
            originalPrice={originalPrice}
            currency={currency}
            size="sm"
            showSavings={false}
          />
        </div>

        {/* Expiry */}
        {expiresAt && (
          <div className="mt-2">
            <DealBadge expiresAt={expiresAt} />
          </div>
        )}
      </div>
    </div>
  )
}
