import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import HomePage from './components/home.jsx';
import Degrees from './components/degrees.jsx';
import NewDegree from './components/newdegree.jsx';
import Cohorts from './components/cohorts.jsx';
import SingleDegree from './components/singledegree.jsx';
import NewCohort from './components/newcohort.jsx';
import SingleCohort from './components/singlecohort.jsx';
import Modules from './components/modules.jsx';
import NewModule from './components/newmodule.jsx';
import SingleModule from './components/singlemodule.jsx';
import SingleStudent from './components/singlestudent.jsx';
import NewStudent from './components/newstudent.jsx';
import NewGrade from './components/newgrade.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/degrees">All Degrees</Link>
            <Link to="/cohorts">All Cohorts</Link>
            <Link to="/modules">All Modules</Link>
            <Link to="/students/89155005/">Student</Link>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/degrees" element={<Degrees />} />
            <Route path="/degrees/newdegree" element={<NewDegree />} />
            <Route path="/cohorts" element={<Cohorts />} />
            <Route path="degrees/:id" element={<SingleDegree/>} />
            <Route path="/degrees/newcohort" element={<NewCohort />} />
            <Route path="cohorts/:id" element={<SingleCohort/>} />
            <Route path="/modules" element={<Modules />} />
            <Route path="modules/newmodule" element={<NewModule/>} />
            <Route path="modules/:code" element={<SingleModule/>} />
            <Route path="students/:student_id" element={<SingleStudent/>} />
            <Route path="students/newstudent" element={<NewStudent/>} />
            <Route path="grade" element={<NewGrade/>} />
          </Routes>

        </header>
      </div>
    </Router>
  );
}

export default App;
