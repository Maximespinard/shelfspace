import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import PublicLayout from './components/layout/PublicLayout';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        }
      />

      {/* Future routes */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/register" element={<RegisterPage />} /> */}
    </Routes>
  );
}

export default App;
