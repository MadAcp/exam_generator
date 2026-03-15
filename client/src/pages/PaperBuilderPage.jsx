import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import api from '../api'

export default function PaperBuilderPage() {
  const [questions, setQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [paperMeta, setPaperMeta] = useState({
    title: 'Midterm Examination',
    subject: 'Mathematics',
    duration: '90 minutes',
    instructions: 'Answer all questions. Show all necessary working.',
  })
  const [activePaperId, setActivePaperId] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [filters, setFilters] = useState({ subject: '', topic: '', difficulty: '', search: '' })
  const paperRef = useRef(null)

  const totalMarks = useMemo(
    () => selectedQuestions.reduce((sum, question) => sum + Number(question.marks || 0), 0),
    [selectedQuestions],
  )

  const loadQuestions = useCallback(async () => {
    try {
      const { data } = await api.get('/questions', { params: filters })
      setQuestions(data)
    } catch {
      setStatus({ type: 'error', message: 'Unable to load questions. Start the API server and try again.' })
    }
  }, [filters])

  useEffect(() => {
    void loadQuestions()
  }, [loadQuestions])

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  function handlePaperMetaChange(event) {
    const { name, value } = event.target
    setPaperMeta((current) => ({ ...current, [name]: value }))
  }

  function addQuestionToPaper(question) {
    setSelectedQuestions((current) => {
      if (current.some((item) => item.questionId === question.id)) {
        return current
      }

      return [
        ...current,
        {
          questionId: question.id,
          text: question.text,
          topic: question.topic,
          difficulty: question.difficulty,
          marks: question.marks,
          answer: question.answer,
        },
      ]
    })
  }

  function removeQuestionFromPaper(questionId) {
    setSelectedQuestions((current) => current.filter((question) => question.questionId !== questionId))
  }

  function moveQuestion(index, direction) {
    setSelectedQuestions((current) => {
      const nextIndex = index + direction
      if (nextIndex < 0 || nextIndex >= current.length) {
        return current
      }

      const updated = [...current]
      ;[updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]]
      return updated
    })
  }

  async function savePaper() {
    const payload = {
      ...paperMeta,
      questions: selectedQuestions,
    }

    try {
      const response = activePaperId
        ? await api.put(`/papers/${activePaperId}`, payload)
        : await api.post('/papers', payload)

      setActivePaperId(response.data.id)
      setStatus({ type: 'success', message: 'Exam paper saved.' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Unable to save paper.' })
    }
  }

  function createNewPaper() {
    setActivePaperId('')
    setSelectedQuestions([])
    setPaperMeta({
      title: 'Midterm Examination',
      subject: 'Mathematics',
      duration: '90 minutes',
      instructions: 'Answer all questions. Show all necessary working.',
    })
  }

  async function downloadPdf() {
    if (!paperRef.current || selectedQuestions.length === 0) {
      setStatus({ type: 'error', message: 'Add questions to the paper before exporting a PDF.' })
      return
    }

    const { default: html2pdf } = await import('html2pdf.js')

    await html2pdf()
      .set({
        margin: 0.5,
        filename: `${paperMeta.title.replace(/\s+/g, '_').toLowerCase() || 'exam-paper'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .from(paperRef.current)
      .save()
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">MERN exam generator</p>
          <h2>Build Your Paper</h2>
        </div>
        <div className="hero-actions">
          <button onClick={createNewPaper}>New paper</button>
          <button className="secondary" onClick={() => window.print()}>
            Print paper
          </button>
          <button className="secondary" onClick={() => void downloadPdf()}>
            Export PDF
          </button>
        </div>
      </header>

      {status.message ? <div className={`status ${status.type}`}>{status.message}</div> : null}

      <main className="workspace-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Available Questions</h2>
            <span>{questions.length} questions</span>
          </div>

          <div className="filter-grid">
            <input name="search" value={filters.search} onChange={handleFilterChange} placeholder="Search questions" />
            <input name="subject" value={filters.subject} onChange={handleFilterChange} placeholder="Filter by subject" />
            <input name="topic" value={filters.topic} onChange={handleFilterChange} placeholder="Filter by topic" />
            <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
              <option value="">All difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="question-list">
            {questions.map((question) => (
              <article className="question-card" key={question.id}>
                <div className="question-topline">
                  <strong>{question.subject}</strong>
                  <span>{question.topic}</span>
                </div>
                <p>{question.text}</p>
                <div className="pill-row">
                  <span className="pill">{question.difficulty}</span>
                  <span className="pill">{question.marks} marks</span>
                  {question.tags.map((tag) => (
                    <span className="pill subtle" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="card-actions">
                  <button onClick={() => addQuestionToPaper(question)}>Add to paper</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Paper builder</h2>
            <span>{selectedQuestions.length} selected</span>
          </div>

          <div className="stack compact">
            <div className="grid-2">
              <label>
                Paper title
                <input name="title" value={paperMeta.title} onChange={handlePaperMetaChange} />
              </label>
              <label>
                Subject
                <input name="subject" value={paperMeta.subject} onChange={handlePaperMetaChange} />
              </label>
            </div>
            <div className="grid-2">
              <label>
                Duration
                <input name="duration" value={paperMeta.duration} onChange={handlePaperMetaChange} />
              </label>
              <label>
                Total marks
                <input value={totalMarks} readOnly />
              </label>
            </div>
            <label>
              Instructions
              <textarea name="instructions" rows="3" value={paperMeta.instructions} onChange={handlePaperMetaChange} />
            </label>
            <button onClick={() => void savePaper()}>Save paper</button>
          </div>

          <div className="builder-list">
            {selectedQuestions.map((question, index) => (
              <div className="builder-item" key={question.questionId}>
                <div>
                  <strong>Q{index + 1}</strong>
                  <p>{question.text}</p>
                  <small>
                    {question.topic} · {question.difficulty} · {question.marks} marks
                  </small>
                </div>
                <div className="builder-actions">
                  <button className="secondary" onClick={() => moveQuestion(index, -1)}>
                    ↑
                  </button>
                  <button className="secondary" onClick={() => moveQuestion(index, 1)}>
                    ↓
                  </button>
                  <button className="danger" onClick={() => removeQuestionFromPaper(question.questionId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel print-only">
          <div ref={paperRef} id="paper-preview" className="paper">
            <div className="paper-header">
              <h1>{paperMeta.title}</h1>
              <div className="paper-meta">
                <span>Subject: {paperMeta.subject}</span>
                <span>Duration: {paperMeta.duration}</span>
                <span>Total Marks: {totalMarks}</span>
              </div>
            </div>

            {paperMeta.instructions ? (
              <div className="paper-instructions">
                <h3>Instructions</h3>
                <p>{paperMeta.instructions}</p>
              </div>
            ) : null}

            <div className="paper-questions">
              {selectedQuestions.map((question, index) => (
                <div className="paper-question" key={question.questionId}>
                  <div className="question-number">Q{index + 1}</div>
                  <div className="question-content">
                    <p>{question.text}</p>
                    <div className="marks-box">({question.marks} marks)</div>
                    <div className="answer-lines">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="line"></div>
                      ))}
                    </div>
                    {question.answer ? (
                      <div className="paper-only">
                        <strong>Answer:</strong>
                        <p>{question.answer}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
