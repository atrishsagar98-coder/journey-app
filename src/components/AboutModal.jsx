import { useState } from 'react'

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

          {/* TAB 1: VISION */}
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
                <strong>JOURNEY</strong> converts passive goals into dynamic, guided, and interactive paths. Unlike static habit trackers or course catalogs, JOURNEY functions as an <strong>adaptive navigation system for personal growth</strong>.
              </p>

              <div style={{ display: 'grid', gap: '10px', marginTop: '16px' }}>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                  <strong style={{ color: '#111827' }}>🎯 Problem We Solve:</strong> People have high ambitions (skills, fitness, business) but lack clear, adaptable steps and accountability.
                </div>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                  <strong style={{ color: '#111827' }}>🛣️ The Solution:</strong> Breaking down big goals into actionable stages, milestones, proof-based verification, and community feedback loops.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM FLOW */}
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

          {/* TAB 3: COMMUNITY */}
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

          {/* TAB 4: FEATURES & DIFFERENCE */}
          {activeTab === 'features' && (
            <div>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <strong style={{ color: '#2563eb' }}>🔄 Recoverable Journeys:</strong> Life happens. Interruption isn't treated as failure; the system offers smart restart points.
                </div>
                <div style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <strong style={{ color: '#2563eb' }}>🎯 Trust & Visibility Score:</strong> Algorithm promotes genuine completions and filters out spam/abandoned roadmaps.
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

export default AboutModal