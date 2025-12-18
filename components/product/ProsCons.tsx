interface ProsConsProps {
  pros?: string[]
  cons?: string[]
}

export default function ProsCons({ pros = [], cons = [] }: ProsConsProps) {
  if (pros.length === 0 && cons.length === 0) return null

  return (
    <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
      {/* Pros */}
      {pros.length > 0 && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-800 dark:text-green-200">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Pros
          </h3>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-green-700 dark:text-green-300"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cons */}
      {cons.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-800 dark:text-red-200">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Cons
          </h3>
          <ul className="space-y-2">
            {cons.map((con, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-red-700 dark:text-red-300"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
