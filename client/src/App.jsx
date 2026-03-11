import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import api from './api'
import './App.css'

const emptyQuestion = {
  text: '',
  subject: 'Mathematics',
  topic: '',
  difficulty: 'Medium',
  marks: 5,
  answer: '',
  tags: '',
}

function App() {
  const [questions, setQuestions] = useState([])
  const [papers, setPapers] = useState([])
  const [questionForm, setQuestionForm] = useState(emptyQuestion)
  const [editingQuestionId, setEditingQuestionId] = useState('')
  const [filters, setFilters] = useState({ subject: '', topic: '', difficulty: '', search: '' })
  const [paperMeta, setPaperMeta] = useState({
    title: 'Midterm Examination',
    subject: 'Mathematics',
    duration: '90 minutes',
    instructions: 'Answer all questions. Show all necessary working.',
  })
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [activePaperId, setActivePaperId] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
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

  function handleQuestionChange(event) {
    const { name, value } = event.target
    setQuestionForm((current) => ({ ...current, [name]: value }))
  }

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  function handlePaperMetaChange(event) {
    const { name, value } = event.target
    setPaperMeta((current) => ({ ...current, [name]: value }))
  }

  async function handleQuestionSubmit(event) {
    event.preventDefault()

    const payload = {
      ...questionForm,
      marks: Number(questionForm.marks),
      tags: questionForm.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    try {
      if (editingQuestionId) {
        await api.put(`/questions/${editingQuestionId}`, payload)
        setStatus({ type: 'success', message: 'Question updated.' })
      } else {
        await api.post('/questions', payload)
        setStatus({ type: 'success', message: 'Question created.' })
      }

      setQuestionForm(emptyQuestion)
      setEditingQuestionId('')
      await loadQuestions()
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Unable to save question.' })
    }
  }

  function startEditingQuestion(question) {
    setEditingQuestionId(question.id)
    setQuestionForm({
      text: question.text,
      subject: question.subject,
      topic: question.topic,
      difficulty: question.difficulty,
      marks: question.marks,
      answer: question.answer,
      tags: question.tags.join(', '),
    })
  }

  async function deleteQuestion(questionId) {
    try {
      await api.delete(`/questions/${questionId}`)
      setSelectedQuestions((current) => current.filter((question) => question.questionId !== questionId))
      setStatus({ type: 'success', message: 'Question deleted.' })
      await loadQuestions()
    } catch {
      setStatus({ type: 'error', message: 'Unable to delete question.' })
    }
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
    setSelectedQuestions(paper.questions)
    setStatus({ type: 'success', message: `Loaded paper: ${paper.title}` })
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
          <h1>Create printable exam papers from your question bank</h1>
          <p className="hero-copy">
            Add questions, curate a paper, print it, or export a polished PDF.
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
            <h2>{editingQuestionId ? 'Edit question' : 'Add question'}</h2>
            {editingQuestionId ? (
              <button className="secondary" onClick={() => { setEditingQuestionId(''); setQuestionForm(emptyQuestion) }}>
                Cancel edit
              </button>
            ) : null}
          </div>

          <form className="stack" onSubmit={handleQuestionSubmit}>
            <label>
              Question text
              <textarea name="text" rows="4" value={questionForm.text} onChange={handleQuestionChange} required />
            </label>
            <div className="grid-2">
              <label>
                Subject
                <input name="subject" value={questionForm.subject} onChange={handleQuestionChange} required />
              </label>
              <label>
                Topic
                <input name="topic" value={questionForm.topic} onChange={handleQuestionChange} required />
              </label>
            </div>
            <div className="grid-2">
              <label>
                Difficulty
                <select name="difficulty" value={questionForm.difficulty} onChange={handleQuestionChange}>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </label>
              <label>
                Marks
                <input name="marks" type="number" min="1" value={questionForm.marks} onChange={handleQuestionChange} required />
              </label>
            </div>
            <label>
              Answer key / marking note
              <textarea name="answer" rows="3" value={questionForm.answer} onChange={handleQuestionChange} />
            </label>
            <label>
              Tags (comma separated)
              <input name="tags" value={questionForm.tags} onChange={handleQuestionChange} placeholder="algebra, grade-10" />
            </label>
            <button type="submit">{editingQuestionId ? 'Update question' : 'Save question'}</button>
          </form>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Question bank</h2>
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
                  <button className="secondary" onClick={() => startEditingQuestion(question)}>
                    Edit
                  </button>
                  <button className="danger" onClick={() => void deleteQuestion(question.id)}>
                    Delete
                  </button>
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
  )
}

export default App
