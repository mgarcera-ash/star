import { useState } from 'react'
import Home from './components/Home'
import DispatchScripts from './components/DispatchScripts'
import DAPHelper from './components/DAPHelper'
import SpanishPhrases from './components/SpanishPhrases'
import IntakeQuestionnaire from './components/IntakeQuestionnaire'

function App() {
  const [currentView, setCurrentView] = useState('home')

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />
      case 'dispatch':
        return <DispatchScripts onBack={() => setCurrentView('home')} />
      case 'dap':
        return <DAPHelper onBack={() => setCurrentView('home')} />
      case 'spanish':
        return <SpanishPhrases onBack={() => setCurrentView('home')} />
      case 'intake':
        return <IntakeQuestionnaire onBack={() => setCurrentView('home')} />
      default:
        return <Home onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {renderView()}
    </div>
  )
}

export default App
