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
const Writeblog = lazy(() => import('./pages/auth/WriteBlog'));
const YourBlog = lazy(() => import('./pages/auth/YourBlog'));
const ContactForm = lazy(() => import('./pages/Contact'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const ReadBlog = lazy(() => import('./pages/ReadBlog'));

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token); // if token exists, set true
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignInForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/contact' element={<ContactForm />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/readblog' element={<ReadBlog />} />

          {/* Protected routes */}
          <Route path='/dashboard' element={isLogin ? <Dashboard /> : <Navigate to="/signin" />} />
          <Route path='/earning' element={isLogin ? <Earning /> : <Navigate to="/signin" />} />
          <Route path='/help' element={isLogin ? <Help /> : <Navigate to="/signin" />} />
          <Route path='/setting' element={isLogin ? <Setting /> : <Navigate to="/signin" />} />
          <Route path='/writeblog' element={isLogin ? <Writeblog /> : <Navigate to="/signin" />} />
          <Route path='/yourblog' element={isLogin ? <YourBlog /> : <Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
