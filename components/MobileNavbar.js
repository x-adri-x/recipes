import Link from 'next/link'
import styles from '../styles/MobileNavbar.module.css'

const MobileNavbar = () => {
  return (
    <div className={styles.mobile_header} id='mobile-navbar'>
      <div className={styles.mobile_links}>
        <Link href='/main'>Main courses</Link>
        <Link href='/soup'>Soups</Link>
        <Link href='/dessert'>Desserts</Link>
        <Link href='/salad'>Salads</Link>
        <Link href='/' className={styles.home}>
          Home
        </Link>
      </div>
    </div>
  )
}

export default MobileNavbar
