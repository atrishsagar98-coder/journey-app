import { useState } from 'react'

function MainFeed({ currentUserInterests = ['Music', 'Business', 'Coding'] }) {
  // Navigation & View States
  const [selectedUser, setSelectedUser] = useState(null)
  const [activeStoryUser, setActiveStoryUser] = useState(null)

  // Sample Posts Data
  const [allPosts, setAllPosts] = useState([
    {
      id: 'p1',
      userId: 'u101',
      userName: 'Aarav Sharma',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
      hasStory: true,
      storyContent: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500',
        caption: 'Late night guitar practice! 🎸'
      },
      category: 'Music', // User Interest: Music
      title: 'Mastered F-Major Chord Progressions!',
      content: 'Day 12 of learning guitar. Finally clean sound without buzz.',
      likes: 42,
      time: '2h ago'
    },
    {
      id: 'p2',
      userId: 'u102',
      userName: 'Rohan Mehta',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      hasStory: true,
      storyContent: {
        type: 'text',
        caption: 'Launched v1.0 on ProductHunt today! 🚀'
      },
      category: 'Business', // User Interest: Business
      title: 'First 100 Users for my Micro-SaaS',
      content: 'Shared cold outreach templates that worked for us.',
      likes: 128,
      time: '4h ago'
    },
    {
      id: 'p3',
      userId: 'u103',
      userName: 'Priya Singh',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      hasStory: false,
      category: 'Gardening', // Not in currentUserInterests -> Hidden
      title: 'My Urban Tomato Harvest',
      content: 'Organic gardening journey week 4.',
      likes: 15,
      time: '5h ago'
    }
  ])

  // Interest-based Personalization Algorithm (Filter out unwanted topics)
  const personalizedFeed = allPosts.filter(post => 
    currentUserInterests.includes(post.category)
  )

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '70px' }}>
      
      {/* Personalized Posts Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {personalizedFeed.length > 0 ? (
          personalizedFeed.map((post) => (
            <div 
              key={post.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              {/* Post Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                
                {/* Story Trigger via Profile Picture */}
                <div 
                  onClick={() => post.hasStory && setActiveStoryUser(post)}
                  style={{
                    position: 'relative',
                    cursor: post.hasStory ? 'pointer' : 'default',
                    padding: '2px',
                    borderRadius: '50%',
                    background: post.hasStory ? 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' : 'transparent'
                  }}
                  title={post.hasStory ? "Click to view story" : ""}
                >
                  <img 
                    src={post.userAvatar} 
                    alt={post.userName}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      border: '2px solid #ffffff',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Profile View Trigger via Username */}
                <div style={{ flex: 1 }}>
                  <div 
                    onClick={() => setSelectedUser(post)}
                    style={{ 
                      fontWeight: 'bold', 
                      fontSize: '14px', 
                      color: '#111827', 
                      cursor: 'pointer',
                      display: 'inline-block' 
                    }}
                  >
                    {post.userName}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>
                    {post.time} • <span style={{ color: '#2563eb', fontWeight: 'bold' }}>#{post.category}</span>
                  </div>
                </div>
              </div>

              {/* Post Body */}
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#1f2937' }}>{post.title}</h4>
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#4b5563', lineHeight: '1.4' }}>{post.content}</p>

              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                ❤️ {post.likes} Likes
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '30px', color: '#6b7280' }}>
            No updates in your selected interests right now.
          </div>
        )}
      </div>

      {/* --- OVERLAY 1: STORY VIEWER --- */}
      {activeStoryUser && (
        <div 
          onClick={() => setActiveStoryUser(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3000
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              backgroundColor: '#111827',
              color: 'white',
              width: '90%',
              maxWidth: '360px',
              height: '550px',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={activeStoryUser.userAvatar} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
              <div>
                <strong style={{ fontSize: '13px', display: 'block' }}>{activeStoryUser.userName}</strong>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>Active Story</span>
              </div>
              <button 
                onClick={() => setActiveStoryUser(null)} 
                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ textAlign: 'center', margin: 'auto 0' }}>
              {activeStoryUser.storyContent.url && (
                <img 
                  src={activeStoryUser.storyContent.url} 
                  alt="Story" 
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                />
              )}
              <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{activeStoryUser.storyContent.caption}</p>
            </div>

            <span style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center' }}>Tap outside to close</span>
          </div>
        </div>
      )}

      {/* --- OVERLAY 2: USER PROFILE MODAL --- */}
      {selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2500
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <img src={selectedUser.userAvatar} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
              <div>
                <h3 style={{ margin: 0, color: '#111827' }}>{selectedUser.userName}</h3>
                <span style={{ fontSize: '12px', color: '#2563eb' }}>Category: {selectedUser.category}</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#4b5563', marginBottom: '15px' }}>
              Viewing public profile and active journeys of {selectedUser.userName}.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setSelectedUser(null)}
                style={{ padding: '8px 14px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
              >
                Close Profile
              </button>
              <button 
                onClick={() => alert(`Followed ${selectedUser.userName}`)}
                style={{ padding: '8px 14px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
              >
                + Follow User
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MainFeed