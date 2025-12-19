'use client'

interface PriceDisplayProps {
  currentPrice: number
  originalPrice?: number
  currency?: string
  size?: 'sm' | 'md' | 'lg'
  showSavings?: boolean
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'CA$',
  AUD: 'AU$',
}

export default function PriceDisplay({
  currentPrice,
  originalPrice,
  currency = 'USD',
  size = 'md',
  showSavings = true,
}: PriceDisplayProps) {
  const symbol = currencySymbols[currency] || currency
  const hasDiscount = originalPrice && originalPrice > currentPrice
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0
  const savings = hasDiscount ? originalPrice - currentPrice : 0

  const sizeClasses = {
    sm: {
      current: 'text-xl font-bold',
      original: 'text-sm',
      badge: 'text-xs px-1.5 py-0.5',
      savings: 'text-xs',
    },
    md: {
      current: 'text-3xl font-bold',
      original: 'text-base',
      badge: 'text-sm px-2 py-1',
      savings: 'text-sm',
    },
    lg: {
      current: 'text-4xl font-extrabold',
      original: 'text-lg',
      badge: 'text-base px-3 py-1.5',
      savings: 'text-base',
    },
  }

  const classes = sizeClasses[size]

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span className={`${classes.current} text-emerald-600 dark:text-emerald-400`}>
        {symbol}
        {currentPrice.toFixed(2)}
      </span>

      {hasDiscount && (
        <>
          <span className={`${classes.original} text-gray-500 line-through dark:text-gray-400`}>
            {symbol}
            {originalPrice.toFixed(2)}
          </span>

          <span
            className={`${classes.badge} rounded-full bg-rose-100 font-semibold text-rose-700 dark:bg-rose-900 dark:text-rose-200`}
          >
            -{discountPercentage}%
          </span>
        </>
      )}

      {hasDiscount && showSavings && (
        <span className={`${classes.savings} text-emerald-700 dark:text-emerald-300`}>
          You save {symbol}
          {savings.toFixed(2)}
        </span>
      )}
    </div>
  )
}
