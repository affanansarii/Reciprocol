import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login';
import { AuthContext } from './contexts/AuthContext';
import Protected from './Protected/Protected';
import ProjectList from './components/Projects/ProjectList';
import ProjectForm from './components/Projects/ProjectForm';
import Register from './components/Auth/Register';
import TaskList from './components/Projects/TaskList';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Protected />}>
          <Route path='/projects' element={
            <>
              {/* <ProjectForm /> */}
              <ProjectList />
            </>
          } />
          <Route path='/task/:projectId' element={
            <>
              <TaskList />
            </>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
