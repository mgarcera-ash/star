import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import SearchOverlay from './SearchOverlay'

// 3D Vehicle Model Component with auto-rotation
function VehicleModel() {
  const modelRef = useRef()

  try {
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}assets/models/vehicle.glb`)

    // Auto-rotate the model
    useFrame((state, delta) => {
      if (modelRef.current) {
        modelRef.current.rotation.y += delta * 0.2 // Slow rotation
      }
    })

    return (
      <group ref={modelRef}>
        <primitive object={scene} scale={300} position={[0, -20, 0]} />
      </group>
    )
  } catch (error) {
    console.error('Error loading 3D model:', error)
    return null
  }
}

// Main Component
const VehicleSafetyCheck = ({ onBack }) => {
  // Inspection checkpoints
  const checkpoints = [
    {
      id: 'tires',
      title: 'Tires & Wheels',
      icon: '🛞',
      items: [
        'Tire inflation adequate (all 4)',
        'Tread depth sufficient',
        'No sidewall damage or bulges',
        'Lug nuts tight and secure',
        'Check for any foreign objects'
      ]
    },
    {
      id: 'front-lights',
      title: 'Front Lights',
      icon: '💡',
      items: [
        'Headlights working (low and high beam)',
        'Turn signals functioning',
        'Fog lights operational (if equipped)',
        'No cracks in lenses',
        'All bulbs properly seated'
      ]
    },
    {
      id: 'rear-lights',
      title: 'Rear Lights',
      icon: '🔴',
      items: [
        'Brake lights working',
        'Tail lights functioning',
        'Turn signals operational',
        'Reverse lights working',
        'License plate light on'
      ]
    },
    {
      id: 'mirrors',
      title: 'Mirrors & Windows',
      icon: '🪟',
      items: [
        'Side mirrors clean and adjusted',
        'Rearview mirror adjusted properly',
        'No cracks in windshield',
        'All windows clean',
        'No obstructions to visibility'
      ]
    },
    {
      id: 'body',
      title: 'Body & Doors',
      icon: '🚐',
      items: [
        'All doors secure and lock properly',
        'No visible body damage',
        'Sliding door operates smoothly',
        'Rear doors close and latch',
        'Fuel cap secure'
      ]
    },
    {
      id: 'engine',
      title: 'Under the Hood',
      icon: '🔧',
      items: [
        'Oil level adequate (check dipstick)',
        'Coolant level sufficient',
        'Brake fluid at proper level',
        'Power steering fluid adequate',
        'Windshield washer fluid filled',
        'Battery terminals clean and tight',
        'No visible leaks or damage'
      ]
    },
    {
      id: 'interior',
      title: 'Inside the Cab',
      icon: '🪑',
      items: [
        'Steering operates smoothly',
        'Seatbelt functional (no frays)',
        'Seatbelt latches and retracts',
        'Seats adjusted and secure',
        'Dashboard warning lights check',
        'Horn works',
        'Wipers and washers functional'
      ]
    },
    {
      id: 'safety',
      title: 'Safety Equipment',
      icon: '🚑',
      items: [
        'First aid kit present',
        'First aid kit properly stocked',
        'Fire extinguisher accessible',
        'Emergency triangle/flares',
        'Flashlight with working batteries'
      ]
    },
    {
      id: 'documentation',
      title: 'Documentation',
      icon: '📋',
      items: [
        'Insurance card present and current',
        'Registration present and current',
        'Vehicle inspection sticker valid',
        'Telematics device functioning',
        'Duty status set correctly'
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
            Vehicle Safety Check
          </h1>
          <p className="text-white/90 text-lg mt-2 drop-shadow">
            Interactive 3D inspection reference
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6 px-6 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Floating 3D Model */}
            <div className="relative h-[800px]">
              <Suspense
                fallback={
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🔄</div>
                      <div className="text-white text-xl font-semibold drop-shadow">Loading 3D model...</div>
                      <div className="text-white/80 text-sm mt-2 drop-shadow">This may take a moment</div>
                    </div>
                  </div>
                }
              >
                <Canvas camera={{ position: [40, 25, 40], fov: 40 }}>
                  <ambientLight intensity={1.2} />
                  <directionalLight position={[30, 30, 20]} intensity={2} />
                  <directionalLight position={[-30, 20, -20]} intensity={1.2} />
                  <directionalLight position={[0, -20, 0]} intensity={0.8} />
                  <spotLight position={[0, 50, 0]} intensity={1.5} angle={0.5} penumbra={1} />

                  <VehicleModel />
                </Canvas>
              </Suspense>
            </div>

            {/* Right Column - Inspection Checkpoints */}
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">
                  Inspection Checkpoints
                </h2>
                <p className="text-base text-white/90 drop-shadow">
                  Click any checkpoint to view detailed inspection items.
                </p>
              </div>

              <div className="space-y-3 max-h-[730px] overflow-y-auto pr-2">
                {checkpoints.map((checkpoint) => (
                  <details
                    key={checkpoint.id}
                    className="glass-card-strong rounded-2xl shadow-xl overflow-hidden group"
                  >
                    <summary className="cursor-pointer p-5 hover:bg-white/50 transition-all list-none">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{checkpoint.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-ash-navy group-open:text-ash-teal transition-colors">
                            {checkpoint.title}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {checkpoint.items.length} items to check
                          </p>
                        </div>
                        <svg
                          className="w-6 h-6 text-ash-teal transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </summary>

                    <div className="px-5 pb-5 pt-2">
                      <div className="bg-white/50 rounded-xl p-4">
                        <h4 className="font-semibold text-ash-navy mb-3 text-sm">What to check:</h4>
                        <ul className="space-y-2">
                          {checkpoint.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-ash-teal mt-0.5 flex-shrink-0">✓</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
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

export default VehicleSafetyCheck
