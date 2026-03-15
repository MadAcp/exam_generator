import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, Edit2, Trash2, Plus } from 'lucide-react'
import api from '../api'

export default function PapersListPage() {
  const [papers, setPapers] = useState([])
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'My Papers - Exam Generator'
  }, [])

  const loadPapers = useCallback(async () => {
    try {
      // const { data } = await api.get('/papers')
      // setPapers(data)
      setPapers(JSON.parse(localStorage.getItem('exam_papers')) || []);
    } catch {
      setStatus({ type: 'error', message: 'Unable to load saved papers.' })
    }
  }, [])

  useEffect(() => {
    void loadPapers()
  }, [loadPapers])

  async function deletePaper(paperId) {
    if (!window.confirm('Are you sure you want to delete this paper?')) {
      return
    }
    try {
      const examPapers = JSON.parse(localStorage.getItem('exam_papers')) || []
      const updatedPapers = examPapers.filter(paper => paper.id !== paperId)
      localStorage.setItem('exam_papers', JSON.stringify(updatedPapers))
      // await api.delete(`/papers/${paperId}`)
      setStatus({ type: 'success', message: 'Paper deleted.' })
      await loadPapers()
    } catch {
      setStatus({ type: 'error', message: 'Unable to delete paper.' })
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">MERN exam generator</p>
          <h2>Saved Papers</h2>
        </div>
        <Link to="/builder" className="button" title="Create a new paper">
          <Plus size={20} />
          New Paper
        </Link>
      </header>

      {status.message ? <div className={`status ${status.type}`}>{status.message}</div> : null}

      <main className="workspace-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Your Papers ({papers.length})</h2>
          </div>

          {papers.length === 0 ? (
            <div className="empty-state">
              <p>No papers saved yet.</p>
              <Link to="/builder" className="button">
                Create one now
              </Link>
            </div>
          ) : (
            <div className="papers-table-container">
              <table className="papers-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Questions</th>
                    <th>Marks</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.map((paper) => {
                    const totalMarks = paper.questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)
                    return (
                      <tr key={paper.id} className="paper-row">
                        <td className="title-cell">{paper.title}</td>
                        <td className="subject-cell">
                          <span className="badge">{paper.subject}</span>
                        </td>
                        <td className="number-cell">{paper.questions.length}</td>
                        <td className="number-cell">{totalMarks}</td>
                        <td className="text-cell">{paper.duration}</td>
                        <td className="actions-cell">
                          <button
                            className="action-button view"
                            onClick={() => navigate(`/paper/${paper.id}`)}
                            title="View this paper"
                          >
                            <Eye size={16} />
                            View
                          </button>
                          <button
                            className="action-button edit"
                            onClick={() => navigate('/builder', { state: { paperId: paper.id } })}
                            title="Edit this paper"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            className="action-button delete"
                            onClick={() => void deletePaper(paper.id)}
                            title="Delete this paper"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
