import { Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import DashboardPage from './components/dashboard/layout/DashboardPage';
import PublicLayout from './components/layout/PublicLayout';
import RequireAuth from './components/protected/RequireAuth';
import PrivateLayout from './components/layout/PrivateLayout';

function App() {
  return (
    <Routes>
      {/* Public layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Private layout */}
      <Route
        element={
          <RequireAuth>
            <PrivateLayout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
