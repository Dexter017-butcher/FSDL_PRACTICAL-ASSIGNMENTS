import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar       from './components/Navbar';
import Home         from './pages/Home';
import Login        from './pages/Login';
import Register     from './pages/Register';
import BookDetail   from './pages/BookDetail';
import SellBook     from './pages/SellBook';
import MyListings   from './pages/MyListings';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar />
          <div className="container page-fade">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/login"       element={<Login />} />
              <Route path="/register"    element={<Register />} />
              <Route path="/books/:id"   element={<BookDetail />} />
              <Route path="/sell"        element={<PrivateRoute><SellBook /></PrivateRoute>} />
              <Route path="/my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
            </Routes>
          </div>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
