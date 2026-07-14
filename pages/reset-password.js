import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { resetPassword } from '../lib/auth-client'

export default function ResetPassword() {
  const router = useRouter()
  const { token } = router.query
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    setError('')

    if (!token) {
      setError('Missing or invalid reset link.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    const { error } = await resetPassword({ newPassword: password, token })
    setIsSubmitting(false)

    if (error) {
      setError(error.message ?? 'Could not reset password.')
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className='bg-kitchen-design bg-cover bg-center p-4 min-h-screen flex flex-col justify-center items-center w-full'>
      <div className='flex flex-col items-center w-full py-8 bg-gray-100/50 rounded-3xl backdrop-blur-sm border border-zinc-100 max-w-[600px] mx-auto shadow-large'>
        <p className='text-5xl font-bold text-white'>Recipes</p>

        {success ? (
          <>
            <p className='mb-4 text-lg text-white text-center px-8'>
              Your password has been reset. You can now sign in.
            </p>
            <Link href='/' className='text-white underline text-sm'>
              Back to sign in
            </Link>
          </>
        ) : (
          <>
            <p className='mb-4 text-lg text-white'>Choose a new password.</p>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col px-8 py-4 w-full [&_label]:text-sm [&_label]:font-medium [&_label]:my-2 min-w-[260px] [&_label]:text-white'
            >
              <label htmlFor='password'>New password</label>
              <input
                id='password'
                name='password'
                type='password'
                required
                autoComplete='new-password'
                className='border p-2 bg-white/20 rounded-full shadow-small'
              />

              <label htmlFor='confirmPassword'>Confirm password</label>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                required
                autoComplete='new-password'
                className='border p-2 bg-white/20 rounded-full shadow-small'
              />

              {error && <p className='mt-4 text-sm text-red-300'>{error}</p>}

              <button
                type='submit'
                disabled={isSubmitting}
                className='p-2 mt-8 bg-white/20 rounded-full font-medium uppercase tracking-[2.5px] text-white shadow-large disabled:opacity-50'
              >
                {isSubmitting ? 'Resetting…' : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
