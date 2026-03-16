import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, Edit2, Trash2, Plus } from 'lucide-react'
import api from '../api'
import Modal from '../components/Modal'

export default function PapersListPage() {
  const [papers, setPapers] = useState([])
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [paperIdToDelete, setPaperIdToDelete] = useState(null)
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

  function openDeleteModal(paperId) {
    setPaperIdToDelete(paperId)
    setDeleteModalOpen(true)
  }

  async function confirmDelete() {
    setDeleteModalOpen(false)
    try {
      const examPapers = JSON.parse(localStorage.getItem('exam_papers')) || []
      const updatedPapers = examPapers.filter(paper => paper.id !== paperIdToDelete)
      localStorage.setItem('exam_papers', JSON.stringify(updatedPapers))
      // await api.delete(`/papers/${paperIdToDelete}`)
      setStatus({ type: 'success', message: 'Paper deleted.' })
      await loadPapers()
      setPaperIdToDelete(null)
    } catch {
      setStatus({ type: 'error', message: 'Unable to delete paper.' })
    }
  }

  // Filter papers based on search query
  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredPapers.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const paginatedPapers = filteredPapers.slice(startIndex, endIndex)

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, entriesPerPage])

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Exam Generator</p>
          <h2>Saved Papers</h2>
        </div>
        <Link to="/builder" className="button" title="Create a new paper">
          <Plus size={20} />
          New Paper
        </Link>
      </header>

      {status.message ? <div className={`status ${status.type}`}>{status.message}</div> : null}

      <main className="papers-main">
        <div className="papers-container">
          <div className="papers-header">
            <h2>Saved Papers</h2>
          </div>

          {papers.length === 0 ? (
            <div className="empty-state">
              <p>No papers saved yet.</p>
              <Link to="/builder" className="button">
                Create one now
              </Link>
            </div>
          ) : (
            <>
              {/* Controls Section */}
              <div className="papers-controls">
                <div className="controls-left">
                  <label className="entries-label">
                    Show
                    <select 
                      value={entriesPerPage} 
                      onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                      className="entries-select"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    entries
                  </label>
                </div>
                <div className="controls-right">
                  <input
                    type="text"
                    placeholder="Search papers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Table Section */}
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
                    {paginatedPapers.length > 0 ? (
                      paginatedPapers.map((paper) => {
                        const totalMarks = paper.questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)
                        return (
                          <tr key={paper.id} className="paper-row">
                            <td className="title-cell">{paper.title}</td>
                            <td className="subject-cell">{paper.subject}</td>
                            <td className="number-cell">{paper.questions.length}</td>
                            <td className="number-cell">{totalMarks}</td>
                            <td className="text-cell">{paper.duration}</td>
                            <td className="actions-cell">
                              <button
                                className="icon-button view"
                                onClick={() => navigate(`/paper/${paper.id}`)}
                                title="View this paper"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                className="icon-button edit"
                                onClick={() => navigate(`/builder?id=${paper.id}`)}
                                title="Edit this paper"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="icon-button delete"
                                onClick={() => openDeleteModal(paper.id)}
                                title="Delete this paper"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-results">No papers found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Section */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}

              <div className="pagination-info">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredPapers.length)} of {filteredPapers.length} entries
              </div>
            </>
          )}
        </div>
      </main>

      <Modal
        isOpen={deleteModalOpen}
        title="Delete Paper"
        type="warning"
        message="Are you sure you want to delete this paper? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  )
}
