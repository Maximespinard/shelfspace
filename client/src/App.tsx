import { Routes, Route } from 'react-router-dom';
import HomePage from './features/landing/components/HomePage';
import LoginPage from './features/auth/components/LoginPage';
import RegisterPage from './features/auth/components/RegisterPage';
import DashboardPage from './features/dashboard/components/DashboardPage';
import PublicLayout from './components/layout/PublicLayout';
import RequireAuth from './features/auth/components/RequireAuth';
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
