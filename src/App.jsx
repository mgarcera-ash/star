import { useState, useEffect } from 'react'
import Home from './components/Home'
import DispatchScripts from './components/DispatchScripts'
import DAPHelper from './components/DAPHelper'
import SpanishPhrases from './components/SpanishPhrases'
import IntakeQuestionnaire from './components/IntakeQuestionnaire'
import BottomNav from './components/BottomNav'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [recentlyAccessed, setRecentlyAccessed] = useState([])

  // Track recently accessed tools
  useEffect(() => {
    if (currentView !== 'home') {
      setRecentlyAccessed(prev => {
        const filtered = prev.filter(item => item !== currentView)
        return [currentView, ...filtered].slice(0, 3)
      })
    }
  }, [currentView])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('starToolsRecent', JSON.stringify(recentlyAccessed))
  }, [recentlyAccessed])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('starToolsRecent')
    if (saved) {
      try {
        setRecentlyAccessed(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading recent tools:', e)
      }
    }
  }, [])

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} recentlyAccessed={recentlyAccessed} />
      case 'dispatch':
        return <DispatchScripts onBack={() => setCurrentView('home')} />
      case 'dap':
        return <DAPHelper onBack={() => setCurrentView('home')} />
      case 'spanish':
        return <SpanishPhrases onBack={() => setCurrentView('home')} />
      case 'intake':
        return <IntakeQuestionnaire onBack={() => setCurrentView('home')} />
      default:
        return <Home onNavigate={setCurrentView} recentlyAccessed={recentlyAccessed} />
    }
  }

  return (
    <>
      {renderView()}
      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
    </>
  )
}

export default App
