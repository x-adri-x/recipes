import Navbar from "./Navbar";
import {useSession, signIn} from 'next-auth/react'
import styles from '../styles/Home.module.css'

const Layout = ({children}) => {
    const {data: session} = useSession()

    if(!session){
        return(
            <div>
                <Navbar />
                <p className = {styles.message}>You are currently not signed in.</p>
                <button className = {styles.googleButton} onClick={() => signIn()}>Sign in with Google</button>
            </div>
        )
    }

    return ( 
        <div>
            <Navbar />
            { children }
        </div>
     );
}
 
export default Layout;