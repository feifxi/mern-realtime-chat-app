import { Route, Routes, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js';
import TicTacToe from './pages/TicTacToe.jsx'

export default function App() {
  const { authUser, checkAuth, isCheckingAuth }  = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className='flex justify-center items-center h-screen'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )

  return (
    <main data-theme={theme}>
      <Navbar />
      <div className="min-h-screen pt-[65px] bg-base-200 transition">
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
          <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' /> } />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' /> } />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' /> } />
          <Route path='/game' element={authUser ? <TicTacToe /> : <Navigate to='/login' /> } />
        </Routes>
      </div>
      <Toaster />
    </main>
  );
}