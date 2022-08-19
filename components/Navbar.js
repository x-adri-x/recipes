import Link from "next/link"
import Image from "next/image"
import {useSession, signOut} from 'next-auth/react'
import MobileNavbar from "./MobileNavbar"
import useMediaQuery from "@mui/material/useMediaQuery"
import { AiOutlineMenu } from "react-icons/ai"
import { IconContext } from "react-icons"

const Navbar = () => {
    const {data: session} = useSession()
    const matches = useMediaQuery('(min-width: 600px)')

    const showResponsiveMenu = () => {
        const displayed = document.getElementById('mobile-navbar').style.display
        displayed === 'none' ? document.getElementById('mobile-navbar').style.display = 'block'
        : document.getElementById('mobile-navbar').style.display = 'none'
    }

    return ( 
       
        matches ? 
        <div className = 'header'>
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
        :
        <div>
            <IconContext.Provider value = {{size: '2em'}}>
                <AiOutlineMenu onClick = {() => showResponsiveMenu()}/>
            </IconContext.Provider>
            <MobileNavbar />
        </div>
        
     );
}
 
export default Navbar;