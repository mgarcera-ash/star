import { useState } from 'react'
import SearchOverlay from './SearchOverlay'
import ScriptBuilder from './ScriptBuilder'
import { FaPersonShelter, FaVanShuttle } from 'react-icons/fa6'
import { TbOld } from 'react-icons/tb'
import { GrEmergency } from 'react-icons/gr'
import { FaWandMagicSparkles } from 'react-icons/fa6'

const DispatchScripts = ({ onBack }) => {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [showScriptBuilder, setShowScriptBuilder] = useState(false)

  const scenarios = [
    {
      id: 'shelter-placement',
      title: 'Shelter Placement Request',
      category: 'Shelter',
      icon: <FaPersonShelter className="w-full h-full" />,
      script: [
        "Thank you for calling A Safe Haven, this is [Your Name]. How can I help you?",
        "[Listen]",
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
      icon: <FaVanShuttle className="w-full h-full" />,
      script: [
        "Thank you for calling A Safe Haven, this is [Your Name]. How can I help you?",
        "[Listen]",
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
      icon: <TbOld className="w-full h-full" />,
      script: [
        "Thank you for calling A Safe Haven, this is [Your Name]. How can I help you?",
        "[Listen]",
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
      icon: <GrEmergency className="w-full h-full" />,
      script: [
        "Thank you for calling A Safe Haven, this is [Your Name]. How can I help you?",
        "[Listen]",
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
            Dispatch Scripts
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {!selectedScenario && !showScriptBuilder ? (
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

              <div className="flex gap-3 flex-wrap mb-6">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className="glass-card-strong px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl
                             transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
                  >
                    <span className="text-2xl w-8 h-8 flex items-center justify-center text-ash-teal">
                      {scenario.icon}
                    </span>
                    <span className="font-semibold text-ash-navy">{scenario.title}</span>
                  </button>
                ))}
              </div>

              {/* Script Builder Button */}
              <div className="mb-8">
                <div className="h-px bg-white/20 mb-8"></div>
                <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow">
                  Or build your script dynamically
                </h3>
                <button
                  onClick={() => setShowScriptBuilder(true)}
                  className="glass-card-strong px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl
                           transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
                >
                  <span className="text-2xl w-8 h-8 flex items-center justify-center text-ash-teal">
                    <FaWandMagicSparkles className="w-full h-full" />
                  </span>
                  <div className="text-left">
                    <div className="font-bold text-ash-navy text-lg">Script Builder</div>
                    <div className="text-sm text-gray-600">Build your script step-by-step as the call progresses</div>
                  </div>
                </button>
              </div>
            </>
          ) : showScriptBuilder ? (
            <>
              <ScriptBuilder onBack={() => setShowScriptBuilder(false)} />
            </>
          ) : (
            <>
              {/* Script Display */}
              <div className="mb-8">
                {/* Breadcrumbs */}
                <div className="mb-4 flex items-center gap-2 text-white/80 text-sm drop-shadow">
                  <button
                    onClick={onBack}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="hover:text-white transition-colors"
                  >
                    Dispatch Scripts
                  </button>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-white font-semibold">{selectedScenario.title}</span>
                </div>

                {/* Title and Category */}
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-semibold text-white drop-shadow">
                    {selectedScenario.title}
                  </h2>
                  <span className="px-5 py-2 bg-white/20 text-white text-sm rounded-full font-semibold backdrop-blur">
                    {selectedScenario.category}
                  </span>
                </div>
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

      {/* Floating Back Button */}
      <button
        onClick={() => {
          if (selectedScenario) {
            setSelectedScenario(null)
          } else if (showScriptBuilder) {
            setShowScriptBuilder(false)
          } else {
            onBack()
          }
        }}
        className="fixed bottom-6 left-6 z-50 px-6 py-3 bg-ash-navy text-white rounded-full
                   shadow-2xl hover:scale-110 transition-all duration-200 flex items-center
                   gap-2 font-semibold group"
        aria-label="Go back"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Back</span>
      </button>

      {/* Search Overlay */}
      <SearchOverlay currentPage="dispatch" />
    </div>
  )
}

export default DispatchScripts
