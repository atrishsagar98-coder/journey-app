import { useState } from 'react'
import BottomNav from './components/Navbar'
import JourneyCard from './components/JourneyCard'
import UserProfile from './components/UserProfile'
import { initialJourneys } from './data/mockJourneys'
import MainFeed from './components/MainFeed'
import AboutModal from './components/AboutModal'

function App() {
  const [activeTab, setActiveTab] = useState('feed')
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      paddingBottom: '70px',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>

      {/* Top Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#ffffff',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '900',
            color: '#111827',
            margin: 0,
            letterSpacing: '-0.5px'
          }}>
            JOURNEY
          </h1>
          <span style={{
            fontSize: '10px',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            padding: '2px 6px',
            borderRadius: '10px',
            fontWeight: 'bold'
          }}>
            BETA
          </span>
        </div>

        {/* About App Button */}
        <button
          onClick={() => setIsAboutOpen(true)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            border: '1px solid #bfdbfe',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s'
          }}
        >
          <span>ℹ️</span> About App
        </button>
      </header>

      {/* Main Content View based on Tab */}
      <main style={{ flex: 1, padding: '16px' }}>
        {activeTab === 'feed' && <MainFeed />}
        {activeTab === 'profile' && <UserProfile />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* About App Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

    </div>
  )
}

export default App
