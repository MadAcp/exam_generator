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
  const [expandedRows, setExpandedRows] = useState(null);
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

  const rowExpansionTemplate = (data) => {
    return (
        <div className="expansion-container p-3">
            <div className="expansion-card">
                {/* Left Side: Options */}
                <div className="options-section">
                    <div className="section-title">OPTIONS</div>
                    <div className="options-grid">
                        {data.options.map((opt, index) => {
                            const isCorrect = data.answer === opt;
                            return (
                                <div key={index} className={`option-item ${isCorrect ? 'correct' : ''}`}>
                                    <span className="option-badge">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="option-text">{opt}</span>
                                    {isCorrect && <i className="pi pi-check-circle ml-auto text-green-500"></i>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="details-section">
                    <div className="section-title">QUESTION DETAILS</div>
                    <div className="details-content">
                        <div className="detail-row">
                            <span className="label">Topic</span>
                            <span className="value topic-tag">{data.topic}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Tags</span>
                            <div className="tag-container">
                                {data.tags?.map(tag => (
                                    <Tag key={tag} value={tag} severity="info" rounded className="text-xs" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
            <button onClick={createNewPaper} title="Start creating a new paper">Create paper</button>
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
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                pageLinks={5}
                tableStyle={{ minWidth: '50rem' }}
                className="custom-table" // We will style this class
                dataKey="id"
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
              >
                <Column expander={true} style={{ width: '3rem' }} />
                <Column field="subject" header="Subject" style={{ width: '15%' }}></Column>
                <Column body={questionTemplate} header="Question" style={{ width: '70%' }}></Column>
                <Column field="difficulty" body={difficultyTemplate} header="Difficulty" style={{ width: '10%' }}></Column>
                <Column field="marks" header="Marks" style={{ width: '10%' }}></Column>
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
