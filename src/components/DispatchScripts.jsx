import { useState } from 'react'

const DispatchScripts = ({ onBack }) => {
  const [selectedScenario, setSelectedScenario] = useState(null)

  const scenarios = [
    {
      id: 'shelter-placement',
      title: 'Shelter Placement Request',
      category: 'Shelter',
      script: [
        "Thank you for calling STAR. This is [Your Name]. How can I help you today?",
        "[Listen to request]",
        "I understand you're requesting shelter placement. Let me gather some information to help you.",
        "Can you tell me your name and date of birth?",
        "Are you currently in a safe location?",
        "Do you have any immediate medical needs?",
        "Let me check availability in our system. Please hold for a moment.",
        "[Check HMIS for bed availability]",
        "I have availability at [Shelter Name]. They can accommodate you tonight.",
        "Would you like me to arrange transportation, or can you get there on your own?",
        "The address is [Address]. Check-in is between [Time]. Do you have any questions?"
      ]
    },
    {
      id: 'transport-request',
      title: 'Transportation Request',
      category: 'Transport',
      script: [
        "Thank you for calling STAR. This is [Your Name]. How can I help you today?",
        "[Listen to request]",
        "I can help arrange transportation. Where are you currently located?",
        "And where do you need to go?",
        "Is this for immediate transport or scheduled for later?",
        "Let me coordinate with our transport team. Can you provide a callback number?",
        "[Contact transport coordinator]",
        "We can have a driver to you within [timeframe]. The driver will call this number when they're nearby.",
        "Please be ready at [meeting point]. Do you have any accessibility needs I should communicate to the driver?"
      ]
    },
    {
      id: 'well-being-check',
      title: 'Senior Well-Being Check',
      category: 'Well-Being',
      script: [
        "Thank you for calling STAR. This is [Your Name]. How can I help you today?",
        "[Listen to concern]",
        "I understand you're concerned about [person's name]. Can you tell me their address?",
        "And what is your relationship to this person?",
        "When was the last time you had contact with them?",
        "What specifically are you concerned about?",
        "[Assess urgency: immediate danger vs. welfare check]",
        "Thank you for this information. I'm going to create a well-being check request.",
        "Our team will attempt contact within [timeframe]. May I have your callback number?",
        "We'll update you once we've made contact. If this becomes an emergency situation before then, please call 911."
      ]
    },
    {
      id: 'crisis-deescalation',
      title: 'Crisis De-escalation',
      category: 'Crisis',
      script: [
        "Thank you for calling STAR. This is [Your Name]. I'm here to help.",
        "[Use calm, measured tone]",
        "I can hear that you're going through something difficult right now. I want to help.",
        "Can you tell me what's happening?",
        "[Active listening - repeat back what you hear]",
        "That sounds really challenging. You've done the right thing by reaching out.",
        "Are you in a safe place right now? Are you alone?",
        "Do you have any immediate medical needs?",
        "[If suicidal ideation: Assess imminent danger]",
        "I want to connect you with someone who can provide the support you need.",
        "[Warm transfer to crisis counselor if available, or provide crisis line: 988]",
        "You don't have to go through this alone. Help is available."
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="gradient-ash text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold">
              📋 Dispatch Scripts
            </h1>
            <p className="text-white/90 mt-1">
              Quick reference for common call scenarios
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {!selectedScenario ? (
            <>
              {/* Scenario Selection */}
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold text-ash-navy mb-2">
                  Select a Scenario
                </h2>
                <p className="text-gray-600">
                  Choose the type of call you're handling
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className="group bg-white rounded-xl p-6 text-left shadow-md hover:shadow-xl 
                             transform transition-all duration-200 hover:scale-105 border-2 border-transparent
                             hover:border-ash-teal"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-display font-bold text-ash-navy group-hover:text-ash-teal transition-colors">
                        {scenario.title}
                      </h3>
                      <svg 
                        className="w-6 h-6 text-ash-teal opacity-0 group-hover:opacity-100 transition-opacity" 
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
                    <span className="inline-block px-3 py-1 bg-ash-teal/10 text-ash-teal text-sm rounded-full font-medium">
                      {scenario.category}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Script Display */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="text-ash-teal hover:text-ash-accent font-semibold mb-2 flex items-center"
                  >
                    <svg 
                      className="w-5 h-5 mr-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to scenarios
                  </button>
                  <h2 className="text-2xl font-display font-semibold text-ash-navy">
                    {selectedScenario.title}
                  </h2>
                </div>
                <span className="px-4 py-2 bg-ash-teal/10 text-ash-teal text-sm rounded-full font-medium">
                  {selectedScenario.category}
                </span>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <ol className="space-y-4">
                  {selectedScenario.script.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-ash-teal text-white rounded-full 
                                     flex items-center justify-center font-bold text-sm mr-4 mt-1">
                        {index + 1}
                      </span>
                      <p className="flex-grow text-gray-700 text-lg leading-relaxed pt-1">
                        {step.startsWith('[') ? (
                          <span className="italic text-ash-accent font-medium">{step}</span>
                        ) : (
                          step
                        )}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> These scripts are guides. Adjust your language based on the 
                  caller's needs and the specific situation. Always prioritize active listening and empathy.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default DispatchScripts
