import { useState } from 'react'

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Setup React + Vite Project', completed: true },
    { id: 2, text: 'Create Navbar & Dashboard Components', completed: true },
    { id: 3, text: 'Build Interactive Task List', completed: false }
  ])
  const [newTask, setNewTask] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div style={{ padding: '0 30px 30px 30px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ marginTop: 0, color: '#111827' }}>JOURNEY Tasks 📝</h3>
        
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Add a new goal/task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{
              flex: '1',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '14px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Add Task
          </button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                padding: '12px 15px',
                marginBottom: '8px',
                backgroundColor: task.completed ? '#f3f4f6' : '#f9fafb',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#9ca3af' : '#1f2937'
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                style={{ marginRight: '12px' }}
              />
              {task.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TaskList