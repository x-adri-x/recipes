import { useSession, signIn, requestPasswordReset } from '../lib/auth-client'
import Header from '@/components/Header'
import { useRef } from 'react'
import MobileNavBar from '@/components/MobileNavBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { IoMenu } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
import HorizontalNavbar from '@/components/HorizontalNavBar'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [signInError, setSignInError] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [resetMessage, setResetMessage] = useState('')
  const [isSendingReset, setIsSendingReset] = useState(false)
  const isNotMobile = useMediaQuery('(min-width: 720px)')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    setSignInError('')
    setResetMessage('')
    setIsSigningIn(true)

    const { error } = await signIn.email({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    setIsSigningIn(false)
    if (error) {
      setSignInError(error.message ?? 'Invalid email or password.')
    }
  }

  const handleForgotPassword = async () => {
    const email = formRef.current?.email.value

    setSignInError('')
    setResetMessage('')

    if (!email) {
      setSignInError('Enter your email above, then click "Forgot password?"')
      return
    }

    setIsSendingReset(true)
    const { error } = await requestPasswordReset({ email, redirectTo: '/reset-password' })
    setIsSendingReset(false)

    if (error) {
      setSignInError(error.message ?? 'Could not send reset link.')
    } else {
      setResetMessage('If that email has an account, a reset link has been sent.')
    }
  }

  if (router.pathname === '/reset-password') {
    return children
  }

  if (!session) {
    return (
      <div className='bg-kitchen-design bg-cover bg-center p-4 min-h-screen flex flex-col justify-center items-center w-full'>
        <div className='flex flex-col items-center w-full py-8 bg-gray-100/50 rounded-3xl backdrop-blur-sm border border-zinc-100 max-w-[600px] mx-auto shadow-large'>
          <p className='text-5xl font-bold text-white'>Recipes</p>
          <p className='mb-4 text-lg text-white'>Please sign in to continue.</p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='flex flex-col px-8 py-4 w-full [&_label]:text-sm [&_label]:font-medium [&_label]:my-2 min-w-[260px] [&_label]:text-white'
          >
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              required
              autoComplete='email'
              className='border p-2 bg-white/20 rounded-full shadow-small'
            />

            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              required
              autoComplete='current-password'
              className='border p-2 bg-white/20 rounded-full shadow-small'
            />

            <button
              type='button'
              onClick={handleForgotPassword}
              disabled={isSendingReset}
              className='self-end mt-2 text-xs text-white/80 underline disabled:opacity-50'
            >
              {isSendingReset ? 'Sending…' : 'Forgot password?'}
            </button>

            {signInError && <p className='mt-4 text-sm text-red-500'>{signInError}</p>}
            {resetMessage && <p className='mt-4 text-sm text-green-300'>{resetMessage}</p>}

            <button
              type='submit'
              disabled={isSigningIn}
              className='p-2 mt-8 bg-white/20 rounded-full font-medium uppercase tracking-[2.5px] text-white shadow-large disabled:opacity-50'
            >
              {isSigningIn ? 'Signing In…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (isNotMobile) {
    return (
      <div className='min-h-screen'>
        <div className='border-b-4 border-black mx-4'>
          <Header>
            <Link href='/'>
              <div className='text-5xl font-bold text-black font-spartan uppercase flex flex-col justify-center text-center tracking-widest'>
                Food App
              </div>
            </Link>
          </Header>
        </div>

        <HorizontalNavbar />
        {children}
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className='flex justify-between items-center border-b-4 border-black mx-3 mb-4'>
        {!isMobileMenuOpen ? (
          <IoMenu size='1.5rem' className='ml-2 mb-3' onClick={() => setIsMobileMenuOpen(true)} />
        ) : (
          <IoClose size='1.5rem' onClick={() => setIsMobileMenuOpen(false)} />
        )}
        <Header isMobile={true}>
          <Link href='/'>
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className='text-3xl font-normal text-black font-spartan uppercase flex flex-col justify-center text-center tracking-widest'
            >
              Food App
            </div>
          </Link>
        </Header>
      </div>

      {isMobileMenuOpen && <MobileNavBar setIsMobileMenuOpen={setIsMobileMenuOpen} />}
      {children}
    </div>
  )
}

export default Layout
