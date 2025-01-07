import Link from 'next/link'

const HorizontalNavbar = () => {
  return (
    <div>
      <nav className='*:p-2.5 mx-2.5 font-thin text-gray-500 flex justify-center w-full'>
        <Link href='/'>Home</Link>
        <Link href='/main'>Main courses</Link>
        <Link href='/soup'>Soups</Link>
        <Link href='/dessert'>Desserts</Link>
        <Link href='/salad'>Salads</Link>
      </nav>
    </div>
  )
}

export default HorizontalNavbar
