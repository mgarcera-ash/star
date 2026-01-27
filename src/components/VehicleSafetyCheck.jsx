import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import SearchOverlay from './SearchOverlay'
import { GiCarWheel, GiGearStick, GiMirrorMirror, GiCarSeat } from 'react-icons/gi'
import { PiHeadlights } from 'react-icons/pi'
import { FaCarSide, FaOilCan } from 'react-icons/fa'
import { MdHealthAndSafety } from 'react-icons/md'
import { TiDocumentText } from 'react-icons/ti'
import * as THREE from 'three'

// Camera Controller Component
function CameraController({ targetPosition }) {
  const { camera } = useThree()

  useFrame(() => {
    if (targetPosition) {
      camera.position.lerp(new THREE.Vector3(...targetPosition), 0.05)
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}

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
        <primitive object={scene} scale={300} position={[0, -5, 0]} />
      </group>
    )
  } catch (error) {
    console.error('Error loading 3D model:', error)
    return null
  }
}

// Main Component
const VehicleSafetyCheck = ({ onBack }) => {
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0)

  // Inspection checkpoints with camera positions
  const checkpoints = [
    {
      id: 'tires',
      title: 'Tires & Wheels',
      icon: <GiCarWheel className="w-full h-full" />,
      cameraPosition: [35, 10, 35],
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
      icon: <PiHeadlights className="w-full h-full" />,
      cameraPosition: [0, 20, 40],
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
      icon: <GiGearStick className="w-full h-full" />,
      cameraPosition: [0, 20, -40],
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
      icon: <GiMirrorMirror className="w-full h-full" />,
      cameraPosition: [40, 25, 15],
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
      icon: <FaCarSide className="w-full h-full" />,
      cameraPosition: [45, 18, 0],
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
      icon: <FaOilCan className="w-full h-full" />,
      cameraPosition: [15, 30, 35],
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
      icon: <GiCarSeat className="w-full h-full" />,
      cameraPosition: [35, 22, 25],
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
      icon: <MdHealthAndSafety className="w-full h-full" />,
      cameraPosition: [-35, 18, -25],
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
      icon: <TiDocumentText className="w-full h-full" />,
      cameraPosition: [30, 18, 30],
      items: [
        'Insurance card present and current',
        'Registration present and current',
        'Vehicle inspection sticker valid',
        'Telematics device functioning',
        'Duty status set correctly'
      ]
    }
  ]

  const currentCheckpoint = checkpoints[currentCheckpointIndex]

  const handlePrevious = () => {
    setCurrentCheckpointIndex((prev) => (prev === 0 ? checkpoints.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentCheckpointIndex((prev) => (prev === checkpoints.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white pt-4 pb-1 px-6">
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
      <main className="flex-grow px-6 pb-24 md:pb-8 -mt-4">
        <div className="max-w-7xl mx-auto -mt-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Floating 3D Model */}
            <div className="relative h-[800px] -mt-4">
              <Suspense
                fallback={
                  <div className="h-full flex items-center justify-center glass-card-strong rounded-xl">
                    <div className="text-center p-8">
                      <div className="text-7xl mb-4 animate-spin">🔄</div>
                      <div className="text-ash-navy text-2xl font-bold mb-2">Loading 3D Model</div>
                      <div className="text-gray-600 text-base">Please wait while the vehicle loads...</div>
                    </div>
                  </div>
                }
              >
                <Canvas camera={{ position: [30, 18, 30], fov: 35 }}>
                  <ambientLight intensity={1.2} />
                  <directionalLight position={[30, 30, 20]} intensity={2} />
                  <directionalLight position={[-30, 20, -20]} intensity={1.2} />
                  <directionalLight position={[0, -20, 0]} intensity={0.8} />
                  <spotLight position={[0, 50, 0]} intensity={1.5} angle={0.5} penumbra={1} />

                  <VehicleModel />
                  <CameraController targetPosition={currentCheckpoint.cameraPosition} />
                </Canvas>
              </Suspense>
            </div>

            {/* Right Column - Inspection Checkpoints Carousel */}
            <div className="flex flex-col h-[800px]">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-1 drop-shadow">
                  Inspection Checkpoints
                </h2>
                <p className="text-sm text-white/90 drop-shadow">
                  {currentCheckpointIndex + 1} of {checkpoints.length}
                </p>
              </div>

              {/* Carousel Card */}
              <div className="flex-1 flex flex-col">
                <div className="glass-card-strong rounded-2xl shadow-2xl p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 text-ash-teal flex-shrink-0">
                      {currentCheckpoint.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-ash-navy">
                      {currentCheckpoint.title}
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="bg-white/50 rounded-xl p-4">
                      <h4 className="font-semibold text-ash-navy mb-3">What to check:</h4>
                      <ul className="space-y-2">
                        {currentCheckpoint.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-ash-teal mt-0.5 flex-shrink-0 text-lg">✓</span>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={handlePrevious}
                      className="px-4 py-2 bg-ash-navy text-white rounded-xl hover:bg-ash-teal transition-colors flex items-center gap-2"
                      aria-label="Previous checkpoint"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-4 py-2 bg-ash-navy text-white rounded-xl hover:bg-ash-teal transition-colors flex items-center gap-2"
                      aria-label="Next checkpoint"
                    >
                      Next
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {checkpoints.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCheckpointIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentCheckpointIndex
                          ? 'bg-ash-teal w-8'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to checkpoint ${index + 1}`}
                    />
                  ))}
                </div>
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
