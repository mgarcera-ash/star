import { useState } from 'react'
import { FaPersonShelter, FaVanShuttle } from 'react-icons/fa6'
import { TbOld } from 'react-icons/tb'
import { GrEmergency } from 'react-icons/gr'

const ScriptBuilder = ({ onBack }) => {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [showScenarioOptions, setShowScenarioOptions] = useState(false)

  const scenarios = [
    {
      id: 'shelter-placement',
      title: 'Shelter Placement Request',
      category: 'Shelter',
      icon: <FaPersonShelter className="w-full h-full" />,
      steps: [
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
      steps: [
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
      steps: [
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
      steps: [
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
    <div className="glass-card-strong rounded-2xl shadow-2xl p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-ash-navy mb-2">Script Builder</h3>
        <p className="text-gray-600">Build your call script step-by-step based on the caller's needs</p>
      </div>

      {/* Script Nodes */}
      <ol className="space-y-5">
        {nodes.map((node, index) => (
          <li key={node.id} className="flex flex-col">
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
                           transform hover:scale-105 transition-all duration-200 flex items-center gap-2
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
                    {scenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => {
                          setSelectedScenario(scenario.id)
                          setShowScenarioOptions(false)
                        }}
                        className="w-full glass-card-strong px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl
                                 transform hover:scale-105 transition-all duration-200 flex items-center gap-3
                                 text-left"
                      >
                        <span className="text-2xl w-8 h-8 flex items-center justify-center text-ash-teal">
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
                     transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            Reset Script
          </button>
        </div>
      )}

      <div className="mt-6 glass-card border-l-4 border-ash-teal p-6 rounded-lg bg-white/50">
        <p className="text-base text-gray-800 leading-relaxed">
          <strong className="text-ash-teal">Tip:</strong> Start with the greeting, listen to what the caller needs, then click the + button to select the appropriate script path.
        </p>
      </div>
    </div>
  )
}

export default ScriptBuilder
