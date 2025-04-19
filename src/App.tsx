import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import { useAuthContext } from './auth/AuthContext';
import LoadingSpinner from './components/LoadingSpinner'; // Crie este componente
import ProjectDetail from './pages/ProjectDetail';
import Layout from './components/Layout';
import EditProject from './pages/EditProject';
import SignupForm from './auth/SignupForm';
import Home from './pages/Home';

function App() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingSpinner />; // Exibe um spinner enquanto carrega
  }

  return (
    <Routes>
      <Route path="/"
        element={<Layout>{<Home />}</Layout>}
      />
      <Route path="/login"
        element={<Layout>{!user ? <LoginForm /> : <Navigate to="/" replace />}</Layout>}
      />
      <Route
        path="/projects"
        element={<Layout>{user ? <Projects /> : <Navigate to="/login" replace />}</Layout>}
      />
      <Route
        path="/projects/new"
        element={<Layout>{user ? <NewProject /> : <Navigate to="/login" replace />}</Layout>}
      />
      <Route
        path="/projects/:id"
        element={<Layout>{user ? <ProjectDetail /> : <Navigate to="/login" replace />}</Layout>}
      />
      <Route
        path="/projects/:id/edit"
        element={<Layout>{user ? <EditProject /> : <Navigate to="/login" replace />}</Layout>}
      />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="*" element={<Navigate to="/projects" />} />
    </Routes>
  );
}

export default App;