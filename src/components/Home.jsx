import { useEffect } from 'react'
import { BsTelephoneInboundFill, BsChatSquareDots } from 'react-icons/bs'
import HelpOverlay from './HelpOverlay'

const Home = ({ onNavigate, recentlyAccessed = [] }) => {
  // Get time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      switch(e.key) {
        case '1':
          onNavigate('dispatch')
          break
        case '2':
          onNavigate('dap')
          break
        case '3':
          onNavigate('spanish')
          break
        case '4':
          onNavigate('intake')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onNavigate])

  const tools = [
    {
      id: 'dispatch',
      title: 'Dispatch Scripts',
      description: 'Quick reference scripts for common scenarios',
      icon: <BsTelephoneInboundFill className="w-full h-full" />,
      gradient: 'from-ash-teal to-ash-accent',
      ready: true
    },
    {
      id: 'dap',
      title: 'DAP Note Helper',
      description: 'Generate properly formatted DAP notes',
      icon: '📝',
      gradient: 'from-ash-accent to-ash-navy',
      ready: false
    },
    {
      id: 'spanish',
      title: 'Spanish Phrases',
      description: 'Common phrases for client communication',
      icon: <BsChatSquareDots className="w-full h-full" />,
      gradient: 'from-ash-teal to-emerald-500',
      ready: false
    },
    {
      id: 'intake',
      title: 'Intake Questionnaire',
      description: 'Step-by-step intake process guide',
      icon: '❓',
      gradient: 'from-blue-500 to-ash-navy',
      ready: false
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <img
            src={`${import.meta.env.BASE_URL}star-logo.png?v=2`}
            alt="STAR Tools - Shelter, Transport, and Response - Staff Resources by A Safe Haven"
            className="h-20 md:h-24 w-auto drop-shadow-2xl"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-white mb-3 drop-shadow">
              {getGreeting()}, how can I help?
            </h2>
            <p className="text-lg text-white/90 drop-shadow">
              Choose a tool below to get started.
            </p>
          </div>

          {/* Recently Accessed */}
          {recentlyAccessed.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white/90 mb-4 drop-shadow flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recently Accessed
              </h3>
              <div className="flex gap-3 flex-wrap">
                {recentlyAccessed.map((toolId) => {
                  const tool = tools.find(t => t.id === toolId)
                  if (!tool || !tool.ready) return null
                  return (
                    <button
                      key={toolId}
                      onClick={() => onNavigate(toolId)}
                      className="glass-card-strong px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl
                               transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
                    >
                      <span className="text-2xl w-8 h-8 flex items-center justify-center text-ash-teal">{tool.icon}</span>
                      <span className="font-semibold text-ash-navy">{tool.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => tool.ready && onNavigate(tool.id)}
                disabled={!tool.ready}
                className={`
                  group relative overflow-hidden rounded-3xl p-8 text-left
                  transform transition-all duration-300
                  ${tool.ready
                    ? 'glass-card-strong hover:scale-105 hover:shadow-2xl cursor-pointer shadow-xl'
                    : 'glass-card cursor-not-allowed opacity-50'
                  }
                `}
              >
                {/* Subtle Gradient Overlay on Hover */}
                {tool.ready && (
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0
                    group-hover:opacity-15 transition-opacity duration-300
                  `} />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-5 drop-shadow w-16 h-16 flex items-center justify-center text-ash-teal">
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-ash-navy mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-gray-700 mb-4 text-base leading-relaxed">
                    {tool.description}
                  </p>

                  {!tool.ready && (
                    <span className="inline-block px-4 py-2 bg-white/50 text-gray-600 text-sm font-medium rounded-full border border-white/30">
                      Coming Soon
                    </span>
                  )}

                  {tool.ready && (
                    <div className="flex items-center text-ash-teal font-bold text-lg group-hover:translate-x-2 transition-transform">
                      Open Tool
                      <svg
                        className="w-6 h-6 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-base text-white/80 drop-shadow">
          <p>Built for A Safe Haven STAR Program Staff</p>
        </div>
      </footer>

      {/* Help Overlay */}
      <HelpOverlay currentPage="home" />
    </div>
  )
}

export default Home
