import Link from 'next/link'

const MobileNavbar = () => {
  return (
    <div className='hidden my-6' id='mobile-navbar'>
      <div className='grid grid-cols-2 tracking-widest text-center text-base uppercase font-thin'>
        <Link className='border border-dotted p-9 border-gray-700' href='/main'>
          Main courses
        </Link>
        <Link className='border border-dotted p-9 border-gray-700' href='/soup'>
          Soups
        </Link>
        <Link className='border border-dotted p-9 border-gray-700' href='/dessert'>
          Desserts
        </Link>
        <Link className='border border-dotted p-9 border-gray-700' href='/salad'>
          Salads
        </Link>
        <Link className='border border-dotted p-9 col-span-2 border-gray-700' href='/'>
          Home
        </Link>
      </div>
    </div>
  )
}

export default MobileNavbar
