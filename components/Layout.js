import Navbar from './Navbar'
import { useSession, signIn } from 'next-auth/react'

const Layout = ({ children }) => {
  const { data: session } = useSession()

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

  return (
    <div className='min-h-screen'>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
