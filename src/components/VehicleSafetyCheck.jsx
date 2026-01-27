import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html } from '@react-three/drei'
import SearchOverlay from './SearchOverlay'

// 3D Vehicle Model Component
function VehicleModel({ onPartClick, completedAreas }) {
  const { scene } = useGLTF('/star/assets/models/vehicle.glb')

  return (
    <group>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />

      {/* Clickable Hotspots */}
      <Hotspot
        position={[-1.2, -0.5, 1.5]}
        label="Tires"
        area="tires"
        completed={completedAreas.includes('tires')}
        onClick={() => onPartClick('tires')}
      />
      <Hotspot
        position={[0, 0.5, 2.2]}
        label="Lights"
        area="lights"
        completed={completedAreas.includes('lights')}
        onClick={() => onPartClick('lights')}
      />
      <Hotspot
        position={[-1.5, 0.8, 1]}
        label="Mirrors"
        area="mirrors"
        completed={completedAreas.includes('mirrors')}
        onClick={() => onPartClick('mirrors')}
      />
      <Hotspot
        position={[0, 0.3, -1.5]}
        label="Body"
        area="body"
        completed={completedAreas.includes('body')}
        onClick={() => onPartClick('body')}
      />
      <Hotspot
        position={[0, 0.2, 2]}
        label="Hood"
        area="hood"
        completed={completedAreas.includes('hood')}
        onClick={() => onPartClick('hood')}
      />
      <Hotspot
        position={[0, 0, 0]}
        label="Interior"
        area="interior"
        completed={completedAreas.includes('interior')}
        onClick={() => onPartClick('interior')}
      />
      <Hotspot
        position={[1, 0, 0]}
        label="Safety"
        area="safety"
        completed={completedAreas.includes('safety')}
        onClick={() => onPartClick('safety')}
      />
      <Hotspot
        position={[-1, 0, 0]}
        label="Docs"
        area="documentation"
        completed={completedAreas.includes('documentation')}
        onClick={() => onPartClick('documentation')}
      />
    </group>
  )
}

// Clickable Hotspot Component
function Hotspot({ position, label, area, completed, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial
        color={completed ? '#3AAFA9' : (hovered ? '#2B4F73' : '#05205B')}
        transparent
        opacity={0.8}
      />
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-white px-3 py-1 rounded shadow-lg text-sm font-semibold text-ash-navy whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  )
}

