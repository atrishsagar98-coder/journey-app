import { useState } from 'react'

// ==========================================
// MOCK DATA & INITIAL STATE
// ==========================================
const initialJourneyData = {
  id: 'j1',
  title: 'Full-Stack Web Development',
  category: 'Tech & Coding',
  currentStreak: 5,
  bestStreak: 12,
  lastCompletedDate: '2026-09-06',
  currentStageIndex: 0,
  stages: [
    {
      id: 's1',
      title: 'Stage 1: Frontend Core & React Mastery',
      milestone: 'Build & Deploy Interactive Prototype',
      tasks: [
        { id: 't1', title: 'Complete React State & Hooks module', xp: 50, completed: false },
        { id: 't2', title: 'Build interactive About modal component', xp: 75, completed: true },
        { id: 't3', title: 'Push codebase to GitHub and deploy to Vercel', xp: 100, completed: true }
      ]
    },
    {
      id: 's2',
      title: 'Stage 2: Backend Architecture & APIs',
      milestone: 'Deploy RESTful API with Authentication',
      tasks: [
        { id: 't4', title: 'Setup Express server & PostgreSQL connection', xp: 80, completed: false },
        { id: 't5', title: 'Implement JWT Auth & Password Hashing', xp: 100, completed: false },
        { id: 't6', title: 'Write integration tests for API endpoints', xp: 60, completed: false }
      ]
    }
  ]
}

const communityPosts = [
  {
    id: 'p1',
    author: 'Aarav Sharma',
    time: '2h ago',
    tag: '#Music',
    title: 'Mastered F-Major Chord Progressions!',
    content: 'Day 12 of learning guitar. Finally clean sound without buzz.',
    likes: 42
  },
  {
    id: 'p2',
    author: 'Rohan Mehta',
    time: '4h ago',
    tag: '#Business',
    title: 'First 100 Users for my Micro-SaaS',
    content: 'Shared cold outreach templates that worked for us.',
    likes: 128
  }
]

