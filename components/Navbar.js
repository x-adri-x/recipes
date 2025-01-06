import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import MobileNavbar from './MobileNavbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AiOutlineMenu } from 'react-icons/ai'
import { IconContext } from 'react-icons'

const Navbar = () => {
  const { data: session } = useSession()
  const matches = useMediaQuery('(min-width: 600px)')

  const showResponsiveMenu = () => {
    const displayed = document.getElementById('mobile-navbar').style.display
    displayed === 'none'
      ? (document.getElementById('mobile-navbar').style.display = 'block')
      : (document.getElementById('mobile-navbar').style.display = 'none')
  }

  return matches ? (
    <div className='flex'>
      <Image src='/recipes-logo.png' alt='logo' width={163} height={163} />
      <nav className='mx-2.5 font-thin text-gray-500 flex justify-center w-full'>
        <Link className='p-2.5' href='/'>
          Home
        </Link>
        <Link className='p-2.5' href='/main'>
          Main courses
        </Link>
        <Link className='p-2.5' href='/soup'>
          Soups
        </Link>
        <Link className='p-2.5' href='/dessert'>
          Desserts
        </Link>
        <Link className='p-2.5' href='/salad'>
          Salads
        </Link>
      </nav>
      {session ? (
        <button
          className='border-solid border-[3px] rounded-[50%] w-[80px] h-[80px] border-black p-[10px]'
          onClick={() => signOut()}
        >
          Logout
        </button>
      ) : null}
    </div>
  ) : (
    <div>
      <IconContext.Provider value={{ size: '2em' }}>
        <AiOutlineMenu onClick={() => showResponsiveMenu()} />
      </IconContext.Provider>
      <MobileNavbar />
    </div>
  )
}

export default Navbar
