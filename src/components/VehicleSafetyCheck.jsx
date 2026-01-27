import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import SearchOverlay from './SearchOverlay'

// 3D Vehicle Model Component
function VehicleModel() {
  try {
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}assets/models/vehicle.glb`)
    return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
  } catch (error) {
    console.error('Error loading 3D model:', error)
    return null
  }
}

// Main Component
const VehicleSafetyCheck = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
            Vehicle Safety Check
          </h1>
          <p className="text-white/90 text-lg mt-2 drop-shadow">
            3D model of Chevrolet Express / GMC Savana 2500 Cargo Van
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card-strong rounded-2xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-ash-navy mb-4">Interactive 3D Model</h2>
            <p className="text-gray-700 mb-6">
              Explore the vehicle from all angles. Use your mouse to rotate, zoom, and pan around the model.
            </p>

            {/* 3D Viewer */}
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
                <Canvas
                  camera={{ position: [5, 2, 5], fov: 50 }}
                >
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <directionalLight position={[-10, -10, -5]} intensity={0.5} />

                  <VehicleModel />

                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    minDistance={3}
                    maxDistance={15}
                    maxPolarAngle={Math.PI / 2}
                  />
                </Canvas>
              </Suspense>

              {/* Controls Info */}
              <div className="absolute bottom-4 left-4 glass-card-strong rounded-xl p-4 shadow-lg">
                <div className="text-xs font-semibold text-ash-navy mb-2">Controls:</div>
                <div className="text-xs text-gray-700 space-y-1">
                  <div>🖱️ <strong>Left Click + Drag:</strong> Rotate</div>
                  <div>🖱️ <strong>Right Click + Drag:</strong> Pan</div>
                  <div>🖱️ <strong>Scroll:</strong> Zoom in/out</div>
                  <div>📱 <strong>Touch:</strong> Pinch to zoom</div>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="glass-card-strong rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-ash-navy mb-4">Vehicle Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-ash-teal mb-2">Make & Model</h4>
                <p className="text-gray-700">Chevrolet Express / GMC Savana 2500</p>
              </div>

              <div>
                <h4 className="font-semibold text-ash-teal mb-2">Type</h4>
                <p className="text-gray-700">Cargo Van</p>
              </div>

              <div>
                <h4 className="font-semibold text-ash-teal mb-2">Year</h4>
                <p className="text-gray-700">2003 Model</p>
              </div>

              <div>
                <h4 className="font-semibold text-ash-teal mb-2">Usage</h4>
                <p className="text-gray-700">STAR Program Transport</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-ash-teal mb-3">About This Model</h4>
              <p className="text-gray-700 leading-relaxed">
                This 3D model represents the actual vehicle used by the A Safe Haven STAR Program
                for client transportation and service delivery. The model can be rotated and viewed
                from all angles to familiarize staff with the vehicle's appearance and dimensions.
              </p>
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
