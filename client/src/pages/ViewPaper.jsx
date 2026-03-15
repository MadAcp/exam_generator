import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Download, Printer } from 'lucide-react'

export default function ViewPaper() {
  const { paperId } = useParams()
  const navigate = useNavigate()
  const [paper, setPaper] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const papers = JSON.parse(localStorage.getItem('exam_papers')) || []
    const foundPaper = papers.find((p) => p.id === paperId)
    if (foundPaper) {
      setPaper(foundPaper)
    }
    setLoading(false)
  }, [paperId])

  const getOptionLabel = (index) => {
    const labels = ['A', 'B', 'C', 'D', 'E', 'F']
    return labels[index] || 'N/A'
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPdf = async () => {
    const { html2pdf } = window
    if (!html2pdf) {
      alert('PDF download feature is not available')
      return
    }

    const element = document.getElementById('paper-content')
    const opt = {
      margin: 10,
      filename: `${paper.title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    }

    html2pdf().set(opt).from(element).save()
  }

  if (loading) {
    return (
      <div className="view-paper-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (!paper) {
    return (
      <div className="view-paper-container">
        <div className="not-found">
          <p>Paper not found</p>
          <Link to="/papers" className="button">
            Back to Papers
          </Link>
        </div>
      </div>
    )
  }

  const totalMarks = paper.questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)
  const coveredSubjects = [...new Set(paper.questions.map((q) => q.topic).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  )

  return (
    <div className="view-paper-container">
      <header className="view-paper-header">
        <button className="back-button" onClick={() => navigate('/papers')} title="Go back to papers list">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="header-actions">
          <button onClick={handlePrint} className="button" title="Print this paper">
            <Printer size={18} />
            Print
          </button>
          <button onClick={handleDownloadPdf} className="button secondary" title="Download as PDF">
            <Download size={18} />
            PDF
          </button>
        </div>
      </header>

      <main className="view-paper-content" id="paper-content">
        <div className="view-paper-title">
          <h1>{paper.title}</h1>
          <div className="view-paper-meta">
            <span className="badge">{paper.subject}</span>
            <span>
              <strong>Questions:</strong> {paper.questions.length}
            </span>
            <span>
              <strong>Duration:</strong> {paper.duration}
            </span>
            <span>
              <strong>Total Marks:</strong> {totalMarks}
            </span>
            {coveredSubjects.length > 0 && (
              <span>
                <strong>Subjects Covered:</strong> {coveredSubjects.join(', ')}
              </span>
            )}
          </div>
          {paper.instructions && (
            <div className="view-paper-instructions">
              <strong>Instructions:</strong>
              <p>{paper.instructions}</p>
            </div>
          )}
        </div>

        <ol className="view-paper-questions">
          {paper.questions.map((question, index) => (
            <li key={question.questionId}>
              <div className="view-question-line">
                <span className="view-question-text">{question.text}</span>
                <span className="view-question-marks">({question.marks} marks)</span>
              </div>
              {question.options?.length ? (
                <ol className="view-question-options" type="A">
                  {question.options.map((option, idx) => (
                    <li key={`${question.questionId}-option-${getOptionLabel(idx)}`}>{option}</li>
                  ))}
                </ol>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="view-paper-answer-key">
          <h2>Answer Key</h2>
          <ol className="answer-key-list">
            {paper.questions.map((question) => (
              <li key={question.questionId}>
                {getOptionLabel(Number(question.correctAnswer) || 0)}
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  )
}
