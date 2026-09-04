function JourneyCard({ journey }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid #e5e7eb'
    }}>
      {/* User Info & Category Tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src={journey.userAvatar} 
            alt={journey.userName} 
            style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e5e7eb' }}
          />
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', color: '#111827' }}>{journey.userName}</h4>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Updated {journey.updatedAt}</span>
          </div>
        </div>
        <span style={{
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          fontSize: '12px',
          fontWeight: '600',
          padding: '4px 10px',
          borderRadius: '20px'
        }}>
          {journey.category}
        </span>
      </div>

      {/* Journey Title */}
      <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#1f2937' }}>
        {journey.title}
      </h3>

      {/* Current Progress & Bar */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
          <span style={{ color: '#4b5563', fontWeight: '500' }}>Progress</span>
          <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{journey.progress}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${journey.progress}%`, height: '100%', backgroundColor: '#2563eb', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Latest Milestone */}
      <div style={{ backgroundColor: '#f9fafb', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: '#374151', marginBottom: '15px' }}>
        <strong>Current Stage:</strong> {journey.currentMilestone}
      </div>

      {/* Social Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: '10px', borderTop: '1px solid #f3f4f6', fontSize: '13px', color: '#6b7280' }}>
        <span>👥 {journey.followersCount} Following this Journey</span>
        <button style={{
          padding: '6px 14px',
          backgroundColor: '#111827',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Follow Journey
        </button>
      </div>
    </div>
  )
}

export default JourneyCard