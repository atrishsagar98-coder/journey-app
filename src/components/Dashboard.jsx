function Dashboard() {
  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#f3f4f6',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'left'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#111827' }}>My Journey Overview 📌</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.5' }}>
          Welcome back! Here is your quick progress tracker for the JOURNEY project.
        </p>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '150px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#6b7280' }}>Total Tasks</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>12</p>
          </div>

          <div style={{ flex: '1', minWidth: '150px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#6b7280' }}>Completed</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>8</p>
          </div>

          <div style={{ flex: '1', minWidth: '150px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#6b7280' }}>In Progress</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>4</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard