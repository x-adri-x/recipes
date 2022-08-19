import Link from 'next/link'
import Image from "next/image"
import {useSession, signOut} from 'next-auth/react'
import styles from '../styles/MobileNavbar.module.css'

const MobileNavbar = () => {
    return(
        <div className = {styles.mobile_header} id = 'mobile-navbar'>
            <div className = {styles.mobile_links}>
            <Link href = '/main'><a>Main courses</a></Link>
            <Link href = '/soup'><a>Soups</a></Link>
            <Link href = '/dessert'><a>Desserts</a></Link>
            <Link href = '/salad'><a>Salads</a></Link>
            <Link href = '/'><a className = {styles.home}>Home</a></Link>
            </div>
        </div>
        
    )
}

export default MobileNavbar