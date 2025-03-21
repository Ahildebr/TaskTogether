import "./CssStyling/App.css";
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext.jsx';
import { BoardProvider } from '../context/BoardsContext.jsx';
import Navbar from './Navbar.jsx'
import SignupForm from './SignupForm.jsx';
import LandingPage from './LandingPage.jsx';
import LoginForm from './LoginForm.jsx';
import Dashboard from './Dashboard.jsx';
import BoardPage from './BoardPage.jsx';
import BoardsPage from './BoardsPage.jsx';
import NewBoardPage from "./NewBoardPage.jsx";
import { TaskProvider } from "../context/TasksContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BoardProvider>
          <TaskProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/boards" element={<BoardsPage />} />
              <Route path="/boards/:board_id" element={<BoardPage />} />
              <Route path="/new-board" element={<NewBoardPage />} />
            </Routes>
          </TaskProvider>
        </BoardProvider>
      </AuthProvider>
    </>
  );
}

export default App
