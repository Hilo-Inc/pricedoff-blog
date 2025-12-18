interface SpecsTableProps {
  specifications: Record<string, string | number | boolean>
  title?: string
}

export default function SpecsTable({ specifications, title = 'Specifications' }: SpecsTableProps) {
  if (!specifications || Object.keys(specifications).length === 0) return null

  const formatValue = (value: string | number | boolean): string => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    return String(value)
  }

  return (
    <div className="not-prose my-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(specifications).map(([key, value], index) => (
              <tr
                key={key}
                className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {key}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {formatValue(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
