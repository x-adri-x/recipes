import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import MobileNavBar from './MobileNavBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AiOutlineMenu } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import HorizontalNavbar from './HorizontalNavBar'
import { useState } from 'react'

const Layout = ({ children }) => {
  const { data: session } = useSession()
  const isNotMobile = useMediaQuery('(min-width: 600px)')
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

  if (!session) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center w-full'>
        <p className='text-2xl font-medium mb-2'>Recipes</p>
        <p className='mb-6'>Please sign in to continue.</p>
        <form onSubmit={handleSubmit} className='flex flex-col p-4 w-full'>
          <label htmlFor='email' className='text-sm mb-2 mt-2'>
            Email
          </label>
          <input name='email' type='email' className='border p-2' />

          <label htmlFor='password' className='text-sm mb-2 mt-2'>
            Password
          </label>
          <input name='password' type='password' className='border p-2' />

          <button type='submit' className='p-2 mt-3'>
            Sign In
          </button>
        </form>
      </div>
    )
  }

  if (isNotMobile) {
    return (
      <div className='min-h-screen'>
        <div className='flex justify-between'>
          <Image src='/recipes-logo.png' alt='logo' width={163} height={163} />
          <HorizontalNavbar />
          <button
            className='border-solid border-[3px] rounded-[50%] w-[80px] h-[80px] border-black p-[10px]'
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className={`flex ${isMobileMenuOpen ? 'justify-start' : 'justify-between'}`}>
        <IconContext.Provider value={{ size: '2em' }}>
          <AiOutlineMenu onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </IconContext.Provider>
        {isMobileMenuOpen && <MobileNavBar />}
        {!isMobileMenuOpen && (
          <button
            className='border-solid border-[3px] rounded-[50%] w-[80px] h-[80px] border-black p-[10px]'
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </div>

      {children}
    </div>
  )
}

export default Layout
