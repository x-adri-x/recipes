import Link from 'next/link'

const MobileNavbar = () => {
  return (
    <div className='my-6' id='mobile-navbar'>
      <nav className='*:border *:border-dotted *:p-9 *:border-gray-700 grid grid-cols-2 tracking-widest text-center sm:text-base text-sm uppercase font-thin'>
        <Link href='/main'>Main courses</Link>
        <Link href='/soup'>Soups</Link>
        <Link href='/dessert'>Desserts</Link>
        <Link href='/salad'>Salads</Link>
        <Link className='col-span-2' href='/'>
          Home
        </Link>
      </nav>
    </div>
  )
}

export default MobileNavbar
