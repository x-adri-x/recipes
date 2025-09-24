import { useSession, signIn } from 'next-auth/react'
import Header from '@/components/Header'
import MobileNavBar from '@/components/MobileNavBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { IoMenu } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
import HorizontalNavbar from '@/components/HorizontalNavBar'
import { useState } from 'react'
import Link from 'next/link'

const Layout = ({ children }) => {
  const { data: session, status } = useSession()
  const isNotMobile = useMediaQuery('(min-width: 720px)')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
    })
  }

  if (status !== 'authenticated') {
    return (
      <div className='bg-kitchen-design bg-cover bg-center p-4 min-h-screen flex flex-col justify-center items-center w-full'>
        <div className='flex flex-col items-center w-full py-8 bg-gray-100/50 rounded-3xl backdrop-blur-sm border border-zinc-100 max-w-[600px] mx-auto shadow-large'>
          <p className='text-5xl font-bold text-white'>Recipes</p>
          <p className='mb-4 text-lg text-white'>Please sign in to continue.</p>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col px-8 py-4 w-full [&_label]:text-sm [&_label]:font-medium [&_label]:my-2 min-w-[260px] [&_label]:text-white'
          >
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' className='border p-2 bg-white/20 rounded-full shadow-small' />

            <label htmlFor='password'>Password</label>
            <input name='password' type='password' className='border p-2 bg-white/20 rounded-full shadow-small' />

            <button
              type='submit'
              className='p-2 mt-8 bg-white/20 rounded-full font-medium uppercase tracking-[2.5px] text-white shadow-large'
            >
              Sign In
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
