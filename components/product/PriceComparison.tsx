import Link from '@/components/Link'

interface PriceEntry {
  retailer: string
  price: number
  url: string
  inStock?: boolean
  shipping?: string
  logo?: string
}

interface PriceComparisonProps {
  prices: PriceEntry[]
  currency?: string
  title?: string
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'CA$',
  AUD: 'AU$',
}

export default function PriceComparison({
  prices,
  currency = 'USD',
  title = 'Price Comparison',
}: PriceComparisonProps) {
  if (!prices || prices.length === 0) return null

  const symbol = currencySymbols[currency] || currency
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price)
  const lowestPrice = sortedPrices[0].price

  return (
    <div className="not-prose my-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedPrices.map((entry, index) => {
            const isLowest = entry.price === lowestPrice
            const isOutOfStock = entry.inStock === false

            return (
              <div
                key={entry.retailer}
                className={`flex items-center justify-between p-4 ${
                  index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'
                } ${isOutOfStock ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center gap-4">
                  {entry.logo ? (
                    <img
                      src={entry.logo}
                      alt={entry.retailer}
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {entry.retailer}
                    </span>
                  )}

                  <div className="flex flex-col">
                    {entry.logo && (
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {entry.retailer}
                      </span>
                    )}
                    {entry.shipping && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {entry.shipping}
                      </span>
                    )}
                    {isOutOfStock && (
                      <span className="text-xs font-medium text-red-600 dark:text-red-400">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-lg font-bold ${
                        isLowest
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {symbol}
                      {entry.price.toFixed(2)}
                    </span>
                    {isLowest && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-200">
                        Best Price
                      </span>
                    )}
                  </div>

                  <Link
                    href={entry.url}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      isOutOfStock
                        ? 'cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                        : isLowest
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                    rel="nofollow noopener sponsored"
                    target="_blank"
                  >
                    {isOutOfStock ? 'Unavailable' : 'Buy Now'}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
