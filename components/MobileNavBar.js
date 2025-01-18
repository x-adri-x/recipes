import Link from 'next/link'
import { MdLogout } from 'react-icons/md'
import { signOut } from 'next-auth/react'

const MobileNavBar = ({ setIsMobileMenuOpen }) => {
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className='*:p-2.5 justify-start [&_a]:font-normal [&_a]:border-b-[1px] [&_a]:border-b-slate-100 text-sm text-black [&_a]:uppercase w-full [&_a]:py-6 h-fit tracking-[1.5px] flex flex-col min-h-screen'>
      <button onClick={() => signOut()}>
        <MdLogout size='1.5rem' />
      </button>
      <Link href='/main' onClick={handleMenuItemClick}>
        Main
      </Link>
      <Link href='/soup' onClick={handleMenuItemClick}>
        Soups
      </Link>
      <Link href='/dessert' onClick={handleMenuItemClick}>
        Desserts
      </Link>
      <Link href='/salad' onClick={handleMenuItemClick}>
        Salads
      </Link>
    </nav>
  )
}

export default MobileNavBar
