import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function PapersListPage() {
  const [papers, setPapers] = useState([])
  const [status, setStatus] = useState({ type: 'idle', message: '' })

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
    try {
      const examPapers = JSON.parse(localStorage.getItem('exam_papers')) || []
      const updatedPapers = examPapers.filter(paper => paper.id !== paperId)
      localStorage.setItem('exam_papers', JSON.stringify(updatedPapers))
      // await api.delete(`/papers/${paperId}`)
      // setStatus({ type: 'success', message: 'Paper deleted.' })
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
      </header>

      {status.message ? <div className={`status ${status.type}`}>{status.message}</div> : null}

      <main className="workspace-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Your Papers</h2>
            <span>{papers.length} papers</span>
          </div>

          <div className="papers-list">
            {papers.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999' }}>
                No papers saved yet.{' '}
                <Link to="/builder" style={{ color: '#0066cc' }}>
                  Create one now
                </Link>
              </p>
            ) : (
              papers.map((paper) => (
                <article className="paper-card" key={paper.id}>
                  <div className="paper-header">
                    <h3>{paper.title}</h3>
                    <span className="badge">{paper.subject}</span>
                  </div>
                  <div className="paper-details">
                    <p>
                      <strong>Questions:</strong> {paper.questions.length}
                    </p>
                    <p>
                      <strong>Duration:</strong> {paper.duration}
                    </p>
                    <p>
                      <strong>Total Marks:</strong>{' '}
                      {paper.questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)}
                    </p>
                  </div>
                  {paper.instructions && (
                    <div className="paper-instructions">
                      <strong>Instructions:</strong>
                      <p>{paper.instructions}</p>
                    </div>
                  )}
                  <div className="card-actions">
                    <Link to="/builder" className="button" title="Edit this paper">
                      Edit
                    </Link>
                    <button className="secondary" onClick={() => window.print()} title="Print this paper">
                      Print
                    </button>
                    <button className="danger" onClick={() => void deletePaper(paper.id)} title="Delete this paper">
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
