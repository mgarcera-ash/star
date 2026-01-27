const IntakeQuestionnaire = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="gradient-ash text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold">❓ Intake Questionnaire</h1>
            <p className="text-white/90 mt-1">Coming Soon</p>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-display font-bold text-ash-navy mb-2">Under Construction</h2>
          <p className="text-gray-600">This tool is being developed</p>
        </div>
      </main>
    </div>
  )
}

export default IntakeQuestionnaire
