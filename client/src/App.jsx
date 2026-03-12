import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import QuestionManagementPage from './pages/QuestionManagementPage'
import PaperBuilderPage from './pages/PaperBuilderPage'
import PapersListPage from './pages/PapersListPage'
import Questions from './pages/Questions'

function App() {
 

  return (
    <>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<Questions />} />
          {/* <Route path="/questions" element={<QuestionManagementPage />} /> */}
          <Route path="/builder" element={<PaperBuilderPage />} />
          <Route path="/papers" element={<PapersListPage />} />
        </Routes>
      </Layout>
    </Router>
   
    </>
  );
}


export default App;
