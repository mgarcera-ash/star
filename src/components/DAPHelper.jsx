import { useState } from 'react'
import { FaVanShuttle } from 'react-icons/fa6'
import { TbOld } from 'react-icons/tb'
import { GrEmergency } from 'react-icons/gr'
import SearchOverlay from './SearchOverlay'

const DAPHelper = ({ onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const templates = [
    {
      id: 'transportation',
      title: 'Transportation Services',
      icon: <FaVanShuttle className="w-full h-full" />,
      description: 'For transport requests and coordination',
      totalSteps: 5
    },
    {
      id: 'wellbeing',
      title: 'Senior Well-Being Check',
      icon: <TbOld className="w-full h-full" />,
      description: 'For wellness visits and follow-ups',
      totalSteps: 5
    },
    {
      id: 'crisis',
      title: 'Crisis Response/Shelter Placement',
      icon: <GrEmergency className="w-full h-full" />,
      description: 'For emergency situations',
      totalSteps: 5
    }
  ]

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setCurrentStep(1)
    setFormData({})
  }

  const handleNext = () => {
    if (currentStep < selectedTemplate.totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      setSelectedTemplate(null)
      setCurrentStep(0)
      setFormData({})
    }
  }

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCopyNote = () => {
    // Will implement clipboard copy
    alert('Copy functionality coming soon!')
  }

  const handleStartNew = () => {
    setSelectedTemplate(null)
    setCurrentStep(0)
    setFormData({})
  }

  const generatePreview = () => {
    // Will generate formatted DAP note from formData
    return `DATA:\n[Form data will be formatted here]\n\nASSESSMENT:\n[Assessment data will be formatted here]\n\nPLAN:\n[Plan data will be formatted here]`
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
            DAP Note Helper
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {!selectedTemplate ? (
            // Step 0: Template Selection
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white mb-3 drop-shadow">
                  Select Note Type
                </h2>
                <p className="text-lg text-white/90 drop-shadow">
                  Choose the type of service you're documenting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="glass-card-strong rounded-2xl p-8 text-center
                             transform hover:scale-105 transition-all duration-200 hover:shadow-2xl"
                  >
                    <div className="text-6xl mb-4 w-16 h-16 mx-auto flex items-center justify-center text-ash-teal">
                      {template.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-ash-navy mb-3">
                      {template.title}
                    </h3>
                    <p className="text-gray-700">
                      {template.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Privacy Notice */}
              <div className="mt-8 glass-card-strong border-l-4 border-ash-teal p-6 rounded-2xl">
                <p className="text-base text-gray-800 leading-relaxed">
                  <strong className="text-ash-teal">Privacy Notice:</strong> This tool runs entirely in your browser.
                  No data is stored or sent to any server. When you refresh the page, everything is cleared.
                  You type all content yourself - no AI generation.
                </p>
              </div>
            </>
          ) : (
            // Wizard Steps
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Form Content (2/3 width on desktop) */}
              <div className="lg:col-span-2">
                {/* Progress Indicator */}
                <div className="mb-6 glass-card-strong rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-ash-navy">
                      Step {currentStep} of {selectedTemplate.totalSteps}
                    </span>
                    <span className="text-sm text-gray-600">
                      {selectedTemplate.title}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-ash-teal rounded-full h-3 transition-all duration-300"
                      style={{ width: `${(currentStep / selectedTemplate.totalSteps) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Step Content */}
                <div className="glass-card-strong rounded-2xl shadow-2xl p-8">
                  <h2 className="text-3xl font-bold text-ash-navy mb-6">
                    {currentStep === 1 && 'DATA Section'}
                    {currentStep === 2 && 'DATA Section (continued)'}
                    {currentStep === 3 && 'ASSESSMENT Section'}
                    {currentStep === 4 && 'PLAN Section'}
                    {currentStep === 5 && 'Review & Copy'}
                  </h2>

                  {/* Placeholder for step content */}
                  <div className="space-y-6">
                    <p className="text-gray-600">
                      Step {currentStep} content will go here. This will include dropdowns,
                      text areas, checkboxes, and radio buttons based on the template.
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={handleBack}
                      className="px-6 py-3 bg-gray-500 text-white rounded-xl shadow-lg hover:shadow-xl
                               transform hover:scale-105 transition-all duration-200 font-semibold"
                    >
                      ← Back
                    </button>
                    {currentStep < selectedTemplate.totalSteps ? (
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 bg-ash-teal text-white rounded-xl shadow-lg hover:shadow-xl
                                 transform hover:scale-105 transition-all duration-200 font-semibold"
                      >
                        Next →
                      </button>
                    ) : (
                      <div className="flex gap-4">
                        <button
                          onClick={handleCopyNote}
                          className="px-6 py-3 bg-ash-teal text-white rounded-xl shadow-lg hover:shadow-xl
                                   transform hover:scale-105 transition-all duration-200 font-semibold"
                        >
                          📋 Copy Note
                        </button>
                        <button
                          onClick={handleStartNew}
                          className="px-6 py-3 bg-gray-500 text-white rounded-xl shadow-lg hover:shadow-xl
                                   transform hover:scale-105 transition-all duration-200 font-semibold"
                        >
                          Start New Note
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Preview Panel (1/3 width on desktop) */}
              <div className="lg:col-span-1">
                <div className="glass-card-strong rounded-2xl shadow-2xl p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-ash-navy mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Preview
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This is what will be copied to clipboard
                  </p>
                  <div className="bg-white/50 rounded-xl p-4 border-2 border-gray-200 min-h-[300px] font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-gray-800">
                      {generatePreview()}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Back Button */}
      <button
        onClick={() => {
          if (selectedTemplate) {
            handleBack()
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
      <SearchOverlay currentPage="dap" />
    </div>
  )
}

export default DAPHelper
