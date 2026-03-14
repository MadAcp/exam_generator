import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import './HomePage.css'

export default function HomePage() {
  const [stats, setStats] = useState({ questions: 0, papers: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [questionsRes, papersRes] = await Promise.all([
          api.get('/questions'),
          api.get('/papers'),
        ])
        setStats({
          questions: questionsRes.data.length,
          papers: papersRes.data.length,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to Exam Generator. Create and manage your exam papers.</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon questions">❓</div>
          <div className="stat-content">
            <p className="stat-label">Total Questions</p>
            <p className="stat-value">{loading ? '...' : stats.questions}</p>
            <Link to="/questions" className="stat-link" title="Manage questions">
              Manage Questions →
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon papers">📚</div>
          <div className="stat-content">
            <p className="stat-label">Total Papers</p>
            <p className="stat-value">{loading ? '...' : stats.papers}</p>
            <Link to="/papers" className="stat-link" title="View saved papers">
              View Papers →
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon create">✨</div>
          <div className="stat-content">
            <p className="stat-label">Create Paper</p>
            <p className="stat-value">Build</p>
            <Link to="/builder" className="stat-link" title="Start building a new paper">
              Get Started →
            </Link>
          </div>
        </div>
      </div>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/questions" className="action-btn" title="Add new questions">
            <span className="action-icon">➕</span>
            Add Question
          </Link>
          <Link to="/builder" className="action-btn" title="Build a new exam paper">
            <span className="action-icon">📝</span>
            Build Paper
          </Link>
          <Link to="/papers" className="action-btn" title="View all saved papers">
            <span className="action-icon">📋</span>
            View Papers
          </Link>
        </div>
      </section>
    </div>
  )
}
