import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

const Home = lazy(() => import('./pages/Index'));
const SignInForm = lazy(() => import('./pages/SignIn'));
const SignUpForm = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/auth/Dashboard'));
const Earning = lazy(() => import('./pages/auth/Earning'));
const Help = lazy(() => import('./pages/auth/Help'));
const Setting = lazy(() => import('./pages/auth/Setting'));
const WriteBlog = lazy(() => import('./pages/auth/WriteBlog'));
const YourBlog = lazy(() => import('./pages/auth/YourBlog'));
const ContactForm = lazy(() => import('./pages/Contact'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const ReadBlog = lazy(() => import('./pages/ReadBlog'));

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        setIsLogin(!!e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/signin'
            element={
              isLogin ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <SignInForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path='/signup'
            element={
              isLogin ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <SignUpForm onLogin={handleLogin} />
              )
            }
          />
          <Route path='/contact' element={<ContactForm />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/readblog' element={<ReadBlog />} />

          {/* Protected Routes */}
          <Route
            path='/dashboard'
            element={
              isLogin ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path='/earning'
            element={
              isLogin ? (
                <Earning onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path='/help'
            element={
              isLogin ? (
                <Help onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path='/setting'
            element={
              isLogin ? (
                <Setting onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path='/writeblog'
            element={
              isLogin ? (
                <WriteBlog onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path='/yourblog'
            element={
              isLogin ? (
                <YourBlog onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
