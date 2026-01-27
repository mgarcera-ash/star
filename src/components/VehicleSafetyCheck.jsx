import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import SearchOverlay from './SearchOverlay'
import * as THREE from 'three'

// 3D Vehicle Model Component
function VehicleModel() {
  try {
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}assets/models/vehicle.glb`)
    return <primitive object={scene} scale={60} position={[0, -8, 0]} />
  } catch (error) {
    console.error('Error loading 3D model:', error)
    return null
  }
}

// Animated Camera Controller
function CameraController({ targetPosition, targetLookAt }) {
  const controlsRef = useRef()

  useFrame(() => {
    if (controlsRef.current && targetPosition && targetLookAt) {
      // Smoothly move camera
      controlsRef.current.object.position.lerp(
        new THREE.Vector3(...targetPosition),
        0.05
      )

      // Smoothly move target
      const currentTarget = controlsRef.current.target
      currentTarget.lerp(new THREE.Vector3(...targetLookAt), 0.05)
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      minDistance={20}
      maxDistance={80}
      maxPolarAngle={Math.PI / 2}
    />
  )
}

// Main Component
const VehicleSafetyCheck = ({ onBack }) => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null)
  const [cameraTarget, setCameraTarget] = useState({
    position: [35, 20, 35],
    lookAt: [0, 0, 0]
  })

  // Inspection checkpoints with camera positions
  const checkpoints = [
    {
      id: 'tires',
      title: 'Tires & Wheels',
      icon: '🛞',
      camera: { position: [-25, 8, 30], lookAt: [-10, -5, 10] },
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
      camera: { position: [0, 10, 40], lookAt: [0, 0, 15] },
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
      camera: { position: [0, 10, -40], lookAt: [0, 0, -15] },
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
      camera: { position: [-35, 15, 20], lookAt: [-12, 5, 0] },
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
      camera: { position: [40, 12, 0], lookAt: [8, 0, 0] },
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
      camera: { position: [0, 18, 35], lookAt: [0, 2, 12] },
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
      camera: { position: [25, 15, 25], lookAt: [3, 0, 0] },
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
      camera: { position: [0, 10, -35], lookAt: [0, 0, -10] },
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
      camera: { position: [20, 15, 25], lookAt: [0, 0, 0] },
      items: [
        'Insurance card present and current',
        'Registration present and current',
        'Vehicle inspection sticker valid',
        'Telematics device functioning',
        'Duty status set correctly'
      ]
    }
  ]

  const handleCheckpointClick = (checkpoint) => {
    setSelectedCheckpoint(checkpoint)
    setCameraTarget({
      position: checkpoint.camera.position,
      lookAt: checkpoint.camera.lookAt
    })
  }

  const handleReset = () => {
    setSelectedCheckpoint(null)
    setCameraTarget({
      position: [35, 20, 35],
      lookAt: [0, 0, 0]
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
            Vehicle Safety Check
          </h1>
          <p className="text-white/90 text-lg mt-2 drop-shadow">
            Interactive 3D inspection guide
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6 px-6 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D Viewer */}
            <div className="lg:col-span-2">
              <div className="glass-card-strong rounded-2xl shadow-2xl p-6">
                <div className="relative h-[600px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden">
                  <Suspense
                    fallback={
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🔄</div>
                          <div className="text-gray-700 text-xl font-semibold">Loading 3D model...</div>
                          <div className="text-gray-600 text-sm mt-2">This may take a moment</div>
                        </div>
                      </div>
                    }
                  >
                    <Canvas camera={{ position: [35, 20, 35], fov: 60 }}>
                      <ambientLight intensity={0.8} />
                      <directionalLight position={[10, 10, 5]} intensity={1.2} />
                      <directionalLight position={[-10, 5, -5]} intensity={0.6} />
                      <directionalLight position={[0, -5, 0]} intensity={0.4} />

                      <VehicleModel />

                      <CameraController
                        targetPosition={cameraTarget.position}
                        targetLookAt={cameraTarget.lookAt}
                      />
                    </Canvas>
                  </Suspense>

                  {/* Controls Info */}
                  <div className="absolute top-4 left-4 glass-card-strong rounded-xl p-3 shadow-lg">
                    <div className="text-xs font-semibold text-ash-navy mb-1">Controls:</div>
                    <div className="text-xs text-gray-700">
                      🖱️ Drag to rotate • Scroll to zoom
                    </div>
                  </div>

                  {/* Reset Button */}
                  {selectedCheckpoint && (
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={handleReset}
                        className="glass-card-strong px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-ash-navy text-sm"
                      >
                        Reset View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Checkpoints Panel */}
            <div className="lg:col-span-1">
              <div className="glass-card-strong rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold text-ash-navy mb-4">Inspection Points</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Click a checkpoint to view that area of the vehicle and see what to inspect.
                </p>

                <div className="space-y-2 max-h-[520px] overflow-y-auto">
                  {checkpoints.map((checkpoint) => (
                    <button
                      key={checkpoint.id}
                      onClick={() => handleCheckpointClick(checkpoint)}
                      className={`w-full p-4 rounded-xl text-left transition-all shadow-md hover:shadow-lg ${
                        selectedCheckpoint?.id === checkpoint.id
                          ? 'bg-ash-teal text-white'
                          : 'bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{checkpoint.icon}</span>
                        <span className={`font-semibold ${
                          selectedCheckpoint?.id === checkpoint.id ? 'text-white' : 'text-ash-navy'
                        }`}>
                          {checkpoint.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Checkpoint Details */}
          {selectedCheckpoint && (
            <div className="mt-6 glass-card-strong rounded-2xl shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{selectedCheckpoint.icon}</span>
                <div>
                  <h3 className="text-3xl font-bold text-ash-navy">{selectedCheckpoint.title}</h3>
                  <p className="text-gray-600">Inspection checklist</p>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6">
                <h4 className="font-semibold text-ash-navy mb-3">What to check:</h4>
                <ul className="space-y-2">
                  {selectedCheckpoint.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-ash-teal mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
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
