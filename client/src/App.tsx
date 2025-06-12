import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/Home';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register';
import DashboardPage from './components/pages/Dashboard';
import PublicLayout from './components/layout/PublicLayout';
import RequireAuth from './components/auth/RequireAuth';
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
        {/* Plus tard : <Route path="/items" element={<ItemList />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
