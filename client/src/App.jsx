import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import QuestionManagementPage from './pages/QuestionManagementPage'
import PaperBuilderPage from './pages/PaperBuilderPage'
import PapersListPage from './pages/PapersListPage'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import api from './api'

const defaultPaperMeta = {
  title: 'HTML & CSS MCQ Paper',
  subject: 'HTML & CSS',
  duration: '60 minutes',
  instructions: 'Choose the most appropriate option for each question.',
}

function getOptionLabel(index) {
  return String.fromCharCode(65 + index)
}

function App() {
  const [questions, setQuestions] = useState([])
  const [papers, setPapers] = useState([])
  const [filters, setFilters] = useState({ subject: '', topic: '', difficulty: '', search: '' })
  const [paperMeta, setPaperMeta] = useState(() => ({ ...defaultPaperMeta }))
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [activePaperId, setActivePaperId] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const paperRef = useRef(null)

  const totalMarks = useMemo(
    () => selectedQuestions.reduce((sum, question) => sum + Number(question.marks || 0), 0),
    [selectedQuestions],
  )

  const availableTopics = useMemo(
    () => [...new Set(questions.map((question) => question.topic))].sort((a, b) => a.localeCompare(b)),
    [questions],
  )

  const loadQuestions = useCallback(async () => {
    try {
      const { data } = await api.get('/questions', { params: filters })
      setQuestions(data)
    } catch {
      setStatus({ type: 'error', message: 'Unable to load questions. Start the API server and try again.' })
    }
  }, [filters])

  const loadPapers = useCallback(async () => {
    try {
      const { data } = await api.get('/papers')
      setPapers(data)
    } catch {
      setStatus({ type: 'error', message: 'Unable to load saved papers.' })
    }
  }, [])

  useEffect(() => {
    void loadQuestions()
  }, [loadQuestions])

  useEffect(() => {
    void loadPapers()
  }, [loadPapers])

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
          options: Array.isArray(question.options) ? question.options : [],
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
      await loadPapers()
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Unable to save paper.' })
    }
  }

  function loadPaperIntoBuilder(paper) {
    setActivePaperId(paper.id)
    setPaperMeta({
      title: paper.title,
      subject: paper.subject,
      duration: paper.duration,
      instructions: paper.instructions,
    })
    setSelectedQuestions(
      paper.questions.map((question) => ({
        ...question,
        options: Array.isArray(question.options) ? question.options : [],
      })),
    )
    setStatus({ type: 'success', message: `Loaded paper: ${paper.title}` })
  }

  function createNewPaper() {
    setActivePaperId('')
    setSelectedQuestions([])
    setPaperMeta({ ...defaultPaperMeta })
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
    <>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<QuestionManagementPage />} />
          <Route path="/builder" element={<PaperBuilderPage />} />
          <Route path="/papers" element={<PapersListPage />} />
        </Routes>
      </Layout>
    </Router>
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">MERN exam generator</p>
          <h1>Create printable exam papers from your HTML &amp; CSS MCQ bank</h1>
          <p className="hero-copy">
            Browse the read-only MCQ bank, curate a paper, print it, or export a polished PDF.
          </p>
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
            <h2>Question source</h2>
            <span>Read only</span>
          </div>

          <div className="stack">
            <p className="readonly-note">
              The app now uses only the HTML/CSS MCQs loaded from <code>server/src/data/mcqs.js</code>.
            </p>
            <div className="grid-2">
              <div className="stat-card">
                <strong>{questions.length}</strong>
                <span>available MCQs</span>
              </div>
              <div className="stat-card">
                <strong>{availableTopics.length}</strong>
                <span>topics covered</span>
              </div>
            </div>
            <div className="pill-row">
              {availableTopics.map((topic) => (
                <span className="pill subtle" key={topic}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Question bank</h2>
            <span>{questions.length} questions</span>
          </div>

          <div className="filter-grid">
            <input name="search" value={filters.search} onChange={handleFilterChange} placeholder="Search questions" />
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
                {question.options?.length ? (
                  <ol className="option-list" type="A">
                    {question.options.map((option, index) => (
                      <li key={`${question.id}-${getOptionLabel(index)}`}>{option}</li>
                    ))}
                  </ol>
                ) : null}
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
                  {question.options?.length ? (
                    <ol className="option-list compact-list" type="A">
                      {question.options.map((option, optionIndex) => (
                        <li key={`${question.questionId}-${getOptionLabel(optionIndex)}`}>{option}</li>
                      ))}
                    </ol>
                  ) : null}
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
      </main>

      <section className="panel saved-papers">
        <div className="panel-header">
          <h2>Saved papers</h2>
          <span>{papers.length} saved</span>
        </div>
        <div className="saved-list">
          {papers.map((paper) => (
            <button className="saved-card" key={paper.id} onClick={() => loadPaperIntoBuilder(paper)}>
              <strong>{paper.title}</strong>
              <span>
                {paper.subject} · {paper.duration}
              </span>
              <span>
                {paper.questions.length} questions · {paper.totalMarks} marks
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel preview-panel">
        <div className="panel-header">
          <h2>Print preview</h2>
          <span>{activePaperId ? 'Saved paper' : 'Unsaved draft'}</span>
        </div>

        <div className="print-shell" ref={paperRef}>
          <div className="paper-header">
            <h2>{paperMeta.title}</h2>
            <div className="paper-meta">
              <span>Subject: {paperMeta.subject}</span>
              <span>Duration: {paperMeta.duration}</span>
              <span>Total marks: {totalMarks}</span>
            </div>
            <p>{paperMeta.instructions}</p>
          </div>

          <ol className="paper-questions">
            {selectedQuestions.map((question) => (
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
              {selectedQuestions.map((question) => (
                <li key={`${question.questionId}-answer`}>
                  {question.answer || 'No answer key provided.'}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}


export default App;
