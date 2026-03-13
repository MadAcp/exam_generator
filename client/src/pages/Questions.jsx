import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import api from '../api'
import '../App.css'
import styles from './Questions.module.css'

export default function Questions() {
  const [allQuestions, setAllQuestions] = useState([])
  const [filters, setFilters] = useState({ subject: '', topic: '', difficulty: '', search: '' })
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const navigate = useNavigate()

  const availableSubjects = useMemo(
    () => [...new Set(allQuestions.map((question) => question.subject))].sort((a, b) => a.localeCompare(b)),
    [allQuestions],
  )

  const availableTopics = useMemo(
    () =>
      [...new Set(
        allQuestions
          .filter((question) => !filters.subject || question.subject === filters.subject)
          .map((question) => question.topic),
      )].sort((a, b) => a.localeCompare(b)),
    [allQuestions, filters.subject],
  )

  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        const { data } = await api.get('/questions', { params: filters });
        setAllQuestions(data);
      } catch {
        setStatus({ type: 'error', message: '...' });
      }
    };

    loadAllQuestions();
  }, [filters]); // Only runs when 'filters' actually changes

  function handleFilterChange(event) {
    const { name, value } = event.target

    setFilters((current) => {
      if (name === 'subject') {
        return { ...current, subject: value, topic: '' }
      }

      return { ...current, [name]: value }
    })
  }

  function createNewPaper() {
    //TODO route to paper builder page
    navigate('/builder')
  }

  // Custom Body Templates to keep the "row" look clean
  const questionTemplate = (rowData) => {
    return (
      <div className="flex flex-column">
        <span className="font-bold text-900">{rowData.text}</span>
        <small className="text-secondary">{rowData.topic}</small>
      </div>
    );
  };

  const difficultyTemplate = (rowData) => {
    const severity = {
      'Easy': 'success',
      'Medium': 'warning',
      'Hard': 'danger'
    }[rowData.difficulty];

    return <Tag value={rowData.difficulty} severity={severity} />;
  };

  return (
    <>
      <div className="app-shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Exam Paper Generator</p>
            <h1>Create printable exam papers from your MCQ banks</h1>
            <p className="hero-copy">
              Browse subject-wise MCQ banks, choose a topic, create a paper, and export a polished PDF.
            </p>
          </div>
          <div className="hero-actions">
            <button onClick={createNewPaper}>Create paper</button>
          </div>
        </header>

        {status.message ? <div className={`status ${status.type}`}>{status.message}</div> : null}

        <main className={styles['questionWorkspaceGrid']}>
          <section className="panel">
            <div className="panel-header">
              <h2>Question bank</h2>
              <span>{allQuestions.length} questions</span>
            </div>

            <div className="filter-grid">
              <select name="subject" value={filters.subject} onChange={handleFilterChange}>
                <option value="">All subjects</option>
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <select name="topic" value={filters.topic} onChange={handleFilterChange}>
                <option value="">All topics</option>
                {availableTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <input name="search" value={filters.search} onChange={handleFilterChange} placeholder="Search questions" />
              <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
                <option value="">All difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="question-list">
              <DataTable
                value={allQuestions}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                stripedRows
                // This makes it feel more like "Rows" and less like a static grid
                className="p-datatable-sm"
              >
                <Column field="subject" header="Subject"></Column>
                <Column body={questionTemplate} style={{ width: '50%' }} header="Question"></Column>
                <Column field="difficulty" body={difficultyTemplate} header="Difficulty"></Column>
                <Column field="marks" header="Marks"></Column>
              </DataTable>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>Question source</h2>
              <span>Read only</span>
            </div>

            <div className="stack">
              <p className="readonly-note">
                The app uses the read-only MCQ bank files in <code>server/src/data</code>, with separate subject and topic filtering.
              </p>
              <div className="grid-2">
                <div className="stat-card">
                  <strong>{allQuestions.length}</strong>
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
        </main>
      </div>
    </>
  )
}
