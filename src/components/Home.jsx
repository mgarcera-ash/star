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
      <header className="gradient-ash text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            STAR Tools
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium">
            Shelter, Transport, and Response
          </p>
          <p className="text-sm text-white/70 mt-1">
            Staff Resources by A Safe Haven
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold text-ash-navy mb-2">
              Quick Access Tools
            </h2>
            <p className="text-gray-600">
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
                  group relative overflow-hidden rounded-2xl p-8 text-left
                  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                  ${tool.ready 
                    ? 'bg-white shadow-lg cursor-pointer' 
                    : 'bg-gray-100 cursor-not-allowed opacity-60'
                  }
                `}
              >
                {/* Gradient Background on Hover */}
                {tool.ready && (
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 
                    group-hover:opacity-10 transition-opacity duration-300
                  `} />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{tool.icon}</div>
                  <h3 className="text-2xl font-display font-bold text-ash-navy mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  
                  {!tool.ready && (
                    <span className="inline-block px-3 py-1 bg-gray-200 text-gray-500 text-sm rounded-full">
                      Coming Soon
                    </span>
                  )}
                  
                  {tool.ready && (
                    <div className="flex items-center text-ash-teal font-semibold group-hover:translate-x-2 transition-transform">
                      Open Tool
                      <svg 
                        className="w-5 h-5 ml-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
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
      <footer className="py-6 px-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>Built for A Safe Haven STAR Program Staff</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
