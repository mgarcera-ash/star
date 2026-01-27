const BottomNav = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'dispatch', icon: '📋', label: 'Scripts' },
    { id: 'dap', icon: '📝', label: 'Notes' },
    { id: 'spanish', icon: '🗣️', label: 'Phrases' }
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass-card-strong border-t border-white/30 shadow-2xl">
      <div className="flex items-center justify-around px-2 py-3 safe-area-inset-bottom">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-all duration-200 ${
              currentView === item.id
                ? 'text-ash-teal'
                : 'text-gray-500 hover:text-ash-navy'
            }`}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className={`text-xs font-semibold ${
              currentView === item.id ? 'text-ash-teal' : 'text-gray-600'
            }`}>
              {item.label}
            </span>
            {currentView === item.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-ash-teal rounded-full mt-1" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
