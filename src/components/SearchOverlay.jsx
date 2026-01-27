import { useState, useEffect } from 'react'

const SearchOverlay = ({ currentPage = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const tips = {
    home: [
      { title: 'Quick Navigation', text: 'Click any tool card to access that feature instantly' },
      { title: 'Keyboard Shortcuts', text: 'Press 1-4 to quickly open tools, or ⌘K/Ctrl+K to search' },
      { title: 'Mobile Friendly', text: 'This site works great on phones - perfect for on-the-go access' }
    ],
    dispatch: [
      { title: 'Copy & Paste', text: 'Click any script line to copy it to your clipboard' },
      { title: 'Follow the Flow', text: 'Scripts are in order - follow them step by step for best results' },
      { title: 'Personalize', text: 'These are guides - adjust your language for each caller' }
    ]
  }

  const currentTips = tips[currentPage] || tips.home

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      // ESC to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Auto-focus search input when opened
  useEffect(() => {
    if (isOpen) {
      const searchInput = document.getElementById('search-input')
      if (searchInput) {
        searchInput.focus()
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-ash-teal text-white rounded-full
                   shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center
                   justify-center font-bold text-xl group"
        aria-label="Search"
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false)
              setSearchQuery('')
            }}
          />

          {/* Search Panel */}
          <div className="relative w-full md:w-auto md:max-w-2xl mx-4 mb-4 md:mb-0 glass-card-strong
                         rounded-3xl p-8 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-ash-navy mb-2">Search STAR Tools</h3>
                <p className="text-gray-600 text-sm">Find scenarios, phrases, or keywords instantly</p>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setSearchQuery('')
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-4"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scenarios, phrases, or keywords..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl
                           focus:border-ash-teal focus:ring-2 focus:ring-ash-teal/20 outline-none
                           transition-all text-gray-800 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400
                             hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Press ESC to close</span>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">⌘K</kbd>
                  <span>or</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">Ctrl+K</kbd>
                  <span>to open</span>
                </div>
              </div>
            </div>

            {/* Search Results or Quick Tips */}
            <div>
              {searchQuery ? (
                <div className="text-center py-8">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">Search functionality coming soon!</p>
                  <p className="text-gray-400 text-sm mt-2">
                    We're working on making all content searchable
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="text-lg font-bold text-ash-navy mb-4">Quick Tips</h4>
                  <div className="space-y-4">
                    {currentTips.map((tip, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-ash-teal/10 text-ash-teal rounded-full
                                      flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-ash-navy mb-1">{tip.title}</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{tip.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                      Need more help? Contact your supervisor or IT support
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchOverlay
