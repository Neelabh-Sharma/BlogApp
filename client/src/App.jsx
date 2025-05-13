import { Suspense, lazy } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'
const Home  = lazy(() => import('./pages/Index'));
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
function App() {
  const isLogin = true;
  return (
    <Suspense fallback={<LoadingSpinner/>}>
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home/>} />
        <Route path='/signin'element={<SignInForm/>} />
        <Route path='/signup'element={<SignUpForm/>} />
        <Route path='/contact'element={<ContactForm/>} />
        <Route path='/forgetpassword'element={<ForgetPassword/>} />
        {/* Auth routes */}
        <Route path='/dashboard'element={isLogin ?<Dashboard/>:<SignInForm/>} />
        <Route path='/earning'element={isLogin ?<Earning/>:<SignInForm/>} />
        <Route path='/help'element={isLogin ?<Help/>:<SignInForm/>} />
        <Route path='/setting'element={isLogin ?<Setting/>:<SignInForm/>} />
        <Route path='/writeblog'element={isLogin ?<Writeblog/>:<SignInForm/>} />
        <Route path='/yourblog'element={isLogin ?<YourBlog/>:<SignInForm/>} />
      </Routes>
    </BrowserRouter>
    </Suspense>
  )
}

export default App