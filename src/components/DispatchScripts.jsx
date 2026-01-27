import { useState } from 'react'
import HelpOverlay from './HelpOverlay'

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
      <header className="text-white py-8 px-6">
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
            <h1 className="text-4xl font-bold drop-shadow-lg">
              📋 Dispatch Scripts
            </h1>
            <p className="text-white/90 mt-2 text-lg drop-shadow">
              Quick reference for common call scenarios
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {!selectedScenario ? (
            <>
              {/* Scenario Selection */}
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white mb-3 drop-shadow">
                  Select a Scenario
                </h2>
                <p className="text-lg text-white/90 drop-shadow">
                  Choose the type of call you're handling
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className="group glass-card-strong rounded-2xl p-8 text-left shadow-xl
                             transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-ash-navy group-hover:text-ash-teal transition-colors">
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
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <span className="inline-block px-4 py-2 bg-ash-teal/10 text-ash-teal text-sm rounded-full font-semibold">
                      {scenario.category}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Script Display */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="text-white hover:text-white/80 font-semibold mb-3 flex items-center drop-shadow"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
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
                  <h2 className="text-3xl font-semibold text-white drop-shadow">
                    {selectedScenario.title}
                  </h2>
                </div>
                <span className="px-5 py-2 bg-white/20 text-white text-sm rounded-full font-semibold backdrop-blur">
                  {selectedScenario.category}
                </span>
              </div>

              <div className="glass-card-strong rounded-2xl shadow-2xl p-8">
                <ol className="space-y-5">
                  {selectedScenario.script.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-10 h-10 bg-ash-teal text-white rounded-full
                                     flex items-center justify-center font-bold text-base mr-5 mt-1 shadow-md">
                        {index + 1}
                      </span>
                      <p className="flex-grow text-gray-800 text-lg leading-relaxed pt-2">
                        {step.startsWith('[') ? (
                          <span className="italic text-ash-accent font-semibold">{step}</span>
                        ) : (
                          step
                        )}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 glass-card-strong border-l-4 border-ash-teal p-6 rounded-lg">
                <p className="text-base text-gray-800 leading-relaxed">
                  <strong className="text-ash-teal">Tip:</strong> These scripts are guides. Adjust your language based on the
                  caller's needs and the specific situation. Always prioritize active listening and empathy.
                </p>
              </div>
</>
          )}
        </div>
      </main>

      {/* Help Overlay */}
      <HelpOverlay currentPage="dispatch" />
    </div>
  )
}

export default DispatchScripts
