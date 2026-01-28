import { useState, useEffect } from 'react'
import SearchOverlay from './SearchOverlay'
import { FaMoon } from 'react-icons/fa'
import { MdSunny } from 'react-icons/md'
import { FiSunset } from 'react-icons/fi'

const BedReportingTracker = ({ onBack }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const cycles = [
    {
      name: 'Overnight',
      icon: <FaMoon className="w-full h-full" />,
      iconColor: 'text-yellow-400',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      reporting: { start: 0, end: 1.5, label: '12:00 AM - 1:30 AM' },
      followup: { start: 1.5, end: 2.25, label: '1:30 AM - 2:15 AM' },
      update: { time: 2.5, label: '~2:30 AM' }
    },
    {
      name: 'Morning',
      icon: <MdSunny className="w-full h-full" />,
      iconColor: 'text-orange-500',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      reporting: { start: 8, end: 9.5, label: '8:00 AM - 9:30 AM' },
      followup: { start: 9.5, end: 10.25, label: '9:30 AM - 10:15 AM' },
      update: { time: 10.5, label: '~10:30 AM' }
    },
    {
      name: 'Evening',
      icon: <FiSunset className="w-full h-full" />,
      iconColor: 'text-orange-500',
      gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%)',
      reporting: { start: 16, end: 17.5, label: '4:00 PM - 5:30 PM' },
      followup: { start: 17.5, end: 18.25, label: '5:30 PM - 6:15 PM' },
      update: { time: 18.5, label: '~6:30 PM' }
    }
  ]

  const getCurrentHour = () => {
    return currentTime.getHours() + currentTime.getMinutes() / 60
  }

  const getCycleStatus = (cycle) => {
    const hour = getCurrentHour()

    if (hour >= cycle.reporting.start && hour < cycle.reporting.end) {
      const totalMinutes = (cycle.reporting.end - cycle.reporting.start) * 60
      const elapsedMinutes = (hour - cycle.reporting.start) * 60
      const remainingMinutes = Math.ceil(totalMinutes - elapsedMinutes)
      return {
        phase: 'reporting',
        status: 'active',
        remaining: remainingMinutes,
        reportingComplete: false,
        followupComplete: false
      }
    }

    if (hour >= cycle.followup.start && hour < cycle.followup.end) {
      const totalMinutes = (cycle.followup.end - cycle.followup.start) * 60
      const elapsedMinutes = (hour - cycle.followup.start) * 60
      const remainingMinutes = Math.ceil(totalMinutes - elapsedMinutes)
      return {
        phase: 'followup',
        status: 'active',
        remaining: remainingMinutes,
        reportingComplete: true,
        followupComplete: false
      }
    }

    if (hour >= cycle.update.time && hour < cycle.update.time + 0.5) {
      return {
        phase: 'updating',
        status: 'active',
        remaining: 0,
        reportingComplete: true,
        followupComplete: true
      }
    }

    if (hour > cycle.update.time + 0.5) {
      return {
        phase: 'complete',
        status: 'complete',
        remaining: 0,
        reportingComplete: true,
        followupComplete: true
      }
    }

    return {
      phase: 'waiting',
      status: 'waiting',
      remaining: 0,
      reportingComplete: false,
      followupComplete: false
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white pt-8 pb-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-impact drop-shadow-lg tracking-wide uppercase">
            Bed Reporting Tracker
          </h1>
        </div>
      </header>

      <main className="flex-grow py-8 px-6 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Current Time Display */}
          <div className="text-center mb-8">
            <div className="text-sm text-white/80 mb-2 drop-shadow">Current Time</div>
            <div className="text-4xl font-bold text-white drop-shadow-lg">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>

          {/* Phase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {cycles.map((cycle, i) => {
              const status = getCycleStatus(cycle)
              const isActive = status.status === 'active'

              return (
                <div
                  key={i}
                  className={`glass-card-strong rounded-2xl p-6 shadow-lg border-4 transition-all duration-300 ${
                    isActive
                      ? 'border-ash-teal shadow-2xl scale-105'
                      : 'border-transparent'
                  }`}
                  style={{
                    animation: isActive ? 'pulse 2s ease-in-out infinite' : 'none'
                  }}
                >
                  {/* Icon and Title Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`text-7xl w-20 h-20 flex items-center justify-center ${cycle.iconColor || 'text-ash-teal'}`}>
                        {cycle.icon}
                      </div>
                      <h3 className="text-3xl font-bold text-ash-navy">
                        {cycle.name}
                      </h3>
                    </div>
                    {isActive && (
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        LIVE
                      </div>
                    )}
                  </div>

                  {/* Reporting Period */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-gray-700">Bed Reporting Period</div>
                      {status.reportingComplete && (
                        <span className="text-green-500 text-xl">✓</span>
                      )}
                    </div>
                    <div className={`text-sm text-gray-600 p-2 rounded-lg ${
                      status.phase === 'reporting'
                        ? 'bg-red-50 border-2 border-red-200'
                        : 'bg-gray-50'
                    }`}>
                      {cycle.reporting.label}
                    </div>
                    {status.phase === 'reporting' && (
                      <div className="mt-2 text-red-600 text-sm font-bold text-center">
                        {status.remaining} minutes remaining
                      </div>
                    )}
                  </div>

                  {/* Follow-up Period */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-gray-700">STAR Follow-Up w/ Non-Reporting</div>
                      {status.followupComplete && (
                        <span className="text-green-500 text-xl">✓</span>
                      )}
                    </div>
                    <div className={`text-sm text-gray-600 p-2 rounded-lg ${
                      status.phase === 'followup'
                        ? 'bg-yellow-50 border-2 border-yellow-200'
                        : 'bg-gray-50'
                    }`}>
                      {cycle.followup.label}
                    </div>
                    {status.phase === 'followup' && (
                      <div className="mt-2 text-yellow-600 text-sm font-bold text-center">
                        {status.remaining} minutes remaining
                      </div>
                    )}
                  </div>

                  {/* Portal Update */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-gray-700">Data Portal Update</div>
                      {status.phase === 'complete' && (
                        <span className="text-green-500 text-xl">✓</span>
                      )}
                    </div>
                    <div className={`text-sm text-gray-600 p-2 rounded-lg ${
                      status.phase === 'updating'
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50'
                    }`}>
                      {cycle.update.label}
                    </div>
                    {status.phase === 'updating' && (
                      <div className="mt-2 text-green-600 text-sm font-bold text-center">
                        Updating now...
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  {status.phase === 'complete' && (
                    <div className="mt-4 bg-green-100 text-green-800 p-2 rounded-lg text-center font-bold text-sm">
                      ✓ Cycle Complete
                    </div>
                  )}

                  {status.phase === 'waiting' && (
                    <div className="mt-4 bg-gray-100 text-gray-600 p-2 rounded-lg text-center font-bold text-sm">
                      Awaiting Start Time
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quick Summary */}
          <div className="glass-card-strong rounded-xl shadow-lg p-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-4">Today's Progress</div>
              <div className="flex justify-center gap-8 flex-wrap">
                {cycles.map((cycle, i) => {
                  const status = getCycleStatus(cycle)
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`text-4xl w-12 h-12 flex items-center justify-center ${cycle.iconColor || 'text-ash-teal'}`}>{cycle.icon}</span>
                      <span className="font-bold text-ash-navy text-lg">{cycle.name}:</span>
                      <span className={`font-semibold ${
                        status.phase === 'complete' ? 'text-green-600' :
                        status.status === 'active' ? 'text-red-600' :
                        'text-gray-400'
                      }`}>
                        {status.phase === 'complete' ? '✓ Complete' :
                         status.status === 'active' ? '🔴 Active' :
                         'Pending'}
                      </span>
                    </div>
                  )
                })}
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
      <SearchOverlay currentPage="bedreporting" />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  )
}

export default BedReportingTracker
