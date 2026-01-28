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
      iconColor: 'text-blue-500',
      description: 'For transport requests and coordination',
      totalSteps: 5
    },
    {
      id: 'wellbeing',
      title: 'Senior Well-Being Check',
      icon: <TbOld className="w-full h-full" />,
      iconColor: 'text-purple-500',
      description: 'For wellness visits and follow-ups',
      totalSteps: 5
    },
    {
      id: 'crisis',
      title: 'Crisis Response/Shelter Placement',
      icon: <GrEmergency className="w-full h-full" />,
      iconColor: 'text-red-500',
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
    } else if (selectedTemplate?.id === 'wellbeing') {
      return generateWellbeingNote()
    } else if (selectedTemplate?.id === 'crisis') {
      return generateCrisisNote()
    }
    return 'Note generation not yet implemented for this template.'
  }

  const generateWellbeingNote = () => {
    const sections = []

    // DATA Section
    sections.push('DATA:')
    if (formData.contactMethod) {
      sections.push(`Contact Method: ${formData.contactMethod}${formData.contactMethodOther ? ` - ${formData.contactMethodOther}` : ''}`)
    }
    if (formData.checkDateTime) {
      sections.push(`Date and Time: ${formData.checkDateTime}`)
    }
    if (formData.clientPresentation) {
      sections.push(`Client Presentation: ${formData.clientPresentation}${formData.clientPresentationOther ? ` - ${formData.clientPresentationOther}` : ''}`)
    }

    const homeEnv = formData.homeEnvironment
    if (homeEnv && Object.keys(homeEnv).some(k => homeEnv[k])) {
      const items = Object.entries(homeEnv)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1'))
      if (items.length > 0) {
        sections.push(`Home Environment: ${items.join(', ')}`)
      }
    }
    if (formData.homeEnvDetails) {
      sections.push(`Environmental Details: ${formData.homeEnvDetails}`)
    }

    if (formData.physicalAppearance) {
      sections.push(`Physical Appearance: ${formData.physicalAppearance}`)
    }

    const utilities = formData.utilitiesStatus
    if (utilities && Object.keys(utilities).some(k => utilities[k])) {
      const items = Object.entries(utilities)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1'))
      if (items.length > 0) {
        sections.push(`Utilities: ${items.join(', ')}`)
      }
    }

    if (formData.foodAvailability) {
      sections.push(`Food: ${formData.foodAvailability}`)
    }
    if (formData.medicationManagement) {
      sections.push(`Medications: ${formData.medicationManagement}`)
    }
    if (formData.clientStatements) {
      sections.push(`Client Statements: ${formData.clientStatements}`)
    }

    // ASSESSMENT Section
    sections.push('\nASSESSMENT:')
    if (formData.safetyLevel) {
      sections.push(`Safety Level: ${formData.safetyLevel}`)
    }
    if (formData.selfCareAbility) {
      sections.push(`Self-care: ${formData.selfCareAbility}`)
    }
    if (formData.cognitiveStatus) {
      sections.push(`Cognitive Status: ${formData.cognitiveStatus}`)
    }

    const risks = formData.riskFactors
    if (risks && Object.keys(risks).some(k => risks[k])) {
      const items = Object.entries(risks)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => {
          if (key === 'other' && formData.riskFactorsOther) {
            return formData.riskFactorsOther
          }
          return key.replace(/([A-Z])/g, ' $1')
        })
      if (items.length > 0) {
        sections.push(`Risk Factors: ${items.join(', ')}`)
      }
    }

    if (formData.supportSystem) {
      sections.push(`Support System: ${formData.supportSystem}`)
    }
    if (formData.supportDetails) {
      sections.push(`Support Details: ${formData.supportDetails}`)
    }

    // PLAN Section
    sections.push('\nPLAN:')
    const actions = formData.immediateActions
    if (actions && Object.keys(actions).some(k => actions[k])) {
      const items = Object.entries(actions)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => {
          if (key === 'other' && formData.immediateActionsOther) {
            return formData.immediateActionsOther
          }
          return key.replace(/([A-Z])/g, ' $1')
        })
      if (items.length > 0) {
        sections.push(`Immediate Actions: ${items.join(', ')}`)
      }
    }

    if (formData.followupTimeframe) {
      sections.push(`Follow-up: ${formData.followupTimeframe}`)
    }
    if (formData.additionalActions) {
      sections.push(`Additional Actions: ${formData.additionalActions}`)
    }

    return sections.join('\n')
  }

  const generateCrisisNote = () => {
    const sections = []

    // DATA Section
    sections.push('DATA:')
    if (formData.presentingSituation) {
      sections.push(`Situation: ${formData.presentingSituation}${formData.presentingSituationOther ? ` - ${formData.presentingSituationOther}` : ''}`)
    }
    if (formData.contactDateTime) {
      sections.push(`Date and Time: ${formData.contactDateTime}`)
    }
    if (formData.currentLocation) {
      sections.push(`Location: ${formData.currentLocation}`)
    }

    const needs = formData.immediateNeeds
    if (needs && Object.keys(needs).some(k => needs[k])) {
      const items = Object.entries(needs)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => {
          if (key === 'other' && formData.immediateNeedsOther) {
            return formData.immediateNeedsOther
          }
          return key.replace(/([A-Z])/g, ' $1')
        })
      if (items.length > 0) {
        sections.push(`Immediate Needs: ${items.join(', ')}`)
      }
    }

    if (formData.clientPresentation) {
      sections.push(`Client Presentation: ${formData.clientPresentation}${formData.clientPresentationOther ? ` - ${formData.clientPresentationOther}` : ''}`)
    }

    const safety = formData.safetyConcerns
    if (safety && Object.keys(safety).some(k => safety[k])) {
      const items = Object.entries(safety)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1'))
      if (items.length > 0) {
        sections.push(`Safety Concerns: ${items.join(', ')}`)
      }
    }
    if (formData.safetyConcernDetails) {
      sections.push(`Safety Details: ${formData.safetyConcernDetails}`)
    }

    const resources = formData.resourcesAvailable
    if (resources && Object.keys(resources).some(k => resources[k])) {
      const items = Object.entries(resources)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1'))
      if (items.length > 0) {
        sections.push(`Resources Available: ${items.join(', ')}`)
      }
    }

    if (formData.situationStatements) {
      sections.push(`Client Statements: ${formData.situationStatements}`)
    }

    // ASSESSMENT Section
    sections.push('\nASSESSMENT:')
    if (formData.crisisLevel) {
      sections.push(`Crisis Level: ${formData.crisisLevel}`)
    }
    if (formData.decisionCapacity) {
      sections.push(`Decision-making Capacity: ${formData.decisionCapacity}`)
    }
    if (formData.capacityDetails) {
      sections.push(`Capacity Details: ${formData.capacityDetails}`)
    }

    const barriers = formData.housingBarriers
    if (barriers && Object.keys(barriers).some(k => barriers[k])) {
      const items = Object.entries(barriers)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => {
          if (key === 'other' && formData.housingBarriersOther) {
            return formData.housingBarriersOther
          }
          return key.replace(/([A-Z])/g, ' $1')
        })
      if (items.length > 0) {
        sections.push(`Housing Barriers: ${items.join(', ')}`)
      }
    }

    if (formData.mhsuConcerns) {
      sections.push(`MH/SU Concerns: ${formData.mhsuConcerns}`)
    }
    if (formData.mhsuDetails) {
      sections.push(`MH/SU Details: ${formData.mhsuDetails}`)
    }
    if (formData.clientMotivation) {
      sections.push(`Client Engagement: ${formData.clientMotivation}`)
    }

    // PLAN Section
    sections.push('\nPLAN:')
    const actions = formData.immediateActionTaken
    if (actions && Object.keys(actions).some(k => actions[k])) {
      const items = Object.entries(actions)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => {
          if (key === 'other' && formData.immediateActionTakenOther) {
            return formData.immediateActionTakenOther
          }
          return key.replace(/([A-Z])/g, ' $1')
        })
      if (items.length > 0) {
        sections.push(`Immediate Actions: ${items.join(', ')}`)
      }
    }

    if (formData.placementCompleted === 'yes') {
      if (formData.shelterName) sections.push(`Shelter: ${formData.shelterName}`)
      if (formData.shelterAddress) sections.push(`Address: ${formData.shelterAddress}`)
      if (formData.bedConfirmed) sections.push(`Bed Confirmed: ${formData.bedConfirmed}`)
      if (formData.checkinTime) sections.push(`Check-in Time: ${formData.checkinTime}`)
      if (formData.transportArranged) sections.push(`Transportation: ${formData.transportArranged}`)
    } else if (formData.placementCompleted === 'no') {
      if (formData.placementNotCompletedReason) {
        sections.push(`Placement Not Completed: ${formData.placementNotCompletedReason}${formData.placementNotCompletedReasonOther ? ` - ${formData.placementNotCompletedReasonOther}` : ''}`)
      }
      if (formData.alternativeAction) {
        sections.push(`Alternative Action: ${formData.alternativeAction}`)
      }
    }

    const followup = formData.followupPlan
    if (followup && Object.keys(followup).some(k => followup[k])) {
      const items = Object.entries(followup)
        .filter(([_, checked]) => checked)
        .map(([key, _]) => {
          if (key === 'other' && formData.followupPlanOther) {
            return formData.followupPlanOther
          }
          return key.replace(/([A-Z])/g, ' $1')
        })
      if (items.length > 0) {
        sections.push(`Follow-up Plan: ${items.join(', ')}`)
      }
    }

    if (formData.followupTimeframe) {
      sections.push(`Follow-up Timeframe: ${formData.followupTimeframe}`)
    }
    if (formData.safetyPlanDiscussed) {
      sections.push(`Safety Planning: ${formData.safetyPlanDiscussed}`)
    }
    if (formData.additionalNotes) {
      sections.push(`Additional Notes: ${formData.additionalNotes}`)
    }

    return sections.join('\n')
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

    if (selectedTemplate?.id === 'transportation') {
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
    } else if (selectedTemplate?.id === 'wellbeing') {
      const required = ['contactMethod', 'clientPresentation', 'safetyLevel', 'selfCareAbility',
                       'cognitiveStatus', 'supportSystem', 'followupTimeframe']
      const allFilled = required.every(field => formData[field])
      checks.push({ text: 'All required fields completed', passed: allFilled })
      checks.push({ text: 'Follow-up timeframe specified', passed: !!formData.followupTimeframe })
      checks.push({ text: 'Cognitive status assessed', passed: !!formData.cognitiveStatus })
    } else if (selectedTemplate?.id === 'crisis') {
      const required = ['presentingSituation', 'currentLocation', 'clientPresentation', 'crisisLevel',
                       'decisionCapacity', 'clientMotivation', 'followupTimeframe']
      const allFilled = required.every(field => formData[field])
      checks.push({ text: 'All required fields completed', passed: allFilled })
      checks.push({ text: 'Crisis level assessed', passed: !!formData.crisisLevel })
      checks.push({ text: 'Follow-up timeframe specified', passed: !!formData.followupTimeframe })

      const hasSafety = formData.safetyConcerns && Object.keys(formData.safetyConcerns).some(k => formData.safetyConcerns[k] && k !== 'noImmediateSafetyConcerns')
      const hasDetails = !!formData.safetyConcernDetails
      checks.push({
        text: 'Safety concerns addressed if noted',
        passed: !hasSafety || hasDetails
      })
    }

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

  const renderWellbeingStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Contact Method <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.contactMethod || ''}
                onChange={(e) => handleFormChange('contactMethod', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="In-person visit">In-person visit</option>
                <option value="Phone call">Phone call</option>
                <option value="Video call">Video call</option>
                <option value="Other">Other (specify)</option>
              </select>
              {formData.contactMethod === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify contact method..."
                  value={formData.contactMethodOther || ''}
                  onChange={(e) => handleFormChange('contactMethodOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Date and Time of Check
              </label>
              <input
                type="datetime-local"
                value={formData.checkDateTime || ''}
                onChange={(e) => handleFormChange('checkDateTime', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
            </div>

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
                <option value="Alert and oriented">Alert and oriented</option>
                <option value="Some confusion noted">Some confusion noted</option>
                <option value="Significantly confused">Significantly confused</option>
                <option value="Appeared distressed">Appeared distressed</option>
                <option value="Unresponsive (emergency protocol followed)">Unresponsive (emergency protocol followed)</option>
                <option value="Other">Other (describe)</option>
              </select>
              {formData.clientPresentation === 'Other' && (
                <textarea
                  placeholder="Describe client presentation..."
                  value={formData.clientPresentationOther || ''}
                  onChange={(e) => handleFormChange('clientPresentationOther', e.target.value)}
                  rows={3}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Home Environment
              </label>
              <div className="space-y-2">
                {['cleanAndOrganized', 'someClutterNoted', 'significantClutterConcerns', 'unsafeConditions', 'unableToAssess'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.homeEnvironment?.[option] || false}
                      onChange={(e) => handleCheckboxChange('homeEnvironment', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'cleanAndOrganized' && 'Clean and organized'}
                      {option === 'someClutterNoted' && 'Some clutter noted'}
                      {option === 'significantClutterConcerns' && 'Significant clutter/hoarding concerns'}
                      {option === 'unsafeConditions' && 'Unsafe conditions identified'}
                      {option === 'unableToAssess' && 'Unable to assess (remote check)'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.homeEnvironment?.unsafeConditions && (
                <textarea
                  placeholder="Describe environmental concerns..."
                  value={formData.homeEnvDetails || ''}
                  onChange={(e) => handleFormChange('homeEnvDetails', e.target.value)}
                  rows={3}
                  className="mt-3 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Physical Appearance
              </label>
              <select
                value={formData.physicalAppearance || ''}
                onChange={(e) => handleFormChange('physicalAppearance', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Well-groomed and appropriate">Well-groomed and appropriate</option>
                <option value="Some self-care challenges noted">Some self-care challenges noted</option>
                <option value="Disheveled appearance">Disheveled appearance</option>
                <option value="Signs of neglect observed">Signs of neglect observed</option>
                <option value="Unable to assess (remote check)">Unable to assess (remote check)</option>
              </select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Utilities Status
              </label>
              <div className="space-y-2">
                {['allFunctioning', 'heatCoolingIssues', 'waterIssues', 'electricityIssues', 'otherConcerns'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.utilitiesStatus?.[option] || false}
                      onChange={(e) => handleCheckboxChange('utilitiesStatus', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'allFunctioning' && 'All functioning normally'}
                      {option === 'heatCoolingIssues' && 'Heat/cooling issues'}
                      {option === 'waterIssues' && 'Water issues'}
                      {option === 'electricityIssues' && 'Electricity issues'}
                      {option === 'otherConcerns' && 'Other concerns'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Food Availability
              </label>
              <div className="space-y-2">
                {['Adequate food in home', 'Limited food supply', 'No food available', 'Unable to assess'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="foodAvailability"
                      value={option}
                      checked={formData.foodAvailability === option}
                      onChange={(e) => handleFormChange('foodAvailability', e.target.value)}
                      className="w-5 h-5 text-ash-teal focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Medication Management
              </label>
              <div className="space-y-2">
                {['Managing medications independently', 'Some support needed', 'Unable to manage medications', 'No medications reported', 'Unable to assess'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="medicationManagement"
                      value={option}
                      checked={formData.medicationManagement === option}
                      onChange={(e) => handleFormChange('medicationManagement', e.target.value)}
                      className="w-5 h-5 text-ash-teal focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Client Statements
              </label>
              <textarea
                placeholder="Record any key statements or concerns expressed by client (use quotes when possible)"
                value={formData.clientStatements || ''}
                onChange={(e) => handleFormChange('clientStatements', e.target.value)}
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
                Client Safety Level <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.safetyLevel || ''}
                onChange={(e) => handleFormChange('safetyLevel', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="🟢 Safe - no immediate concerns">🟢 Safe - no immediate concerns</option>
                <option value="🟡 At-risk - monitoring recommended">🟡 At-risk - monitoring recommended</option>
                <option value="🔴 Immediate concern - action required">🔴 Immediate concern - action required</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Self-care Ability <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.selfCareAbility || ''}
                onChange={(e) => handleFormChange('selfCareAbility', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Independent with all activities">Independent with all activities</option>
                <option value="Needs some support">Needs some support</option>
                <option value="Needs significant support">Needs significant support</option>
                <option value="Unable to care for self">Unable to care for self</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Cognitive Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.cognitiveStatus || ''}
                onChange={(e) => handleFormChange('cognitiveStatus', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Alert and oriented x3">Alert and oriented x3 (person, place, time)</option>
                <option value="Some confusion noted">Some confusion noted</option>
                <option value="Moderate cognitive impairment">Moderate cognitive impairment</option>
                <option value="Significant cognitive impairment">Significant cognitive impairment</option>
                <option value="Unable to assess">Unable to assess</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Risk Factors Identified
              </label>
              <div className="space-y-2">
                {['socialIsolation', 'mobilityLimitations', 'medicationNonCompliance', 'fallRisk',
                  'financialExploitation', 'elderAbuse', 'mentalHealthConcerns', 'substanceUse', 'other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.riskFactors?.[option] || false}
                      onChange={(e) => handleCheckboxChange('riskFactors', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'socialIsolation' && 'Social isolation'}
                      {option === 'mobilityLimitations' && 'Mobility limitations'}
                      {option === 'medicationNonCompliance' && 'Medication non-compliance'}
                      {option === 'fallRisk' && 'Fall risk'}
                      {option === 'financialExploitation' && 'Financial exploitation concerns'}
                      {option === 'elderAbuse' && 'Elder abuse concerns'}
                      {option === 'mentalHealthConcerns' && 'Mental health concerns'}
                      {option === 'substanceUse' && 'Substance use concerns'}
                      {option === 'other' && 'Other'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.riskFactors?.other && (
                <input
                  type="text"
                  placeholder="Specify other risk factors..."
                  value={formData.riskFactorsOther || ''}
                  onChange={(e) => handleFormChange('riskFactorsOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Support System <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {['Family/friends actively involved', 'Limited support system', 'Socially isolated', 'Services currently in place'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="supportSystem"
                      value={option}
                      checked={formData.supportSystem === option}
                      onChange={(e) => handleFormChange('supportSystem', e.target.value)}
                      className="w-5 h-5 text-ash-teal focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Support Details
              </label>
              <textarea
                placeholder="Describe current support network and any gaps identified"
                value={formData.supportDetails || ''}
                onChange={(e) => handleFormChange('supportDetails', e.target.value)}
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
                Immediate Actions
              </label>
              <div className="space-y-2">
                {['referredToAPS', 'connectedToMealDelivery', 'medicalAppointmentScheduled',
                  'caseManagementAssigned', 'emergencyContactNotified', 'homeSafetyAssessment', 'other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.immediateActions?.[option] || false}
                      onChange={(e) => handleCheckboxChange('immediateActions', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'referredToAPS' && 'Referred to Adult Protective Services'}
                      {option === 'connectedToMealDelivery' && 'Connected to meal delivery services'}
                      {option === 'medicalAppointmentScheduled' && 'Medical appointment scheduled'}
                      {option === 'caseManagementAssigned' && 'Case management assigned'}
                      {option === 'emergencyContactNotified' && 'Emergency contact notified'}
                      {option === 'homeSafetyAssessment' && 'Home safety assessment requested'}
                      {option === 'other' && 'Other'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.immediateActions?.other && (
                <input
                  type="text"
                  placeholder="Specify other actions..."
                  value={formData.immediateActionsOther || ''}
                  onChange={(e) => handleFormChange('immediateActionsOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
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
                <option value="Within 24 hours">Within 24 hours</option>
                <option value="Within 3 days">Within 3 days</option>
                <option value="Within 1 week">Within 1 week</option>
                <option value="Within 2 weeks">Within 2 weeks</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="No follow-up needed">No follow-up needed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Additional Actions and Next Steps
              </label>
              <textarea
                placeholder="Detail any other actions taken and what should happen next"
                value={formData.additionalActions || ''}
                onChange={(e) => handleFormChange('additionalActions', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
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

  const renderCrisisStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Presenting Situation <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.presentingSituation || ''}
                onChange={(e) => handleFormChange('presentingSituation', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Experiencing homelessness">Experiencing homelessness</option>
                <option value="Domestic violence situation">Domestic violence situation</option>
                <option value="Eviction/housing loss">Eviction/housing loss</option>
                <option value="Mental health crisis">Mental health crisis</option>
                <option value="Substance use related">Substance use related</option>
                <option value="Family crisis">Family crisis</option>
                <option value="Other">Other (specify)</option>
              </select>
              {formData.presentingSituation === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify situation..."
                  value={formData.presentingSituationOther || ''}
                  onChange={(e) => handleFormChange('presentingSituationOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Date and Time of Contact
              </label>
              <input
                type="datetime-local"
                value={formData.contactDateTime || ''}
                onChange={(e) => handleFormChange('contactDateTime', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Current Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Where did you make contact with client?"
                value={formData.currentLocation || ''}
                onChange={(e) => handleFormChange('currentLocation', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Immediate Needs
              </label>
              <div className="space-y-2">
                {['emergencyShelter', 'food', 'medicalAttention', 'mentalHealthSupport',
                  'substanceUseSupport', 'clothing', 'hygieneSupplies', 'transportation', 'other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.immediateNeeds?.[option] || false}
                      onChange={(e) => handleCheckboxChange('immediateNeeds', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'emergencyShelter' && 'Emergency shelter'}
                      {option === 'food' && 'Food'}
                      {option === 'medicalAttention' && 'Medical attention'}
                      {option === 'mentalHealthSupport' && 'Mental health support'}
                      {option === 'substanceUseSupport' && 'Substance use support'}
                      {option === 'clothing' && 'Clothing'}
                      {option === 'hygieneSupplies' && 'Hygiene supplies'}
                      {option === 'transportation' && 'Transportation'}
                      {option === 'other' && 'Other'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.immediateNeeds?.other && (
                <input
                  type="text"
                  placeholder="Specify other needs..."
                  value={formData.immediateNeedsOther || ''}
                  onChange={(e) => handleFormChange('immediateNeedsOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

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
                <option value="Anxious but appropriate">Anxious but appropriate</option>
                <option value="Agitated or angry">Agitated or angry</option>
                <option value="Tearful/emotional distress">Tearful/emotional distress</option>
                <option value="Suicidal ideation expressed">Suicidal ideation expressed</option>
                <option value="Homicidal ideation expressed">Homicidal ideation expressed</option>
                <option value="Psychotic symptoms observed">Psychotic symptoms observed</option>
                <option value="Under the influence (suspected)">Under the influence (suspected)</option>
                <option value="Other">Other (describe)</option>
              </select>
              {formData.clientPresentation === 'Other' && (
                <textarea
                  placeholder="Describe client presentation..."
                  value={formData.clientPresentationOther || ''}
                  onChange={(e) => handleFormChange('clientPresentationOther', e.target.value)}
                  rows={3}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Safety Concerns
              </label>
              <div className="space-y-2">
                {['dangerToSelf', 'dangerToOthers', 'victimOfViolence', 'medicalEmergency', 'noImmediateSafetyConcerns'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.safetyConcerns?.[option] || false}
                      onChange={(e) => handleCheckboxChange('safetyConcerns', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'dangerToSelf' && 'Danger to self'}
                      {option === 'dangerToOthers' && 'Danger to others'}
                      {option === 'victimOfViolence' && 'Victim of violence'}
                      {option === 'medicalEmergency' && 'Medical emergency'}
                      {option === 'noImmediateSafetyConcerns' && 'No immediate safety concerns'}
                    </span>
                  </label>
                ))}
              </div>
              {(formData.safetyConcerns?.dangerToSelf || formData.safetyConcerns?.dangerToOthers ||
                formData.safetyConcerns?.victimOfViolence || formData.safetyConcerns?.medicalEmergency) && (
                <textarea
                  placeholder="Describe specific safety concerns and actions taken"
                  value={formData.safetyConcernDetails || ''}
                  onChange={(e) => handleFormChange('safetyConcernDetails', e.target.value)}
                  rows={4}
                  className="mt-3 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Resources Available to Client
              </label>
              <div className="space-y-2">
                {['governmentID', 'healthInsurance', 'incomeBenefits', 'belongings', 'phone', 'transportation', 'noneOfAbove'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.resourcesAvailable?.[option] || false}
                      onChange={(e) => handleCheckboxChange('resourcesAvailable', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'governmentID' && 'Government-issued ID'}
                      {option === 'healthInsurance' && 'Health insurance'}
                      {option === 'incomeBenefits' && 'Income/benefits'}
                      {option === 'belongings' && 'Belongings/bags'}
                      {option === 'phone' && 'Phone'}
                      {option === 'transportation' && 'Transportation'}
                      {option === 'noneOfAbove' && 'None of the above'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Client Statements About Situation
              </label>
              <textarea
                placeholder="Document client's description of their situation (use quotes when relevant)"
                value={formData.situationStatements || ''}
                onChange={(e) => handleFormChange('situationStatements', e.target.value)}
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
                Crisis Level <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.crisisLevel || ''}
                onChange={(e) => handleFormChange('crisisLevel', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="🟢 Non-urgent - stable situation">🟢 Non-urgent - stable situation</option>
                <option value="🟡 Moderate - needs support but not emergency">🟡 Moderate - needs support but not emergency</option>
                <option value="🟠 High - requires immediate intervention">🟠 High - requires immediate intervention</option>
                <option value="🔴 Immediate danger - emergency protocol">🔴 Immediate danger - emergency protocol</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Client Capacity for Decision-Making <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.decisionCapacity || ''}
                onChange={(e) => handleFormChange('decisionCapacity', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Able to make informed decisions">Able to make informed decisions</option>
                <option value="Impaired judgment">Impaired judgment (specify why)</option>
                <option value="Significantly impaired">Significantly impaired (specify why)</option>
                <option value="Incapacitated">Incapacitated (specify why)</option>
              </select>
              {formData.decisionCapacity && formData.decisionCapacity !== 'Able to make informed decisions' && (
                <textarea
                  placeholder="Specify why decision-making is impaired..."
                  value={formData.capacityDetails || ''}
                  onChange={(e) => handleFormChange('capacityDetails', e.target.value)}
                  rows={3}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Housing Barriers Identified
              </label>
              <div className="space-y-2">
                {['criminalHistory', 'pets', 'couplesPlacement', 'medicalNeeds', 'mobilityLimitations',
                  'mentalHealthConcerns', 'substanceUseHistory', 'noGovernmentID', 'incomeBarriers', 'other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.housingBarriers?.[option] || false}
                      onChange={(e) => handleCheckboxChange('housingBarriers', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'criminalHistory' && 'Criminal history'}
                      {option === 'pets' && 'Pets'}
                      {option === 'couplesPlacement' && 'Couples placement needed'}
                      {option === 'medicalNeeds' && 'Medical needs'}
                      {option === 'mobilityLimitations' && 'Mobility limitations'}
                      {option === 'mentalHealthConcerns' && 'Mental health concerns'}
                      {option === 'substanceUseHistory' && 'Substance use history'}
                      {option === 'noGovernmentID' && 'No government ID'}
                      {option === 'incomeBarriers' && 'Income barriers'}
                      {option === 'other' && 'Other'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.housingBarriers?.other && (
                <input
                  type="text"
                  placeholder="Specify other barriers..."
                  value={formData.housingBarriersOther || ''}
                  onChange={(e) => handleFormChange('housingBarriersOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Mental Health/Substance Use Concerns
              </label>
              <div className="space-y-2">
                {['None identified', 'Suspected (describe)', 'Self-reported (describe)', 'Observed symptoms (describe)'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="mhsuConcerns"
                      value={option}
                      checked={formData.mhsuConcerns === option}
                      onChange={(e) => handleFormChange('mhsuConcerns', e.target.value)}
                      className="w-5 h-5 text-ash-teal focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
              {formData.mhsuConcerns && formData.mhsuConcerns !== 'None identified' && (
                <textarea
                  placeholder="Describe MH/SU concerns..."
                  value={formData.mhsuDetails || ''}
                  onChange={(e) => handleFormChange('mhsuDetails', e.target.value)}
                  rows={3}
                  className="mt-3 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Client Motivation/Engagement <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.clientMotivation || ''}
                onChange={(e) => handleFormChange('clientMotivation', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Engaged and seeking help">Engaged and seeking help</option>
                <option value="Ambivalent about services">Ambivalent about services</option>
                <option value="Resistant to intervention">Resistant to intervention</option>
                <option value="Unable to assess">Unable to assess</option>
              </select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Immediate Action Taken
              </label>
              <div className="space-y-2">
                {['shelterPlacementCompleted', 'crisis988Referral', 'medicalTransport', 'crisisCounseling',
                  'resourcePacket', 'mobileCrisisTeam', 'policeNotified', 'other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.immediateActionTaken?.[option] || false}
                      onChange={(e) => handleCheckboxChange('immediateActionTaken', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'shelterPlacementCompleted' && 'Shelter placement completed'}
                      {option === 'crisis988Referral' && '988 crisis line referral'}
                      {option === 'medicalTransport' && 'Medical transport arranged'}
                      {option === 'crisisCounseling' && 'Crisis counseling provided'}
                      {option === 'resourcePacket' && 'Resource packet provided'}
                      {option === 'mobileCrisisTeam' && 'Connected to mobile crisis team'}
                      {option === 'policeNotified' && 'Police notified (safety concern)'}
                      {option === 'other' && 'Other'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.immediateActionTaken?.other && (
                <input
                  type="text"
                  placeholder="Specify other actions..."
                  value={formData.immediateActionTakenOther || ''}
                  onChange={(e) => handleFormChange('immediateActionTakenOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Shelter Placement
              </label>
              <div className="space-y-2 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="placementCompleted"
                    value="yes"
                    checked={formData.placementCompleted === 'yes'}
                    onChange={(e) => handleFormChange('placementCompleted', e.target.value)}
                    className="w-5 h-5 text-ash-teal focus:ring-ash-teal mr-3"
                  />
                  <span className="text-gray-800">Placement completed</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="placementCompleted"
                    value="no"
                    checked={formData.placementCompleted === 'no'}
                    onChange={(e) => handleFormChange('placementCompleted', e.target.value)}
                    className="w-5 h-5 text-ash-teal focus:ring-ash-teal mr-3"
                  />
                  <span className="text-gray-800">Placement NOT completed</span>
                </label>
              </div>

              {formData.placementCompleted === 'yes' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="text"
                    placeholder="Shelter name..."
                    value={formData.shelterName || ''}
                    onChange={(e) => handleFormChange('shelterName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Address..."
                    value={formData.shelterAddress || ''}
                    onChange={(e) => handleFormChange('shelterAddress', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={formData.bedConfirmed || ''}
                      onChange={(e) => handleFormChange('bedConfirmed', e.target.value)}
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                    >
                      <option value="">Bed confirmed?</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <input
                      type="time"
                      placeholder="Check-in time"
                      value={formData.checkinTime || ''}
                      onChange={(e) => handleFormChange('checkinTime', e.target.value)}
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                    />
                  </div>
                  <select
                    value={formData.transportArranged || ''}
                    onChange={(e) => handleFormChange('transportArranged', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                  >
                    <option value="">Transportation arranged?</option>
                    <option value="Yes">Yes</option>
                    <option value="No - client has own">No - client has own</option>
                  </select>
                </div>
              )}

              {formData.placementCompleted === 'no' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                  <select
                    value={formData.placementNotCompletedReason || ''}
                    onChange={(e) => handleFormChange('placementNotCompletedReason', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                  >
                    <option value="">Reason...</option>
                    <option value="No available beds">No available beds</option>
                    <option value="Client declined">Client declined</option>
                    <option value="Client not eligible">Client not eligible</option>
                    <option value="Barriers could not be resolved">Barriers could not be resolved</option>
                    <option value="Other">Other (specify)</option>
                  </select>
                  {formData.placementNotCompletedReason === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify reason..."
                      value={formData.placementNotCompletedReasonOther || ''}
                      onChange={(e) => handleFormChange('placementNotCompletedReasonOther', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                    />
                  )}
                  <textarea
                    placeholder="Alternative action taken..."
                    value={formData.alternativeAction || ''}
                    onChange={(e) => handleFormChange('alternativeAction', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Follow-up Plan
              </label>
              <div className="space-y-2">
                {['caseManagementReferral', 'recontactScheduled', 'warmHandoff', 'clientHasInfo', 'noFollowup', 'other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.followupPlan?.[option] || false}
                      onChange={(e) => handleCheckboxChange('followupPlan', option, e.target.checked)}
                      className="w-5 h-5 text-ash-teal rounded focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">
                      {option === 'caseManagementReferral' && 'Case management referral made'}
                      {option === 'recontactScheduled' && 'Re-contact scheduled (specify when)'}
                      {option === 'warmHandoff' && 'Warm handoff to another agency'}
                      {option === 'clientHasInfo' && 'Client has follow-up information'}
                      {option === 'noFollowup' && 'No follow-up needed (client declined)'}
                      {option === 'other' && 'Other'}
                    </span>
                  </label>
                ))}
              </div>
              {formData.followupPlan?.other && (
                <input
                  type="text"
                  placeholder="Specify other follow-up..."
                  value={formData.followupPlanOther || ''}
                  onChange={(e) => handleFormChange('followupPlanOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
                />
              )}
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
                <option value="Within 24 hours">Within 24 hours</option>
                <option value="Within 3 days">Within 3 days</option>
                <option value="Within 1 week">Within 1 week</option>
                <option value="Client to initiate contact">Client to initiate contact</option>
                <option value="No follow-up needed">No follow-up needed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-3">
                Safety Plan Discussed
              </label>
              <div className="space-y-2">
                {['Safety plan created and documented', 'Safety resources provided', 'Client declined safety planning', 'Not applicable'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="safetyPlanDiscussed"
                      value={option}
                      checked={formData.safetyPlanDiscussed === option}
                      onChange={(e) => handleFormChange('safetyPlanDiscussed', e.target.value)}
                      className="w-5 h-5 text-ash-teal focus:ring-ash-teal mr-3"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ash-navy mb-2">
                Additional Notes and Next Steps
              </label>
              <textarea
                placeholder="Any other important information or actions needed"
                value={formData.additionalNotes || ''}
                onChange={(e) => handleFormChange('additionalNotes', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-ash-teal focus:outline-none"
              />
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
    } else if (selectedTemplate?.id === 'wellbeing') {
      return renderWellbeingStep()
    } else if (selectedTemplate?.id === 'crisis') {
      return renderCrisisStep()
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
                    <div className={`text-6xl mb-4 w-16 h-16 mx-auto flex items-center justify-center ${template.iconColor || 'text-ash-teal'}`}>
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
