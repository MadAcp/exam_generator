import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useReactToPrint } from 'react-to-print';
import api from '../api'
import '../App.css'

const defaultPaperMeta = {
  title: 'MCQ Paper',
  subject: 'Multiple Subjects',
  duration: '60 minutes',
  instructions: 'Choose the most appropriate option for each question.',
}

function getOptionLabel(index) {
  return String.fromCharCode(65 + index)
}



export default function PaperBuilder() {
  const [allQuestions, setAllQuestions] = useState([])
  const [questions, setQuestions] = useState([])
  const [papers, setPapers] = useState([])
  const [filters, setFilters] = useState({ subject: '', topic: '', difficulty: '', search: '' })
  const [paperMeta, setPaperMeta] = useState(() => ({ ...defaultPaperMeta }))
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [activePaperId, setActivePaperId] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [expandedRows, setExpandedRows] = useState(null)
  const [expandedSelectedQuestions, setExpandedSelectedQuestions] = useState({})
  const paperRef = useRef(null)
  //add use useeffect to get papers from local storage

  const totalMarks = useMemo(
    () => selectedQuestions.reduce((sum, question) => sum + Number(question.marks || 0), 0),
    [selectedQuestions],
  )

  const coveredSubjects = useMemo(
    () => [...new Set(selectedQuestions.map((question) => question.topic).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [selectedQuestions],
  )

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

  const loadAllQuestions = useCallback(async () => {
    try {
      const { data } = await api.get('/questions')
      setAllQuestions(data)
      // Set default subject to first available subject
      if (data.length > 0) {
        const subjects = [...new Set(data.map((question) => question.subject))].sort((a, b) => a.localeCompare(b))
        if (subjects.length > 0 && !filters.subject) {
          setFilters((current) => ({ ...current, subject: subjects[0], topic: '' }))
        }
      }
    } catch {
      setStatus({ type: 'error', message: 'Unable to load question categories. Start the API server and try again.' })
    }
  }, [filters.subject])

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
    void loadAllQuestions()
  }, [loadAllQuestions])

  useEffect(() => {
    void loadQuestions()
  }, [loadQuestions])

  useEffect(() => {
    void loadPapers()
  }, [loadPapers])

  function handleFilterChange(event) {
    const { name, value } = event.target

    setFilters((current) => {
      if (name === 'subject') {
        return { ...current, subject: value, topic: '' }
      }

      return { ...current, [name]: value }
    })
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

  function isQuestionSelected(questionId) {
    return selectedQuestions.some((item) => item.questionId === questionId)
  }

  function toggleQuestionSelection(question) {
    if (isQuestionSelected(question.id)) {
      removeQuestionFromPaper(question.id)
    } else {
      addQuestionToPaper(question)
    }
  }

  function toggleSelectedQuestionExpansion(questionId) {
    setExpandedSelectedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
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
      id: Date.now().toString(),
      ...paperMeta,
      questions: selectedQuestions,
    }
    //update saved paper when user clicks edit from papers list page

    try {
      const examPapers = JSON.parse(localStorage.getItem('exam_papers')) || []
      examPapers.push(payload)
      localStorage.setItem('exam_papers', JSON.stringify(examPapers))

      setStatus({ type: 'success', message: 'Exam paper saved locally.' })
      setPaperMeta(defaultPaperMeta);
      setSelectedQuestions([]);
      //scroll to top of page to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to save paper locally.' })
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

  const handlePrint = useReactToPrint({
    contentRef: paperRef,
    documentTitle: "Exam_Paper",
    pageStyle: `
    @page { size: A4; margin: 20mm; }
    .print-shell { font-family: 'Inter', sans-serif; color: black; }
    .paper-header { text-align: center; border-bottom: 2px solid #000; margin-bottom: 20px; }
    .paper-question-line { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .answer-key { page-break-before: always; border-top: 1px dashed #ccc; padding-top: 20px; }
    `
  });

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
              {data.options?.map((opt, index) => {
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
                <span className="label">Marks</span>
                <span className="value">{data.marks}</span>
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
            <p className="eyebrow">MERN exam generator</p>
            <h1>Create printable exam papers from your MCQ banks</h1>
            <p className="hero-copy">
              Browse subject-wise MCQ banks, choose a topic, curate a paper, and export a polished PDF.
            </p>
          </div>
          <div className="hero-actions">
            <button onClick={createNewPaper} title="Create a new exam paper">New paper</button>
            <button
              className="secondary"
              // onClick={() => window.print()}
              onClick={handlePrint}
              title="Print the current paper"
              disabled={selectedQuestions.length === 0}
            >
              Print paper
            </button>
            <button
              className="secondary"
              onClick={() => void downloadPdf()}
              title="Export paper as PDF file"
              disabled={selectedQuestions.length === 0}
            >
              Export PDF
            </button>
          </div>
        </header>

        {status.message ? <div className={`status ${status.type}`}>{status.message}</div> : null}


        <div className="workspace-grid">
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

            </div>
          </section>
        </div>




        <main className="workspace-grid">
          <section className="panel">
            <div className="panel-header">

              <h2>Question bank</h2>
              <span>{questions.length} questions</span>
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
                value={questions}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                stripedRows
                className="custom-table"
                dataKey="id"
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
              >
                <Column expander={true} style={{ width: '3rem' }} />
                <Column field="subject"></Column>
                <Column body={questionTemplate} style={{ width: '40%' }}></Column>
                <Column field="difficulty" body={difficultyTemplate}></Column>
                <Column field="marks"></Column>
                <Column
                  header="Action"
                  body={(rowData) => {
                    const selected = isQuestionSelected(rowData.id)
                    return (
                      <Button
                        icon={selected ? "pi pi-trash" : "pi pi-plus"}
                        label={selected ? "Remove" : "Add"}
                        className={`p-button-rounded p-button-outlined p-button-sm ${selected ? 'p-button-danger' : ''}`}
                        onClick={() => toggleQuestionSelection(rowData)}
                        title={selected ? "Remove this question from the paper" : "Add this question to the paper"}
                      />
                    )
                  }}
                  style={{ width: '15%' }}
                />
              </DataTable>
            </div>

          </section>


          <section className="builder-section">
            <div className="builder-header">
              <div>
                <h3>Selected questions</h3>
                <div className="builder-summary">
                  <span className="summary-item">
                    <strong>{selectedQuestions.length}</strong>
                    <small>Questions</small>
                  </span>
                  <span className="summary-item">
                    <strong>{totalMarks}</strong>
                    <small>Total Marks</small>
                  </span>
                </div>
              </div>
              <button
                onClick={() => void savePaper()}
                title="Save the exam paper"
                disabled={selectedQuestions.length === 0}
                className="save-paper-btn"
              >
                Save Paper
              </button>
            </div>
            <div className="builder-list">
              {selectedQuestions.map((question, index) => {
                const isExpanded = expandedSelectedQuestions[question.questionId]
                return (
                  <div className="builder-item" key={question.questionId}>
                    <div className="builder-item-header" onClick={() => toggleSelectedQuestionExpansion(question.questionId)}>
                      <div className="builder-item-title">
                        <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                        <strong>Q{index + 1}.</strong>
                        <span className="question-text">{question.text}</span>
                        <span className="question-marks">({question.marks}m)</span>
                      </div>
                      <div className="builder-actions">
                        <button className="secondary" onClick={(e) => { e.stopPropagation(); moveQuestion(index, -1); }} title="Move question up">
                          ↑
                        </button>
                        <button className="secondary" onClick={(e) => { e.stopPropagation(); moveQuestion(index, 1); }} title="Move question down">
                          ↓
                        </button>
                        <button className="danger" onClick={(e) => { e.stopPropagation(); removeQuestionFromPaper(question.questionId); }} title="Remove question from paper">
                          Remove
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="builder-item-details">
                        <div className="details-content">
                          <div className="detail-row">
                            <span className="label">Topic</span>
                            <span className="value">{question.topic}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Difficulty</span>
                            <span className="value difficulty-badge">{question.difficulty}</span>
                          </div>
                        </div>
                        {question.options?.length ? (
                          <div className="options-detail">
                            <div className="section-title">OPTIONS</div>
                            <ol className="option-list" type="A">
                              {question.options.map((option, optionIndex) => {
                                const isCorrect = question.answer === option;
                                return (
                                  <li key={`${question.questionId}-opt-${optionIndex}`} className={isCorrect ? 'correct-answer' : ''}>
                                    {option} {isCorrect && <span className="answer-indicator">✓</span>}
                                  </li>
                                );
                              })}
                            </ol>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </section>
        </main>



        <section className="panel preview-panel">
          <div className="panel-header">
            <h2>Print preview</h2>
            <span>{activePaperId ? 'Saved paper' : 'Unsaved draft'}</span>
          </div>

          <div className="print-shell" id="printable-area" ref={paperRef}>
            <div className="paper-header">
              <h2>{paperMeta.title}</h2>
              <div className="paper-meta">
                <span>Subject: {paperMeta.subject}</span>
                <span>Duration: {paperMeta.duration}</span>
                <span>Total marks: {totalMarks}</span>
                <span>Subjects Covered: {coveredSubjects.length > 0 ? coveredSubjects.join(', ') : 'None'}</span>
              </div>
              <p>{paperMeta.instructions}</p>
            </div>

            {/* /* Only to use for styled header */}
            {/* <div className="paper-header">
              <img src="/dnyandeep.png" alt="Logo" className="header-logo" />
              <div className="header-text">
                <h2>{paperMeta.title}</h2>
                <div className="paper-meta">
                  <span><strong>Subject:</strong> {paperMeta.subject}</span>
                  <span><strong>Duration:</strong> {paperMeta.duration}</span>
                  <span><strong>Total Marks:</strong> {totalMarks}</span>
                  <span><strong>Date:</strong> {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div> */}

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
  )
}
