import { useState } from 'react'
import { FaVanShuttle } from 'react-icons/fa6'
import { TbOld } from 'react-icons/tb'
import { GrEmergency } from 'react-icons/gr'
import SearchOverlay from './SearchOverlay'

const DAPHelper = ({ onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [copySuccess, setCopySuccess] = useState(false)

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

  const handleCheckboxChange = (field, option, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...(prev[field] || {}),
        [option]: checked
      }
    }))
  }

  const handleCopyNote = async () => {
    const note = generateFormattedNote()
    try {
      await navigator.clipboard.writeText(note)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 3000)
    } catch (err) {
      alert('Failed to copy to clipboard. Please try again.')
    }
  }

  const handleStartNew = () => {
    setSelectedTemplate(null)
    setCurrentStep(0)
    setFormData({})
    setCopySuccess(false)
  }

  const generateFormattedNote = () => {
    if (selectedTemplate?.id === 'transportation') {
      return generateTransportationNote()
    }
    return 'Note generation not yet implemented for this template.'
  }

  const generateTransportationNote = () => {
    const sections = []

    // DATA Section
    sections.push('DATA:')
    if (formData.serviceType) {
      sections.push(`Service Type: ${formData.serviceType}${formData.serviceTypeOther ? ` - ${formData.serviceTypeOther}` : ''}`)
    }
    if (formData.pickupLocation) {
      sections.push(`Pick-up: ${formData.pickupLocation}${formData.pickupTime ? ` at ${formData.pickupTime}` : ''}`)
    }
    if (formData.dropoffLocation) {
      sections.push(`Drop-off: ${formData.dropoffLocation}${formData.dropoffTime ? ` at ${formData.dropoffTime}` : ''}`)
    }
    if (formData.clientPresentation) {
      sections.push(`Client Presentation: ${formData.clientPresentation}${formData.clientPresentationCustom ? ` - ${formData.clientPresentationCustom}` : ''}`)
    }

    const considerations = formData.specialConsiderations
    if (considerations && Object.keys(considerations).some(k => considerations[k])) {
      const items = Object.entries(considerations)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => {
          if (key === 'other' && formData.specialConsiderationsOther) {
            return formData.specialConsiderationsOther
          }
          return key.replace(/([A-Z])/g, ' $1').toLowerCase()
        })
      if (items.length > 0) {
        sections.push(`Special Considerations: ${items.join(', ')}`)
      }
    }

    if (formData.observations) {
      sections.push(`Notable Observations: ${formData.observations}`)
    }

    // ASSESSMENT Section
    sections.push('\nASSESSMENT:')
    if (formData.clientAppeared) {
      sections.push(`Client appeared: ${formData.clientAppeared}${formData.clientAppearedOther ? ` - ${formData.clientAppearedOther}` : ''}`)
    }
    if (formData.transportNeed) {
      sections.push(`Transportation need was: ${formData.transportNeed}`)
    }
    if (formData.safetyLevel) {
      sections.push(`Safety: ${formData.safetyLevel}`)
      if (formData.safetyDetails) {
        sections.push(`Safety Details: ${formData.safetyDetails}`)
      }
    }
    if (formData.followupNeeds) {
      sections.push(`Follow-up needs identified: ${formData.followupNeeds}`)
    }

    // PLAN Section
    sections.push('\nPLAN:')
    const actions = formData.actionsTaken
    if (actions && Object.keys(actions).some(k => actions[k])) {
      const items = Object.entries(actions)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => {
          if (key === 'other' && formData.actionsTakenOther) {
            return formData.actionsTakenOther
          }
          return key.replace(/([A-Z])/g, ' $1')
        })
      if (items.length > 0) {
        sections.push(`Actions taken: ${items.join(', ')}`)
      }
    }
    if (formData.nextSteps) {
      sections.push(`Next steps: ${formData.nextSteps}`)
    }
    if (formData.followupTimeframe) {
      sections.push(`Follow-up: ${formData.followupTimeframe}${formData.followupTimeframeOther ? ` - ${formData.followupTimeframeOther}` : ''}`)
    }

    return sections.join('\n')
  }

  const generatePreview = () => {
    if (currentStep === 5) {
      return generateFormattedNote()
    }
    return generateFormattedNote() || 'Fill out the form to see your note preview here.'
  }

  const getQualityChecks = () => {
    const checks = []
    const required = ['serviceType', 'pickupLocation', 'dropoffLocation', 'clientPresentation',
                     'clientAppeared', 'transportNeed', 'safetyLevel', 'followupTimeframe']

    const allFilled = required.every(field => formData[field])
    checks.push({ text: 'All required fields completed', passed: allFilled })

    checks.push({ text: 'Follow-up timeframe specified', passed: !!formData.followupTimeframe })

    const hasSafetyConcern = formData.safetyLevel && formData.safetyLevel !== 'No concerns identified'
    const hasDetails = !!formData.safetyDetails
    checks.push({
      text: 'Safety concerns addressed if noted',
      passed: !hasSafetyConcern || hasDetails
    })

    return checks
  }

  const renderTransportationStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.serviceType || ''}
                onChange={(e) => handleFormChange('serviceType', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select service type...</option>
                <option value="Transport to shelter">Transport to shelter</option>
                <option value="Transport to medical appointment">Transport to medical appointment</option>
                <option value="Transport to social services">Transport to social services</option>
                <option value="Other">Other (specify below)</option>
              </select>
              {formData.serviceType === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify other service type..."
                  value={formData.serviceTypeOther || ''}
                  onChange={(e) => handleFormChange('serviceTypeOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Pick-up Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Use specific address or intersection"
                value={formData.pickupLocation || ''}
                onChange={(e) => handleFormChange('pickupLocation', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Drop-off Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Use specific address or intersection"
                value={formData.dropoffLocation || ''}
                onChange={(e) => handleFormChange('dropoffLocation', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ash-navy mb-2">
                  Pick-up Time
                </label>
                <input
                  type="time"
                  value={formData.pickupTime || ''}
                  onChange={(e) => handleFormChange('pickupTime', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ash-navy mb-2">
                  Drop-off Time
                </label>
                <input
                  type="time"
                  value={formData.dropoffTime || ''}
                  onChange={(e) => handleFormChange('dropoffTime', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Client Presentation <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.clientPresentation || ''}
                onChange={(e) => handleFormChange('clientPresentation', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Calm and cooperative">Calm and cooperative</option>
                <option value="Appropriate for situation">Appropriate for situation</option>
                <option value="Anxious but engaged">Anxious but engaged</option>
                <option value="Agitated, required de-escalation">Agitated, required de-escalation</option>
                <option value="Confused or disoriented">Confused or disoriented</option>
                <option value="Custom">Custom (type your own)</option>
              </select>
              {formData.clientPresentation === 'Custom' && (
                <textarea
                  placeholder="Describe client presentation..."
                  value={formData.clientPresentationCustom || ''}
                  onChange={(e) => handleFormChange('clientPresentationCustom', e.target.value)}
                  rows={3}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Special Considerations
              </label>
              <div className="space-y-2">
                {['mobilityIssues', 'belongingsBags', 'petPresent', 'medicalEquipment', 'other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.specialConsiderations?.[option] || false}
                      onChange={(e) => handleCheckboxChange('specialConsiderations', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'mobilityIssues' && 'Mobility issues'}
                      {option === 'belongingsBags' && 'Belongings/bags'}
                      {option === 'petPresent' && 'Pet present'}
                      {option === 'medicalEquipment' && 'Medical equipment'}
                      {option === 'other' && 'Other'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.specialConsiderations?.other && (
                <input
                  type="text"
                  placeholder="Specify other considerations..."
                  value={formData.specialConsiderationsOther || ''}
                  onChange={(e) => handleFormChange('specialConsiderationsOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Notable Observations During Transport
              </label>
              <textarea
                placeholder="Describe what you observed during the transport"
                value={formData.observations || ''}
                onChange={(e) => handleFormChange('observations', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Client Appeared <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.clientAppeared || ''}
                onChange={(e) => handleFormChange('clientAppeared', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Stable and appropriate">Stable and appropriate</option>
                <option value="Mildly distressed">Mildly distressed</option>
                <option value="Significantly distressed">Significantly distressed</option>
                <option value="Unable to communicate effectively">Unable to communicate effectively</option>
                <option value="Other">Other (describe)</option>
              </select>
              {formData.clientAppeared === 'Other' && (
                <textarea
                  placeholder="Describe how client appeared..."
                  value={formData.clientAppearedOther || ''}
                  onChange={(e) => handleFormChange('clientAppearedOther', e.target.value)}
                  rows={3}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Transportation Need Was <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.transportNeed || ''}
                onChange={(e) => handleFormChange('transportNeed', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Routine/scheduled">Routine/scheduled</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Client Safety Concerns <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {['No concerns identified', 'Minor concerns (describe below)', 'Significant concerns (describe below)'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="safetyLevel"
                      value={option}
                      checked={formData.safetyLevel === option}
                      onChange={(e) => handleFormChange('safetyLevel', e.target.value)}
                      className="w-5 h-5 text-ash-teal focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
              {formData.safetyLevel && formData.safetyLevel !== 'No concerns identified' && (
                <textarea
                  placeholder="Describe safety concerns..."
                  value={formData.safetyDetails || ''}
                  onChange={(e) => handleFormChange('safetyDetails', e.target.value)}
                  rows={4}
                  className="mt-3 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Follow-up Needs Identified
              </label>
              <textarea
                placeholder="What additional support or services might this client need?"
                value={formData.followupNeeds || ''}
                onChange={(e) => handleFormChange('followupNeeds', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Actions Taken
              </label>
              <div className="space-y-2">
                {['transportedToDestination', 'connectedToServices', 'referredToCaseManagement',
                  'providedResourceInfo', 'followupScheduled', 'other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.actionsTaken?.[option] || false}
                      onChange={(e) => handleCheckboxChange('actionsTaken', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'transportedToDestination' && 'Transported to destination'}
                      {option === 'connectedToServices' && 'Connected to services on-site'}
                      {option === 'referredToCaseManagement' && 'Referred to case management'}
                      {option === 'providedResourceInfo' && 'Provided resource information'}
                      {option === 'followupScheduled' && 'Follow-up scheduled'}
                      {option === 'other' && 'Other'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.actionsTaken?.other && (
                <input
                  type="text"
                  placeholder="Specify other actions..."
                  value={formData.actionsTakenOther || ''}
                  onChange={(e) => handleFormChange('actionsTakenOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Next Steps
              </label>
              <textarea
                placeholder="What should happen next for this client?"
                value={formData.nextSteps || ''}
                onChange={(e) => handleFormChange('nextSteps', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Follow-up Timeframe <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.followupTimeframe || ''}
                onChange={(e) => handleFormChange('followupTimeframe', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="None needed">None needed</option>
                <option value="Within 24 hours">Within 24 hours</option>
                <option value="Within 1 week">Within 1 week</option>
                <option value="Within 2 weeks">Within 2 weeks</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="Other">Other (specify below)</option>
              </select>
              {formData.followupTimeframe === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify timeframe..."
                  value={formData.followupTimeframeOther || ''}
                  onChange={(e) => handleFormChange('followupTimeframeOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>
          </div>
        )

      case 5:
        const checks = getQualityChecks()
        const allPassed = checks.every(c => c.passed)

        return (
          <div className="space-y-6">
            <div className="glass-card border-l-4 border-ash-teal p-6 rounded-xl">
              <h3 className="text-lg font-bold text-ash-navy mb-4">Quality Checks</h3>
              <div className="space-y-2">
                {checks.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className={`text-xl ${check.passed ? 'text-green-500' : 'text-red-500'}`}>
                      {check.passed ? '✓' : '✗'}
                    </span>
                    <span className={check.passed ? 'text-gray-700' : 'text-red-600'}>
                      {check.text}
                    </span>
                  </div>
                ))}
              </div>
              {allPassed && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-semibold">✓ All checks passed! Ready to copy.</p>
                </div>
              )}
              {!allPassed && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-yellow-800 font-semibold">⚠ Please complete all required fields before copying.</p>
                </div>
              )}
            </div>

            <div className="glass-card border-l-4 border-ash-accent p-6 rounded-xl">
              <h3 className="text-lg font-bold text-ash-navy mb-3">Formatted Note Preview</h3>
              <div className="bg-white/50 rounded-xl p-4 border-2 border-gray-200 min-h-[200px]">
                <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">
                  {generateFormattedNote()}
                </pre>
              </div>
            </div>

            {copySuccess && (
              <div className="p-4 bg-green-50 border-2 border-green-500 rounded-xl flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-green-800 font-semibold">Copied! Paste into Salesforce</span>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const renderStepContent = () => {
    if (selectedTemplate?.id === 'transportation') {
      return renderTransportationStep()
    }
    return (
      <p className="text-gray-600">
        Template content for {selectedTemplate?.title} coming soon.
      </p>
    )
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

                  {renderStepContent()}

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
                          disabled={!getQualityChecks().every(c => c.passed)}
                          className={`px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl
                                   transform hover:scale-105 transition-all duration-200 font-semibold
                                   ${getQualityChecks().every(c => c.passed)
                                     ? 'bg-ash-teal'
                                     : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
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
                  <div className="bg-white/50 rounded-xl p-4 border-2 border-gray-200 min-h-[300px] max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">
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
