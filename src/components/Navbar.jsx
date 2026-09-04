function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'feed', label: '🏠 Feed' },
    { id: 'msg', label: '💬 MSG' },
    { id: 'explore', label: '🔍 Explore' },
    { id: 'activity', label: '📊 Activity' },
    { id: 'profile', label: '👤 Profile' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e5e7eb',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 0'
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: isActive ? '#2563eb' : '#6b7280',
              fontWeight: isActive ? 'bold' : 'normal',
              fontSize: '12px',
              padding: '6px 10px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav