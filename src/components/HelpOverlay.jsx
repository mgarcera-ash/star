import { useState } from 'react'

const HelpOverlay = ({ currentPage = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const tips = {
    home: [
      { title: 'Quick Navigation', text: 'Click any tool card to access that feature instantly' },
      { title: 'Keyboard Shortcuts', text: 'Press 1-4 to quickly open tools, or press H for help' },
      { title: 'Mobile Friendly', text: 'This site works great on phones - perfect for on-the-go access' }
    ],
    dispatch: [
      { title: 'Copy & Paste', text: 'Click any script line to copy it to your clipboard' },
      { title: 'Follow the Flow', text: 'Scripts are in order - follow them step by step for best results' },
      { title: 'Personalize', text: 'These are guides - adjust your language for each caller' }
    ]
  }

  const currentTips = tips[currentPage] || tips.home

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-ash-teal text-white rounded-full
                   shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center
                   justify-center font-bold text-xl group"
        aria-label="Help"
      >
        <span className="group-hover:rotate-12 transition-transform">?</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Help Panel */}
          <div className="relative w-full md:w-auto md:max-w-lg mx-4 mb-4 md:mb-0 glass-card-strong
                         rounded-3xl p-8 shadow-2xl animate-slide-up">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-ash-navy mb-2">Quick Tips</h3>
                <p className="text-gray-600">Here to help you get the most out of STAR Tools</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {currentTips.map((tip, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-ash-teal/10 text-ash-teal rounded-full
                                flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-ash-navy mb-1">{tip.title}</h4>
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
          </div>
        </div>
      )}
    </>
  )
}

export default HelpOverlay
