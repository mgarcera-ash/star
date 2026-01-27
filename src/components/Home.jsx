const Home = ({ onNavigate }) => {
  const tools = [
    {
      id: 'dispatch',
      title: 'Dispatch Scripts',
      description: 'Quick reference scripts for common scenarios',
      icon: '📋',
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
      icon: '🗣️',
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
      <header className="text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 drop-shadow-lg">
            STAR Tools
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-medium drop-shadow">
            Shelter, Transport, and Response
          </p>
          <p className="text-base text-white/80 mt-2 drop-shadow">
            Staff Resources by A Safe Haven
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-white mb-3 drop-shadow">
              Quick Access Tools
            </h2>
            <p className="text-lg text-white/90 drop-shadow">
              Select a tool to get started
            </p>
          </div>

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
                  <div className="text-6xl mb-5 drop-shadow">{tool.icon}</div>
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
    </div>
  )
}

export default Home
