import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, Download, Printer } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import Modal from '../components/Modal'

export default function ViewPaper() {
  const { paperId } = useParams()
  const navigate = useNavigate()
  const paperRef = useRef(null)
  const [paper, setPaper] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorModalOpen, setErrorModalOpen] = useState(false)

  useEffect(() => {
    const papers = JSON.parse(localStorage.getItem('exam_papers')) || []
    const foundPaper = papers.find((p) => p.id === paperId)
    if (foundPaper) {
      setPaper(foundPaper)
      document.title = `${foundPaper.title} - Exam Generator`
    }
    setLoading(false)
  }, [paperId])

  const getOptionLabel = (index) => {
    const labels = ['A', 'B', 'C', 'D', 'E', 'F']
    return labels[index] || 'N/A'
  }

  const handlePrint = useReactToPrint({
    contentRef: paperRef,
    documentTitle: "Exam_Paper",
    pageStyle: `
    @page { size: A4; margin: 20mm; }
    .print-shell { font-family: 'Inter', sans-serif; color: black; }
    .paper-header { text-align: center; border-bottom: 2px solid #000; margin-bottom: 20px; }
    .paper-questions { display: grid; gap: 1rem; padding-left: 1.3rem; }
    .paper-options { margin-top: 0.75rem; margin-bottom: 0; }
    .paper-question-line { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .answer-key { display: block; margin-top: 2rem; border-top: 1px dashed #000; padding-top: 20px; page-break-before: always !important; }
    .answer-key h3 { margin-top: 0; }
    .answer-key ol { display: grid; gap: 0.5rem; padding-left: 1.3rem; }
    `
  })

  const handleDownloadPdf = async () => {
    if (!paperRef.current) {
      setErrorModalOpen(true)
      return
    }

    const { default: html2pdf } = await import('html2pdf.js')

    await html2pdf()
      .set({
        margin: 0.5,
        filename: `${paper.title.replace(/\s+/g, '_').toLowerCase() || 'exam-paper'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .from(paperRef.current)
      .save()
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
  const coveredSubjects = [...new Set(paper.questions.map((q) => q.subject).filter(Boolean))].sort((a, b) =>
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
        <div className="print-shell" id="printable-area" ref={paperRef}>
          <div className="paper-header">
            <h2>{paper.title}</h2>
            <div className="paper-meta">
              <span>Subject: {paper.subject}</span>
              <span>Duration: {paper.duration}</span>
              <span>Total marks: {totalMarks}</span>
              <span>Subjects Covered: {coveredSubjects.length > 0 ? coveredSubjects.join(', ') : 'None'}</span>
            </div>
            {paper.instructions && <p>{paper.instructions}</p>}
          </div>

          <ol className="paper-questions">
            {paper.questions.map((question) => (
              <li key={question.questionId}>
                <div className="paper-question-line">
                  <span>{question.text}</span>
                  <strong>({question.marks} marks)</strong>
                </div>
                {question.options?.length ? (
                  <ol className="paper-options" type="A">
                    {question.options.map((option, index) => (
                      <li key={`${question.questionId}-option-${getOptionLabel(index)}`}>{option}</li>
                    ))}
                  </ol>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="answer-key">
            <h3>Answer key</h3>
            <ol>
              {paper.questions.map((question) => (
                <li key={`${question.questionId}-answer`}>
                  {question.answer || question.correctAnswer || 'No answer key provided.'}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <Modal
        isOpen={errorModalOpen}
        title="PDF Download Unavailable"
        type="error"
        message="PDF download feature is not available. Please use the print function to save as PDF instead."
        confirmText="OK"
        showCancel={false}
        onConfirm={() => setErrorModalOpen(false)}
      />
    </div>
  )
}
