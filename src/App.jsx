import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Replace with your Supabase Project Details
const SUPABASE_URL = 'https://dovknokgsbzurjijhpvr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdmtub2tnc2J6dXJqaWpocHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3Mzg1ODUsImV4cCI6MjEwNDMxNDU4NX0.KT8ESrfYi1jT0BQ1I50k9baOhr6m7sw_UXZPjRAUu2k'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ==========================================
// 1. AUTHENTICATION & LOGIN SCREEN
// ==========================================
function AuthScreen({ onAuthSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data.user) {
          await supabase.from('profiles').insert([{ id: data.user.id, full_name: email.split('@')[0] }])
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      onAuthSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#111827', margin: '0 0 8px 0', textAlign: 'center' }}>
        🚀 JOURNEY
      </h2>
      <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', marginBottom: '20px' }}>
        {isSignUp ? 'Create your account to start tracking' : 'Sign in to access your saved journey'}
      </p>

      {error && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}

// ==========================================
// 2. MAIN PRODUCTION APP COMPONENT
// ==========================================
export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({ current_streak: 0, best_streak: 0, xp_points: 0 })
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  // Check Active Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchUserData(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchUserData(session.user.id)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fetch Data from Supabase
  const fetchUserData = async (userId) => {
    // Fetch Profile
    const { data: prof } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (prof) setProfile(prof)

    // Fetch Tasks
    const { data: userTasks } = await supabase.from('user_tasks').select('*').eq('user_id', userId)
    if (userTasks) setTasks(userTasks)
  }

  // Add Task Functionality
  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim() || !session) return

    const newTask = {
      id: 't_' + Date.now(),
      user_id: session.user.id,
      title: newTaskTitle,
      xp: 50,
      completed: false
    }

    const { error } = await supabase.from('user_tasks').insert([newTask])
    if (!error) {
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    }
  }

  // Toggle Task Completion with DB Sync & Streak Increment
  const handleToggleTask = async (taskId, currentStatus) => {
    const updatedStatus = !currentStatus
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: updatedStatus } : t))

    // DB Sync
    await supabase.from('user_tasks').update({ completed: updatedStatus }).eq('id', taskId)

    // Recalculate Streak & XP
    if (updatedStatus) {
      const newStreak = profile.current_streak + 1
      const newXp = profile.xp_points + 50
      const newBest = Math.max(newStreak, profile.best_streak)

      setProfile({ ...profile, current_streak: newStreak, xp_points: newXp, best_streak: newBest })
      await supabase.from('profiles').update({
        current_streak: newStreak,
        best_streak: newBest,
        xp_points: newXp
      }).eq('id', session.user.id)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading JOURNEY Engine...</div>
  }

  if (!session) {
    return <AuthScreen onAuthSuccess={() => setLoading(false)} />
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#f9fafb', padding: '16px' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#111827' }}>JOURNEY</h1>
          <span style={{ fontSize: '11px', color: '#6b7280' }}>Connected to Supabase DB</span>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          style={{ padding: '6px 12px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
        >
          Sign Out
        </button>
      </header>

      {/* Profile & Streak Overview */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>🔥 {profile.current_streak}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Streak</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#2563eb' }}>⚡ {profile.xp_points}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Total XP</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#16a34a' }}>🏆 {profile.best_streak}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Best Streak</div>
          </div>
        </div>
      </div>

      {/* Add New Task Form */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Add a new goal task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '13px' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}
        >
          Add
        </button>
      </form>

      {/* Persistent Tasks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggleTask(task.id, task.completed)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: task.completed ? '#bbf7d0' : '#e5e7eb',
              backgroundColor: task.completed ? '#f0fdf4' : '#ffffff',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '5px',
                backgroundColor: task.completed ? '#16a34a' : '#ffffff',
                border: task.completed ? 'none' : '2px solid #d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>
                {task.completed && '✓'}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#16a34a' : '#111827' }}>
                {task.title}
              </span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb' }}>+{task.xp} XP</span>
          </div>
        ))}
      </div>

    </div>
  )
}