// Main Component
const VehicleSafetyCheck = ({ onBack }) => {
  const [checklistType, setChecklistType] = useState(null) // 'pre-trip' or 'post-trip'
  const [selectedArea, setSelectedArea] = useState(null)
  const [completedAreas, setCompletedAreas] = useState([])
  const [checklistData, setChecklistData] = useState({})
  const [showReport, setShowReport] = useState(false)

  // Inspection area definitions
  const inspectionAreas = {
    tires: {
      title: 'Tires',
      icon: '🛞',
      items: [
        'Tire inflation adequate (all 4)',
        'Tread depth sufficient',
        'No sidewall damage',
        'Lug nuts secure'
      ]
    },
    lights: {
      title: 'Lights',
      icon: '💡',
      items: [
        'Headlights working',
        'Tail/brake lights working',
        'Turn signals working',
        'Hazard lights working'
      ]
    },
    mirrors: {
      title: 'Mirrors & Windows',
      icon: '🪟',
      items: [
        'All mirrors clean and adjusted',
        'No cracks in windshield',
        'Windows clean',
        'No obstructions to visibility'
      ]
    },
    body: {
      title: 'Body & Load',
      icon: '🚐',
      items: [
        'All doors secure',
        'No loose cargo',
        'Check for visible damage',
        'Cargo area secured'
      ]
    },
    hood: {
      title: 'Under the Hood',
      icon: '🔧',
      items: [
        'Oil level adequate (no warning light)',
        'Coolant level adequate (no warning light)',
        'Brake fluid adequate (no warning light)',
        'Power steering fluid adequate',
        'Windshield washer fluid adequate'
      ]
    },
    interior: {
      title: 'Inside the Cab',
      icon: '🪑',
      items: [
        'Steering operates smoothly',
        'Seatbelt functional (no frays)',
        'Seatbelt latches and retracts properly',
        'No dashboard warning lights after startup'
      ]
    },
    safety: {
      title: 'Safety Equipment',
      icon: '🚑',
      items: [
        'First aid kit present',
        'First aid kit properly stocked'
      ]
    },
    documentation: {
      title: 'Documentation',
      icon: '📋',
      items: [
        'Insurance card present and up to date',
        'Registration present and up to date',
        'Telematics device functioning',
        'Duty status set correctly'
      ]
    }
  }

  const postTripItems = {
    title: 'Post-Trip',
    items: [
      'Document ending mileage',
      'Document ending fuel level',
      'Report any issues encountered',
      'Report any incidents'
    ]
  }

  const handleAreaComplete = (area) => {
    if (!completedAreas.includes(area)) {
      setCompletedAreas([...completedAreas, area])
    }
    setSelectedArea(null)
  }

  const handleCheckItem = (area, itemIndex) => {
    const areaData = checklistData[area] || []
    const newAreaData = [...areaData]
    newAreaData[itemIndex] = !newAreaData[itemIndex]

    setChecklistData({
      ...checklistData,
      [area]: newAreaData
    })
  }

  const isAreaComplete = (area) => {
    const items = checklistType === 'post-trip' ? postTripItems.items : inspectionAreas[area]?.items || []
    const checkedItems = checklistData[area] || []
    return items.every((_, index) => checkedItems[index])
  }

  const handleSubmitInspection = () => {
    setShowReport(true)
  }

  const generateReport = () => {
    const timestamp = new Date().toLocaleString()
    const type = checklistType === 'pre-trip' ? 'Pre-Trip' : 'Post-Trip'

    let report = `${type} Vehicle Safety Inspection\n`
    report += `Date/Time: ${timestamp}\n`
    report += `Vehicle: Chevrolet Express / GMC Savana 2500\n\n`

    if (checklistType === 'pre-trip') {
      Object.keys(inspectionAreas).forEach(area => {
        if (completedAreas.includes(area)) {
          report += `✓ ${inspectionAreas[area].title}\n`
          inspectionAreas[area].items.forEach((item, idx) => {
            const checked = checklistData[area]?.[idx]
            report += `  ${checked ? '✓' : '○'} ${item}\n`
          })
          report += '\n'
        }
      })
      report += '\n360° Walk-Around: Completed\n'
    } else {
      postTripItems.items.forEach((item, idx) => {
        const checked = checklistData.postTrip?.[idx]
        report += `${checked ? '✓' : '○'} ${item}\n`
      })
    }

    return report
  }

  const handleCopyReport = async () => {
    const report = generateReport()
    try {
      await navigator.clipboard.writeText(report)
      alert('Report copied to clipboard!')
    } catch (err) {
      alert('Failed to copy to clipboard. Please try again.')
    }
  }

  // Type Selection Screen
  if (!checklistType) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-white py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
              Vehicle Safety Check
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center drop-shadow">
              Select Inspection Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setChecklistType('pre-trip')}
                className="glass-card-strong rounded-3xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-200 hover:scale-105"
              >
                <div className="text-6xl mb-4">🌅</div>
                <h3 className="text-2xl font-bold text-ash-navy mb-2">Pre-Trip Inspection</h3>
                <p className="text-gray-700 mb-4">Complete before starting your shift</p>
                <div className="text-sm text-gray-600">
                  ~5 minutes • 8 inspection areas
                </div>
              </button>

              <button
                onClick={() => setChecklistType('post-trip')}
                className="glass-card-strong rounded-3xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-200 hover:scale-105"
              >
                <div className="text-6xl mb-4">🌆</div>
                <h3 className="text-2xl font-bold text-ash-navy mb-2">Post-Trip Inspection</h3>
                <p className="text-gray-700 mb-4">Complete at end of shift</p>
                <div className="text-sm text-gray-600">
                  ~2 minutes • 4 items
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* Floating Back Button */}
        <button
          onClick={onBack}
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
        <SearchOverlay currentPage="vehicle" />
      </div>
    )
  }

  // Post-Trip Checklist (Simple Form)
  if (checklistType === 'post-trip' && !showReport) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-white py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
              Post-Trip Inspection
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card-strong rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-ash-navy mb-6">Post-Trip Checklist</h2>

              <div className="space-y-4">
                {postTripItems.items.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checklistData.postTrip?.[index] || false}
                      onChange={() => handleCheckItem('postTrip', index)}
                      className="mt-1 w-5 h-5 text-ash-teal focus:ring-ash-teal rounded"
                    />
                    <span className="text-lg text-gray-700">{item}</span>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setChecklistType(null)}
                  className="px-6 py-3 border-2 border-ash-navy text-ash-navy rounded-xl font-semibold hover:bg-ash-navy hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitInspection}
                  disabled={!isAreaComplete('postTrip')}
                  className="flex-grow px-6 py-3 bg-ash-teal text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Complete Post-Trip
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Floating Back Button */}
        <button
          onClick={() => setChecklistType(null)}
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
        <SearchOverlay currentPage="vehicle" />
      </div>
    )
  }

  // Report Screen
  if (showReport) {
    const report = generateReport()

    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-white py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
              Inspection Complete
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card-strong rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-ash-navy mb-2">
                  {checklistType === 'pre-trip' ? 'Pre-Trip' : 'Post-Trip'} Complete
                </h2>
                <p className="text-gray-600">
                  Inspection recorded at {new Date().toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-ash-navy mb-3">Inspection Report:</h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {report}
                </pre>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCopyReport}
                  className="flex-1 px-6 py-3 border-2 border-ash-teal text-ash-teal rounded-xl font-semibold hover:bg-ash-teal hover:text-white transition-colors"
                >
                  Copy Report
                </button>
                <button
                  onClick={() => {
                    setChecklistType(null)
                    setCompletedAreas([])
                    setChecklistData({})
                    setShowReport(false)
                  }}
                  className="flex-1 px-6 py-3 bg-ash-teal text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  New Inspection
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Floating Back Button */}
        <button
          onClick={() => {
            setChecklistType(null)
            setCompletedAreas([])
            setChecklistData({})
            setShowReport(false)
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
        <SearchOverlay currentPage="vehicle" />
      </div>
    )
  }

  // Pre-Trip 3D Inspection Screen
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-impact drop-shadow-lg tracking-wide uppercase">
              Pre-Trip Inspection
            </h1>
            <p className="text-white/90 text-sm mt-1 drop-shadow">Click vehicle parts to inspect</p>
          </div>

          <div className="text-right">
            <div className="text-sm text-white/80 drop-shadow">Progress</div>
            <div className="text-2xl font-bold text-white drop-shadow">
              {completedAreas.length} / 8
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row pb-24 md:pb-8">
        {/* 3D Viewer */}
        <div className="flex-1 relative h-[500px] lg:h-auto">
          <Suspense fallback={
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">🔄</div>
                <div className="text-white drop-shadow text-lg">Loading 3D model...</div>
              </div>
            </div>
          }>
            <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <VehicleModel
                onPartClick={setSelectedArea}
                completedAreas={completedAreas}
              />
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={3}
                maxDistance={15}
              />
            </Canvas>
          </Suspense>

          <div className="absolute bottom-4 left-4 glass-card-strong rounded-lg p-3 shadow-lg">
            <div className="text-xs text-gray-600 mb-1">Controls:</div>
            <div className="text-xs text-gray-700">
              🖱️ Drag to rotate • Scroll to zoom
            </div>
          </div>
        </div>

        {/* Checklist Panel */}
        <div className="w-full lg:w-96 glass-card-strong lg:border-l-4 lg:border-ash-teal overflow-y-auto">
          {!selectedArea ? (
            <div className="p-6">
              <h3 className="text-xl font-bold text-ash-navy mb-4">
                Inspection Areas
              </h3>

              <div className="space-y-2">
                {Object.keys(inspectionAreas).map(area => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`w-full p-4 rounded-xl text-left transition-all shadow-lg ${
                      completedAreas.includes(area)
                        ? 'bg-ash-teal/10 border-2 border-ash-teal'
                        : 'bg-white/50 border-2 border-transparent hover:border-ash-navy hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{inspectionAreas[area].icon}</span>
                        <span className="font-semibold text-ash-navy">
                          {inspectionAreas[area].title}
                        </span>
                      </div>
                      {completedAreas.includes(area) && (
                        <span className="text-ash-teal text-xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {completedAreas.length === 8 && (
                <div className="mt-6">
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                      <span className="text-xl">✓</span>
                      All areas inspected!
                    </div>
                    <p className="text-sm text-green-600">
                      Complete the 360° walk-around, then submit your inspection.
                    </p>
                  </div>

                  <button
                    onClick={handleSubmitInspection}
                    className="w-full px-6 py-4 bg-ash-teal text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                  >
                    Complete Pre-Trip Inspection
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              <button
                onClick={() => setSelectedArea(null)}
                className="mb-4 flex items-center gap-2 text-ash-teal hover:text-ash-accent font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to areas
              </button>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{inspectionAreas[selectedArea].icon}</span>
                <h3 className="text-2xl font-bold text-ash-navy">
                  {inspectionAreas[selectedArea].title}
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                {inspectionAreas[selectedArea].items.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checklistData[selectedArea]?.[index] || false}
                      onChange={() => handleCheckItem(selectedArea, index)}
                      className="mt-1 w-5 h-5 text-ash-teal focus:ring-ash-teal rounded"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => handleAreaComplete(selectedArea)}
                disabled={!isAreaComplete(selectedArea)}
                className="w-full px-6 py-3 bg-ash-teal text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                Mark {inspectionAreas[selectedArea].title} Complete
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Back Button */}
      <button
        onClick={() => setChecklistType(null)}
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
      <SearchOverlay currentPage="vehicle" />
    </div>
  )
}

export default VehicleSafetyCheck
