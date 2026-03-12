import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../api'

const emptyQuestion = {
  text: '',
  subject: 'Mathematics',
  topic: '',
  difficulty: 'Medium',
  marks: 5,
  answer: '',
  tags: '',
}

export default function QuestionManagementPage() {
  const [questions, setQuestions] = useState([])
  const [questionForm, setQuestionForm] = useState(emptyQuestion)
  const [editingQuestionId, setEditingQuestionId] = useState('')
  const [filters, setFilters] = useState({ subject: '', topic: '', difficulty: '', search: '' })
  const [status, setStatus] = useState({ type: 'idle', message: '' })

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

  function handleQuestionChange(event) {
    const { name, value } = event.target
    setQuestionForm((current) => ({ ...current, [name]: value }))
  }

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
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
      setStatus({ type: 'success', message: 'Question deleted.' })
      await loadQuestions()
    } catch {
      setStatus({ type: 'error', message: 'Unable to delete question.' })
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">MERN exam generator</p>
          <h2>Manage Your Questions</h2>
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
      </main>
    </div>
  )
}
