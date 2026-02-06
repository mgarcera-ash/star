import { useState } from 'react'
import { FaPersonShelter } from 'react-icons/fa6'

const ScriptBuilder = ({ onBack }) => {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [showScenarioOptions, setShowScenarioOptions] = useState(false)

  const scenarios = [
    {
      id: 'initial-311-call',
      title: 'Initial Shelter Request (311)',
      category: 'Shelter',
      icon: <FaPersonShelter className="w-full h-full" />,
      steps: [
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
    }
  ]

  // Base nodes that always show
  const baseNodes = [
    {
      id: 1,
      type: 'static',
      content: 'Thank you for calling A Safe Haven, this is [Your Name]. How can I help you?'
    },
    {
      id: 2,
      type: 'decision',
      content: '[Listen]'
    }
  ]

  // Get all nodes (base + scenario-specific)
  const getAllNodes = () => {
    if (!selectedScenario) {
      return baseNodes
    }

    const scenario = scenarios.find(s => s.id === selectedScenario)
    const scenarioNodes = scenario.steps.map((step, index) => ({
      id: baseNodes.length + index + 1,
      type: 'scenario',
      content: step
    }))

    return [...baseNodes, ...scenarioNodes]
  }

  const nodes = getAllNodes()

  return (
    <>
      {/* Tip */}
      <div className="mb-6 glass-card-strong border-l-4 border-ash-teal p-6 rounded-2xl">
        <p className="text-base text-gray-800 leading-relaxed">
          <strong className="text-ash-teal">Tip:</strong> <strong>Active listening and empathy are crucial</strong>. Remember: As A Safe Haven team member you have <strong>power</strong> because you hold the information needed to get someone to safety. People who have been living in crisis may not have spare patience to give you, even if you give them all of yours.
          <br /><br />
          Most times your patience and kindness will break through. But other times, it might arouse anger, suspicion or paranoia. Adjust your language based on where people are at. If someone is harsh to you, do not react in the same tone. If needed, forward the call to a teammate.
        </p>
      </div>

      <div className="glass-card-strong rounded-2xl shadow-2xl p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-ash-navy mb-2">Script Builder</h3>
          <p className="text-gray-600">Build your call script step-by-step based on the caller's needs</p>
        </div>

        {/* Script Nodes */}
        <ol className="space-y-5">
        {nodes.map((node, index) => (
          <li key={node.id} className="flex flex-col animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex">
              <span className="flex-shrink-0 w-10 h-10 bg-ash-teal text-white rounded-full
                             flex items-center justify-center font-bold text-base mr-5 mt-1 shadow-md">
                {node.id}
              </span>
              <p className="flex-grow text-gray-800 text-lg leading-relaxed pt-2">
                {node.content.startsWith('[') ? (
                  <span className="italic text-ash-accent font-semibold">{node.content}</span>
                ) : (
                  node.content
                )}
              </p>
            </div>

            {/* Decision Point - Show + Button */}
            {node.type === 'decision' && !selectedScenario && (
              <div className="ml-14 mt-4">
                <button
                  onClick={() => setShowScenarioOptions(!showScenarioOptions)}
                  className="px-5 py-3 bg-ash-teal text-white rounded-xl shadow-lg hover:shadow-xl
                           transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center gap-2
                           font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Click based on what you hear
                </button>

                {/* Scenario Options */}
                {showScenarioOptions && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Select the type of call:</p>
                    {scenarios.map((scenario, idx) => (
                      <button
                        key={scenario.id}
                        onClick={() => {
                          setSelectedScenario(scenario.id)
                          setShowScenarioOptions(false)
                        }}
                        className="w-full glass-card-strong px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl
                                 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3
                                 text-left animate-fade-in-up"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <span className="text-2xl w-8 h-8 flex items-center justify-center text-ash-teal transition-transform duration-200 hover:scale-110">
                          {scenario.icon}
                        </span>
                        <span className="font-semibold text-ash-navy">{scenario.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* Reset Button */}
      {selectedScenario && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              setSelectedScenario(null)
              setShowScenarioOptions(false)
            }}
            className="px-5 py-3 bg-gray-500 text-white rounded-xl shadow-lg hover:shadow-xl
                     transform hover:scale-110 active:scale-95 transition-all duration-200 font-semibold"
          >
            Reset Script
          </button>
        </div>
      )}
      </div>
    </>
  )
}

export default ScriptBuilder
