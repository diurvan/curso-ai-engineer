export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-10 w-64 bg-gray-800 rounded animate-pulse mx-auto mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#1e293b] rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-800" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-20 bg-gray-800 rounded" />
                <div className="h-5 w-40 bg-gray-800 rounded" />
                <div className="h-4 w-full bg-gray-800 rounded" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-8 w-20 bg-gray-800 rounded" />
                  <div className="h-10 w-36 bg-gray-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
