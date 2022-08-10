import Link from "next/link";
import Image from "next/image";
import {useSession, signOut} from 'next-auth/react'

const Navbar = () => {
    const {data: session} = useSession()

    return ( 
        <div className = 'logo-container'>
            <Image src = '/recipes-logo.png' alt = 'logo' width = {163} height = {163}/>
            <nav>
            <Link href = '/'><a>Home</a></Link>
            <Link href = '/main'><a>Main courses</a></Link>
            <Link href = '/soup'><a>Soups</a></Link>
            <Link href = '/dessert'><a>Desserts</a></Link>
            <Link href = '/salad'><a>Salads</a></Link>
            </nav>
            {session ?  <button className = 'logoutButton' onClick={() => signOut()}>Logout</button> : null}
        </div>
        
     );
}
 
export default Navbar;