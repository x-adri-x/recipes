import Link from 'next/link'
import { MdLogout } from 'react-icons/md'

const HorizontalNavbar = () => {
  return (
    <nav className='*:p-2.5 justify-around [&_a]:font-extrabold text-sm text-black [&_a]:uppercase flex border-b-[1px] border-black py-2 h-fit tracking-[1.5px] mx-4'>
      <button onClick={() => signOut()}>
        <MdLogout size='1.5rem' />
      </button>
      <p>|</p>
      <p className='italic'>browse by category:</p>
      <Link href='/main'>Main</Link>
      <Link href='/soup'>Soups</Link>
      <Link href='/dessert'>Desserts</Link>
      <Link href='/salad'>Salads</Link>
    </nav>
  )
}

export default HorizontalNavbar
