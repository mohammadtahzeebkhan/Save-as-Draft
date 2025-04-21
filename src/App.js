// App.jsx or wherever your routes are defined
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import AnswerEditor from './Draft';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      
        <Route path="/:draftId/:slugId" element={<AnswerEditor />} />

      </Routes>
    </Router>
  );
}

export default App;
