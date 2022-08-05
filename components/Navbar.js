import Link from "next/link";

const Navbar = () => {
    return ( 
        <nav>
            <Link href = '/'><a>Home</a></Link>
            <Link href = '/main'><a>Main courses</a></Link>
            <Link href = '/soup'><a>Soups</a></Link>
            <Link href = '/dessert'><a>Desserts</a></Link>
            <Link href = '/salad'><a>Salads</a></Link>
        </nav>
     );
}
 
export default Navbar;