// ==========================================
// INTERACTIVE JOURNEY VIEW COMPONENT
// ==========================================
function InteractiveJourneyView({ journey, onToggleTask }) {
  const currentStage = journey.stages[journey.currentStageIndex]

  // Dynamic Progress Calculation
  const totalTasks = journey.stages.reduce((acc, stage) => acc + stage.tasks.length, 0)
  const completedTasks = journey.stages.reduce(
    (acc, stage) => acc + stage.tasks.filter((t) => t.completed).length,
    0
  )
  const overallProgress = Math.round((completedTasks / totalTasks) * 100)

  const stageCompleted = currentStage.tasks.filter((t) => t.completed).length
  const stageProgress = Math.round((stageCompleted / currentStage.tasks.length) * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Streak Header Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '24px',
            backgroundColor: '#fff7ed',
            padding: '8px',
            borderRadius: '12px',
            border: '1px solid #ffedd5'
          }}>
            🔥
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
              {journey.currentStreak} Day Streak
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              Best: {journey.bestStreak} days • Keep momentum going!
            </div>
          </div>
        </div>

        <span style={{
          fontSize: '11px',
          fontWeight: '700',
          color: '#16a34a',
          backgroundColor: '#dcfce7',
          padding: '4px 10px',
          borderRadius: '12px'
        }}>
          Active
        </span>
      </div>

      {/* Overall Progress Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {journey.category}
          </span>
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>
            {overallProgress}% Complete
          </span>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', color: '#111827' }}>
          {journey.title}
        </h2>

        {/* Dynamic Progress Bar */}
        <div style={{
          height: '10px',
          backgroundColor: '#f3f4f6',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          <div style={{
            height: '100%',
            width: `${overallProgress}%`,
            backgroundColor: '#2563eb',
            borderRadius: '10px',
            transition: 'width 0.4s ease'
          }} />
        </div>

        <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', justifyContent: 'space-between' }}>
          <span>{completedTasks} of {totalTasks} Tasks Verified</span>
          <span>{journey.stages.length} Stages Total</span>
        </div>
      </div>

      {/* Stage Tasks List */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#111827' }}>
              {currentStage.title}
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
              🎯 Milestone: {currentStage.milestone}
            </p>
          </div>
          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            color: stageProgress === 100 ? '#16a34a' : '#2563eb',
            backgroundColor: stageProgress === 100 ? '#dcfce7' : '#eff6ff',
            padding: '4px 10px',
            borderRadius: '20px'
          }}>
            {stageProgress}%
          </span>
        </div>

        {/* Interactive Check-in Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentStage.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(currentStage.id, task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: task.completed ? '#bbf7d0' : '#e5e7eb',
                backgroundColor: task.completed ? '#f0fdf4' : '#fafafa',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  border: task.completed ? 'none' : '2px solid #d1d5db',
                  backgroundColor: task.completed ? '#16a34a' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {task.completed && '✓'}
                </div>

                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: task.completed ? '#15803d' : '#374151',
                  textDecoration: task.completed ? 'line-through' : 'none'
                }}>
                  {task.title}
                </span>
              </div>

              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: task.completed ? '#16a34a' : '#6b7280',
                backgroundColor: task.completed ? '#dcfce7' : '#f3f4f6',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                +{task.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

// ==========================================
// MAIN COMMUNITY FEED COMPONENT
// ==========================================
function CommunityFeed() {
  const [posts, setPosts] = useState(communityPosts)

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3 style={{ margin: '8px 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#111827' }}>
        🌐 Community Activity
      </h3>
      {posts.map((post) => (
        <div key={post.id} style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>{post.author}</span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{post.time} • <strong style={{ color: '#2563eb' }}>{post.tag}</strong></span>
          </div>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#1f2937' }}>{post.title}</h4>
          <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>{post.content}</p>
          <button
            onClick={() => handleLike(post.id)}
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ❤️ {post.likes} Likes
          </button>
        </div>
      ))}
    </div>
  )
}

// ==========================================
// USER PROFILE VIEW COMPONENT
// ==========================================
function UserProfileView() {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 12px auto'
      }}>
        S
      </div>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800' }}>Sagar Sharma</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#6b7280' }}>Full-Stack Developer • 2 Active Journeys</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
        <div>
          <div style={{ fontWeight: '800', fontSize: '16px', color: '#111827' }}>225 XP</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Total Earned</div>
        </div>
        <div>
          <div style={{ fontWeight: '800', fontSize: '16px', color: '#111827' }}>5 Days</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Current Streak</div>
        </div>
        <div>
          <div style={{ fontWeight: '800', fontSize: '16px', color: '#111827' }}>100%</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Trust Score</div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// ABOUT MODAL COMPONENT
// ==========================================
function AboutModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('vision')

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 4000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '540px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb'
      }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fafafa'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>
              🚀 About JOURNEY
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
              Goal-to-Journey Platform • Vision & System Overview
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              fontSize: '16px',
              cursor: 'pointer',
              color: '#4b5563',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          padding: '0 16px'
        }}>
          {[
            { id: 'vision', label: '💡 Concept' },
            { id: 'flow', label: '⚙️ How it Works' },
            { id: 'community', label: '🌐 Community' },
            { id: 'features', label: '⚡ Core Pillars' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 8px',
                border: 'none',
                background: 'none',
                borderBottom: activeTab === tab.id ? '2.5px solid #2563eb' : '2.5px solid transparent',
                color: activeTab === tab.id ? '#2563eb' : '#6b7280',
                fontWeight: activeTab === tab.id ? '700' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div style={{
          padding: '20px 24px',
          overflowY: 'auto',
          flex: 1,
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#374151'
        }}>

          {activeTab === 'vision' && (
            <div>
              <div style={{
                backgroundColor: '#eff6ff',
                borderLeft: '4px solid #2563eb',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <strong style={{ color: '#1e40af', display: 'block', marginBottom: '4px' }}>The Core Principle</strong>
                <em>"Don't just tell people what they should achieve. Help them understand how to get there."</em>
              </div>

              <p style={{ marginTop: 0 }}>
                <strong>JOURNEY</strong> converts passive goals into dynamic, guided, and interactive paths. Unlike static habit trackers, JOURNEY functions as an <strong>adaptive navigation system for personal growth</strong>.
              </p>

              <div style={{ display: 'grid', gap: '10px', marginTop: '16px' }}>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                  <strong style={{ color: '#111827' }}>🎯 Problem We Solve:</strong> People have high ambitions but lack clear, adaptable steps and accountability.
                </div>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                  <strong style={{ color: '#111827' }}>🛣️ The Solution:</strong> Breaking down big goals into actionable stages, milestones, proof-based verification, and community feedback loops.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flow' && (
            <div>
              <h4 style={{ margin: '0 0 12px 0', color: '#111827' }}>The Lifecycle of a Journey:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { step: '1', title: 'Define Goal', desc: 'Tell JOURNEY your target & starting point.' },
                  { step: '2', title: 'Structure Path', desc: 'Auto-break goal into stages, tasks, & milestones.' },
                  { step: '3', title: 'Take Action & Verify', desc: 'Complete daily tasks with proof-based check-ins.' },
                  { step: '4', title: 'Adaptability Engine', desc: 'System adjusts path if you speed up, struggle, or pause.' },
                  { step: '5', title: 'Milestones & Completion', desc: 'Earn trust score, unlock higher stages, or restart.' }
                ].map((item) => (
                  <div key={item.step} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      flexShrink: 0
                    }}>
                      {item.step}
                    </div>
                    <div>
                      <strong style={{ color: '#111827', fontSize: '13px' }}>{item.title}</strong>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div>
              <p style={{ marginTop: 0 }}>
                You don't have to walk your path alone. JOURNEY links community directly to your current stage:
              </p>
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontFamily: 'monospace',
                fontSize: '12px',
                lineHeight: '1.8',
                color: '#0f172a',
                marginBottom: '16px'
              }}>
                Goal: Learn Python<br/>
                ↳ Journey: Python Beginner to Advanced<br/>
                ↳ Community: Peer Group on Same Path<br/>
                ↳ Action: Shared Progress + Proofs + Challenges
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', color: '#4b5563' }}>
                <li style={{ marginBottom: '6px' }}><strong>Shared Journeys:</strong> Follow public roadmaps crafted by experts.</li>
                <li style={{ marginBottom: '6px' }}><strong>Collective Accountability:</strong> Discuss obstacles with peers at your exact milestone.</li>
                <li><strong>No Spam Socializing:</strong> Interactions stay focused on execution & progress.</li>
              </ul>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <strong style={{ color: '#2563eb' }}>🔄 Recoverable Journeys:</strong> Life happens. Interruption isn't treated as failure; the system offers smart restart points.
                </div>
                <div style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <strong style={{ color: '#2563eb' }}>🎯 Trust & Visibility Score:</strong> Algorithm promotes genuine completions and filters out spam roadmaps.
                </div>
                <div style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <strong style={{ color: '#2563eb' }}>🔀 Component Flexibility:</strong> Multiple activity options to achieve the same milestone based on user preference.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid #f3f4f6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fafafa'
        }}>
          <span style={{ fontSize: '11px', color: '#9ca3af' }}>JOURNEY Engine v1.0 • Prototype</span>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              backgroundColor: '#111827',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  )
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  const [activeTab, setActiveTab] = useState('feed')
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [journeyData, setJourneyData] = useState(initialJourneyData)

  // Toggle Task & Update Streak System
  const handleToggleTask = (stageId, taskId) => {
    setJourneyData((prev) => {
      const updatedStages = prev.stages.map((stage) => {
        if (stage.id !== stageId) return stage
        return {
          ...stage,
          tasks: stage.tasks.map((task) => {
            if (task.id !== taskId) return task
            return { ...task, completed: !task.completed }
          })
        }
      })

      const today = new Date().toISOString().split('T')[0]
      let newStreak = prev.currentStreak
      let newLastCompleted = prev.lastCompletedDate

      const wasAnyTaskCompletedToday = updatedStages.some((s) => s.tasks.some((t) => t.completed))
      if (wasAnyTaskCompletedToday && prev.lastCompletedDate !== today) {
        newStreak = prev.currentStreak + 1
        newLastCompleted = today
      }

      return {
        ...prev,
        currentStreak: newStreak,
        bestStreak: Math.max(newStreak, prev.bestStreak),
        lastCompletedDate: newLastCompleted,
        stages: updatedStages
      }
    })
  }

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

      {/* Top App Header */}
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

        {/* About Modal Trigger Button */}
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

      {/* Dynamic Main Body Content */}
      <main style={{ flex: 1, padding: '16px' }}>
        {activeTab === 'feed' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <InteractiveJourneyView journey={journeyData} onToggleTask={handleToggleTask} />
            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '4px 0' }} />
            <CommunityFeed />
          </div>
        )}

        {activeTab === 'profile' && <UserProfileView />}

        {(activeTab === 'msg' || activeTab === 'explore' || activeTab === 'activity') && (
          <div style={{
            padding: '32px 16px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb'
          }}>
            <span style={{ fontSize: '32px' }}>🚧</span>
            <h3 style={{ margin: '12px 0 4px 0', fontSize: '16px', fontWeight: '800' }}>Module Under Development</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
              The {activeTab.toUpperCase()} tab backend connectivity is coming in the next prototype update.
            </p>
          </div>
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 0',
        zIndex: 100
      }}>
        {[
          { id: 'feed', label: 'Feed', icon: '🏠' },
          { id: 'msg', label: 'MSG', icon: '💬' },
          { id: 'explore', label: 'Explore', icon: '🔍' },
          { id: 'activity', label: 'Activity', icon: '📊' },
          { id: 'profile', label: 'Profile', icon: '👤' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              color: activeTab === item.id ? '#2563eb' : '#6b7280',
              fontWeight: activeTab === item.id ? '700' : '500',
              fontSize: '11px'
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* About App Modal Overlay */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

    </div>
  )
}

export default App
