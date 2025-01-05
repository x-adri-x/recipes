import Navbar from './Navbar'
import { useSession, signIn } from 'next-auth/react'
import styles from '../styles/Login.module.css'

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
      <div>
        <p className={styles.message}>You are currently not signed in.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor='email' className={styles.label}>
            Email
          </label>
          <input name='email' type='email' className={styles.input} />

          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <input name='password' type='password' className={styles.input} />

          <button type='submit'>Sign In</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
