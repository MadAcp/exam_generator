import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import QuestionManagementPage from './pages/QuestionManagementPage'
import PaperBuilderPage from './pages/PaperBuilderPage'
import PapersListPage from './pages/PapersListPage'
import Questions from './pages/Questions'
import PaperBuilder from './pages/PaperBuilder'
import ViewPaper from './pages/ViewPaper'

function App() {
 

  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<Questions />} />
          {/* <Route path="/questions" element={<QuestionManagementPage />} /> */}
          {/* <Route path="/builder" element={<PaperBuilderPage />} /> */}
          <Route path="/builder" element={<PaperBuilder />} />
          <Route path="/papers" element={<PapersListPage />} />
        </Route>
        <Route path="/paper/:paperId" element={<ViewPaper />} />
      </Routes>
    </Router>
   
    </>
  );
}


export default App;
