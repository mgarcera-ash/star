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
  const [currentStep, setCurrentStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const scenarios = [
    {
      id: 'initial-311-call',
      title: 'Initial Shelter Request (311)',
      category: 'Shelter',
      icon: <FaPersonShelter className="w-full h-full" />,
      iconColor: 'text-orange-500',
      script: [
        "Hi, this is [name] with STAR. We got your 311 request for shelter. I need to confirm a few things to help get you placed. Is now a good time?",
        "Can you confirm your full name and age? And where are you right now—are you outside, at a business, hospital, or somewhere else?",
        "Are you able to walk on your own?",
        "Is it just you, or do you have kids with you?",
        "Do you have any disability that might affect your stay in a shelter?",
        "[If yes: Ask what they need to make shelter work and how it relates to their disability. Document accommodation decision in Salesforce, HMIS, and email DFSSHomeless@cityofchicago.org]",
        "Have you stayed in shelter before? Which ones?",
        "Where did you stay last night?",
        "[If stable: Ask if there's any reason they can't go back there. If they mention friends/family/church: Offer connection to someone who might help arrange that]",
        "Okay, we're starting the placement process now. Just so you know, beds are limited right now, but we'll keep working on this and update you throughout the day. As long as you stay reachable and let us know if you move, we'll keep your case open until we find placement or you no longer need it.",
        "Any questions about the process?"
      ]
    },
    {
      id: 'shelter-placement',
      title: 'Shelter Placement Request',
      category: 'Shelter',
      icon: <FaPersonShelter className="w-full h-full" />,
      iconColor: 'text-orange-500',
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
      iconColor: 'text-blue-500',
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
      iconColor: 'text-purple-500',
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
      iconColor: 'text-red-500',
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
              {/* Script Builder Button */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-3 drop-shadow">
                  Build as you go (Recommended)
                </h2>
                <button
                  onClick={() => setShowScriptBuilder(true)}
                  className="glass-card-strong px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl
                           transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center gap-3
                           animate-fade-in-up"
                >
                  <span className="text-2xl w-8 h-8 flex items-center justify-center text-ash-teal transition-transform duration-200 hover:scale-125 hover:rotate-12">
                    <FaWandMagicSparkles className="w-full h-full" />
                  </span>
                  <div className="text-left">
                    <div className="font-bold text-ash-navy text-lg">Script Builder</div>
                    <div className="text-sm text-gray-600">Build your script step-by-step as the call progresses.</div>
                  </div>
                </button>
              </div>

              {/* Scenario Selection */}
              <div className="mb-8">
                <div className="h-px bg-white/20 mb-8"></div>
                <h2 className="text-2xl font-semibold text-white mb-4 drop-shadow">
                  Or select a scenario below.
                </h2>
              </div>

              <div className="flex gap-3 flex-wrap mb-6">
                {scenarios.map((scenario, index) => (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario)
                      setCurrentStep(0)
                    }}
                    className="glass-card-strong px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl
                             transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center gap-3
                             animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className={`text-2xl w-8 h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${scenario.iconColor || 'text-ash-teal'}`}>
                      {scenario.icon}
                    </span>
                    <span className="font-semibold text-ash-navy">{scenario.title}</span>
                  </button>
                ))}

                {/* More Button */}
                <button
                  className="glass-card-strong px-5 py-3 rounded-2xl shadow-lg
                           opacity-50 cursor-not-allowed flex items-center gap-3"
                  disabled
                >
                  <span className="text-2xl w-8 h-8 flex items-center justify-center text-ash-teal">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <span className="font-semibold text-ash-navy">More</span>
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

              <div className="mb-6 glass-card-strong border-l-4 border-ash-teal p-6 rounded-2xl">
                <p className="text-base text-gray-800 leading-relaxed">
                  <strong className="text-ash-teal">Tip:</strong> <strong>Active listening and empathy are crucial</strong>. Remember: As A Safe Haven team member you have <strong>power</strong> because you hold the information needed to get someone to safety. People who have been living in crisis may not have spare patience to give you, even if you give them all of yours.
                  <br /><br />
                  Most times your patience and kindness will break through. But other times, it might arouse anger, suspicion or paranoia. Adjust your language based on where people are at. If someone is harsh to you, do not react in the same tone. If needed, forward the call to a teammate.
                </p>
              </div>

              <div className="glass-card-strong rounded-2xl shadow-2xl p-8 min-h-[400px] flex flex-col">
                {/* Progress Indicator */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-sm font-semibold text-ash-navy">
                    Step {currentStep + 1} of {selectedScenario.script.length}
                  </div>
                  <div className="flex gap-1">
                    {selectedScenario.script.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentStep
                            ? 'w-8 bg-ash-teal'
                            : index < currentStep
                            ? 'w-2 bg-ash-teal/50'
                            : 'w-2 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Current Step Display */}
                <div className="flex-1 flex items-center justify-center">
                  <div
                    className={`transition-all duration-500 ${
                      isTransitioning ? 'opacity-0 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'
                    }`}
                  >
                    <div className="flex items-start gap-5 max-w-3xl">
                      <span className="flex-shrink-0 w-14 h-14 bg-ash-teal text-white rounded-full
                                     flex items-center justify-center font-bold text-2xl shadow-lg">
                        {currentStep + 1}
                      </span>
                      <p className="flex-grow text-gray-800 text-2xl leading-relaxed pt-3">
                        {selectedScenario.script[currentStep].startsWith('[') ? (
                          <span className="italic text-ash-accent font-semibold">
                            {selectedScenario.script[currentStep]}
                          </span>
                        ) : (
                          selectedScenario.script[currentStep]
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                  <button
                    onClick={() => {
                      if (currentStep > 0) {
                        setIsTransitioning(true)
                        setTimeout(() => {
                          setCurrentStep(currentStep - 1)
                          setIsTransitioning(false)
                        }, 250)
                      }
                    }}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                      currentStep === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-ash-navy text-white shadow-lg hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <button
                    onClick={() => {
                      if (currentStep < selectedScenario.script.length - 1) {
                        setIsTransitioning(true)
                        setTimeout(() => {
                          setCurrentStep(currentStep + 1)
                          setIsTransitioning(false)
                        }, 250)
                      }
                    }}
                    disabled={currentStep === selectedScenario.script.length - 1}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                      currentStep === selectedScenario.script.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-ash-teal text-white shadow-lg hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
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
            setCurrentStep(0)
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
