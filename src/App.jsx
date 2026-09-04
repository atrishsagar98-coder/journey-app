import { useState } from 'react'
import BottomNav from './components/Navbar'
import JourneyCard from './components/JourneyCard'
import UserProfile from './components/UserProfile'
import { initialJourneys } from './data/mockJourneys'
import MainFeed from './components/MainFeed'

function App() {
  const [activeTab, setActiveTab] = useState('feed')
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Demo Stories (Followed Persons)
  const stories = [
    { id: 1, name: 'Rahul', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', active: true },
    { id: 2, name: 'Priya', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', active: true },
    { id: 3, name: 'Alex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', active: false },
    { id: 4, name: 'Ananya', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya', active: true },
  ]

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', width: '320px' }}>
          <h2>JOURNEY 🚀</h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Follow journeys, not people.</p>
          <button 
            onClick={() => setIsLoggedIn(true)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'sans-serif', margin: 0, padding: 0, backgroundColor: '#f3f4f6', minHeight: '100vh', paddingBottom: '70px' }}>
      
      {/* Top Header Logo */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 20px',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: '#111827', fontWeight: '800', letterSpacing: '0.5px' }}>
          JOURNEY 🚀
        </h2>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '15px' }}>
        
        {/* 1. MAIN FEED */}
        {activeTab === 'feed' && (
          <div>
            {/* Followed Person Stories Bar */}
            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '12px', marginBottom: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', gap: '15px', overflowX: 'auto' }}>
              {stories.map(story => (
                <div key={story.id} style={{ textAlign: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{ padding: '2px', borderRadius: '50%', border: story.active ? '2px solid #2563eb' : '2px solid #d1d5db' }}>
                    <img src={story.avatar} alt={story.name} style={{ width: '44px', height: '44px', borderRadius: '50%', display: 'block' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: '#374151', marginTop: '4px', display: 'block' }}>{story.name}</span>
                </div>
              ))}
            </div>

            {/* Scrolling Feed */}
            {initialJourneys.map(journey => (
              <JourneyCard key={journey.id} journey={journey} />
            ))}
          </div>
        )}

        {/* 2. MSG (INBOX) */}
        {activeTab === 'msg' && (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, color: '#111827' }}>Inbox 💬</h3>
            <input type="text" placeholder="Search messages..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', marginBottom: '15px', boxSizing: 'border-box' }} />
            <div style={{ color: '#6b7280', textAlign: 'center', padding: '30px 0', fontSize: '14px' }}>
              No recent conversations yet. Start following journeys to connect!
            </div>
          </div>
        )}

        {/* 3. EXPLORE */}
        {activeTab === 'explore' && (
          <div>
            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '12px', marginBottom: '15px' }}>
              <input type="text" placeholder="Search journeys, interests, categories..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>

            <h4 style={{ color: '#374151', marginBottom: '12px', marginTop: 0 }}>Trending Interests 🔥</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
              {['SaaS Building', 'Guitar & Music', 'Marathon Prep', 'Spanish Language', 'SSC CGL', 'React Tech'].map((item, idx) => (
                <div key={idx} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #e5e7eb', fontWeight: 'bold', color: '#1f2937', cursor: 'pointer', fontSize: '13px' }}>
                  #{item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. MY ACTIVITY */}
        {activeTab === 'activity' && (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ marginTop: 0, color: '#111827' }}>My Activity & Daily Logs 📊</h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Track your active milestones, daily logs, and streak metrics here.</p>
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
              <strong>Today's Log:</strong> Worked on Flowchart UI, bottom footer navigation bar & modular tabs setup.
            </div>
          </div>
        )}

        {/* 5. PROFILE */}
        {activeTab === 'profile' && (
          <UserProfile onBack={() => setActiveTab('feed')} />
        )}

      </main>

      {/* Fixed Bottom Navigation Bar (Footer) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App