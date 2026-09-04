import { useState } from 'react'

function UserProfile({ onBack }) {
  const [activeSubTab, setActiveSubTab] = useState('journeys') // 'journeys' or 'communities'
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Modals for Close & Complete
  const [selectedJourney, setSelectedJourney] = useState(null)
  const [showCloseModal, setShowCloseModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showCreateCommunityModal, setShowCreateCommunityModal] = useState(false)

  // State for Close Journey Form
  const [closeReason, setCloseReason] = useState('')
  const [suggestedCreators, setSuggestedCreators] = useState([])

  // State for Complete Journey Form
  const [proofFile, setProofFile] = useState(null)
  const [proofNote, setProofNote] = useState('')

  // Communities State
  const [myCommunities, setMyCommunities] = useState([
    { id: 'c1', name: 'SaaS Builders Club', members: 1240, category: 'Business', joined: true },
    { id: 'c2', name: 'Acoustic Guitar Beginners', members: 850, category: 'Music', joined: true }
  ])
  const [newCommName, setNewCommName] = useState('')
  const [newCommCategory, setNewCommCategory] = useState('Business')

  // Top Creators Mock Database by Category
  const creatorDatabase = {
    Business: [
      { name: 'Arpit Bhayani', handle: '@arpit_builds', bio: 'Built 3 micro-SaaS products to $5k MRR' },
      { name: 'Tanay Pratap', handle: '@tanaypratap', bio: 'Guiding indie hackers and developers' }
    ],
    Music: [
      { name: 'Rick Beato', handle: '@rickbeato', bio: 'Music theory & guitar guidance' },
      { name: 'Acoustic Life', handle: '@acoustic_guru', bio: 'Daily fingerpicking tips & routines' }
    ],
    Fitness: [
      { name: 'Ranveer Allahbadia', handle: '@beerbiceps', bio: 'Fitness routines & motivation' },
      { name: 'Jeet Selal', handle: '@jeet_selal', bio: 'Natural bodybuilding & marathon guidance' }
    ],
    Learning: [
      { name: 'Love Babbar', handle: '@lovebabbar', bio: 'DSA & software development roadmaps' }
    ]
  }

  const [userJourneys, setUserJourneys] = useState([
    {
      id: 'j1',
      title: 'Build My First SaaS',
      category: 'Business',
      progress: 62,
      currentStage: 'Integrating Stripe Payment Gateway & Webhooks',
      updatesCount: 18,
      followersCount: 142,
      status: 'Active'
    },
    {
      id: 'j2',
      title: 'Learn Acoustic Guitar',
      category: 'Music',
      progress: 31,
      currentStage: 'Mastering F-Major Barre Chord & Fingerpicking Patterns',
      updatesCount: 8,
      followersCount: 67,
      status: 'Active'
    },
    {
      id: 'j3',
      title: 'Run My First Marathon',
      category: 'Fitness',
      progress: 48,
      currentStage: 'Completed 15 KM Weekend Long Run',
      updatesCount: 24,
      followersCount: 310,
      status: 'Active'
    }
  ])

  // Form State for New Journey
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Learning')

  // Trigger Close Modal & Top Creator Suggestions
  const openCloseModal = (journey) => {
    setSelectedJourney(journey)
    setSuggestedCreators(creatorDatabase[journey.category] || creatorDatabase['Learning'])
    setShowCloseModal(true)
  }

  // Trigger Complete Modal
  const openCompleteModal = (journey) => {
    setSelectedJourney(journey)
    setShowCompleteModal(true)
  }

  // Execute Journey Close
  const confirmCloseJourney = () => {
    setUserJourneys(userJourneys.map(j => 
      j.id === selectedJourney.id ? { ...j, status: 'Closed (Paused)', progress: j.progress } : j
    ))
    setShowCloseModal(false)
    setCloseReason('')
    setSelectedJourney(null)
  }

  // Execute Journey Completion with Proof Verification
  const confirmCompleteJourney = (e) => {
    e.preventDefault()
    if (!proofFile && !proofNote) {
      alert('Please attach proof (screenshot/video/certificate link) to mark as completed!')
      return
    }

    setUserJourneys(userJourneys.map(j => 
      j.id === selectedJourney.id ? { ...j, status: 'Completed 🏆', progress: 100, proof: proofNote } : j
    ))
    setShowCompleteModal(false)
    setProofFile(null)
    setProofNote('')
    setSelectedJourney(null)
  }

  // Add Journey
  const handleAddJourney = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newJourneyObj = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      progress: 0,
      currentStage: 'Day 1: Milestone setup',
      updatesCount: 1,
      followersCount: 0,
      status: 'Active'
    }

    setUserJourneys([newJourneyObj, ...userJourneys])
    setNewTitle('')
    setShowAddModal(false)
  }

  // Create Community
  const handleCreateCommunity = (e) => {
    e.preventDefault()
    if (!newCommName.trim()) return

    setMyCommunities([
      ...myCommunities,
      { id: Date.now().toString(), name: newCommName, members: 1, category: newCommCategory, joined: true }
    ])
    setNewCommName('')
    setShowCreateCommunityModal(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Profile Header Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" 
            alt="User" 
            style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f3f4f6' }}
          />
          <div>
            <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>Rahul Verma</h3>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>@rahul_verma</span>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px', fontSize: '12px', color: '#4b5563' }}>
              <span>👥 <strong>480</strong> Followers</span>
              <span>🚀 <strong>{userJourneys.length}</strong> Journeys</span>
            </div>
          </div>
        </div>

        {/* Rewards & Action Bar */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: '#6b7280', display: 'block' }}>Rewards / Badges 🏆</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#d97706' }}>🔥 14-Day Consistent Builder</span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            + Add Journey
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Journeys vs Communities */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={() => setActiveSubTab('journeys')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeSubTab === 'journeys' ? '#1f2937' : '#ffffff',
            color: activeSubTab === 'journeys' ? '#ffffff' : '#374151',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          🚀 My Journeys ({userJourneys.length})
        </button>
        <button
          onClick={() => setActiveSubTab('communities')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeSubTab === 'communities' ? '#1f2937' : '#ffffff',
            color: activeSubTab === 'communities' ? '#ffffff' : '#374151',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          🌐 Communities ({myCommunities.length})
        </button>
      </div>

      {/* 1. JOURNEYS TAB CONTENT */}
      {activeSubTab === 'journeys' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {userJourneys.map((journey) => (
            <div 
              key={journey.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '12px' }}>
                  {journey.category}
                </span>
                <span style={{ fontSize: '11px', color: journey.status.includes('Completed') ? '#10b981' : journey.status.includes('Closed') ? '#ef4444' : '#3b82f6', fontWeight: 'bold' }}>
                  ● {journey.status}
                </span>
              </div>

              <h4 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '16px' }}>{journey.title}</h4>

              {/* Progress Bar */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#6b7280' }}>Progress</span>
                  <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{journey.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${journey.progress}%`, height: '100%', backgroundColor: journey.status.includes('Completed') ? '#10b981' : '#2563eb' }} />
                </div>
              </div>

              <div style={{ backgroundColor: '#f9fafb', padding: '8px 10px', borderRadius: '6px', fontSize: '12px', color: '#4b5563', marginBottom: '12px' }}>
                <strong>Stage:</strong> {journey.currentStage}
              </div>

              {/* Separate Actions: Complete vs Close */}
              {journey.status === 'Active' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => openCloseModal(journey)}
                    style={{
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Pause / Close Journey
                  </button>
                  <button
                    onClick={() => openCompleteModal(journey)}
                    style={{
                      backgroundColor: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#059669',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    ✓ Complete Journey (Upload Proof)
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 2. COMMUNITIES TAB CONTENT */}
      {activeSubTab === 'communities' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, color: '#374151' }}>Joined Communities</h4>
            <button
              onClick={() => setShowCreateCommunityModal(true)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#111827',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              + Create Community
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {myCommunities.map((comm) => (
              <div 
                key={comm.id}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#111827' }}>{comm.name}</h4>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Category: {comm.category} • 👥 {comm.members} Members</span>
                </div>
                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>Joined ✓</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODAL 1: CLOSE JOURNEY & SUGGEST CREATORS --- */}
      {showCloseModal && selectedJourney && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '420px', maxHeight: '85vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, color: '#dc2626' }}>Pause / Close "{selectedJourney.title}"?</h3>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.4' }}>
              Why are you pausing this journey? Are you facing any difficulties or lack of guidance?
            </p>

            <select 
              value={closeReason} 
              onChange={(e) => setCloseReason(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', marginBottom: '15px', boxSizing: 'border-box' }}
            >
              <option value="">Select Reason...</option>
              <option value="stuck">Facing technical/learning difficulties</option>
              <option value="time">Lack of time / Priority shift</option>
              <option value="mentor">Need better guidance or mentorship</option>
              <option value="other">Other reasons</option>
            </select>

            {/* Top Creators Suggestions Banner */}
            <div style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #bfdbfe' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#1e40af', fontSize: '13px' }}>💡 Before you give up, check top creators in {selectedJourney.category}:</h5>
              {suggestedCreators.map((creator, i) => (
                <div key={i} style={{ fontSize: '12px', color: '#1e3a8a', marginBottom: '6px', paddingBottom: '4px', borderBottom: i < suggestedCreators.length - 1 ? '1px dashed #93c5fd' : 'none' }}>
                  <strong>{creator.name}</strong> ({creator.handle})<br/>
                  <span style={{ color: '#3b82f6' }}>{creator.bio}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowCloseModal(false)} style={{ padding: '8px 12px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                Keep Journey Active
              </button>
              <button onClick={confirmCloseJourney} style={{ padding: '8px 12px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                Confirm Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: COMPLETE JOURNEY & UPLOAD PROOF --- */}
      {showCompleteModal && selectedJourney && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '420px' }}>
            <h3 style={{ marginTop: 0, color: '#059669' }}>🎉 Complete "{selectedJourney.title}"!</h3>
            <p style={{ fontSize: '13px', color: '#4b5563' }}>
              To maintain authenticity on JOURNEY, please provide completion proof (Certificate, Screenshot, Video Link, or Progress Log).
            </p>

            <form onSubmit={confirmCompleteJourney}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#374151', marginBottom: '4px' }}>Upload Proof / Screenshot</label>
                <input 
                  type="file" 
                  onChange={(e) => setProofFile(e.target.files[0])}
                  style={{ width: '100%', fontSize: '12px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#374151', marginBottom: '4px' }}>Proof Note / Certificate Link / Experience Summary</label>
                <textarea 
                  rows="3"
                  placeholder="Share a link or short message about your completion achievement..."
                  value={proofNote}
                  onChange={(e) => setProofNote(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '12px' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowCompleteModal(false)} style={{ padding: '8px 12px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                  Submit Proof & Finish 🏆
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: CREATE COMMUNITY --- */}
      {showCreateCommunityModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ marginTop: 0, color: '#111827' }}>Create New Community 🌐</h3>
            <form onSubmit={handleCreateCommunity}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#374151', marginBottom: '4px' }}>Community Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. React Developers India, SSC 2026 Aspirants"
                  value={newCommName}
                  onChange={(e) => setNewCommName(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#374151', marginBottom: '4px' }}>Category</label>
                <select 
                  value={newCommCategory} 
                  onChange={(e) => setNewCommCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                >
                  <option value="Business">Business</option>
                  <option value="Learning">Learning</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Music">Music</option>
                  <option value="Languages">Languages</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowCreateCommunityModal(false)} style={{ padding: '8px 12px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                  Create Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 4: ADD JOURNEY --- */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ marginTop: 0, color: '#111827' }}>Start a New Journey 🚀</h3>
            <form onSubmit={handleAddJourney}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#374151', marginBottom: '4px' }}>Journey Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Learn Spanish, Start Freelancing"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#374151', marginBottom: '4px' }}>Category</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                >
                  <option value="Business">Business</option>
                  <option value="Learning">Learning</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Music">Music</option>
                  <option value="Languages">Languages</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 12px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                  Create Journey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default UserProfile