import PageLayout from "../../components/PageLayout";

export async function getStaticProps() {
    const res = await fetch(`${process.env.DEV_HOST}/api/recipes/dessert`)
    const data = await res.json()

    return {
        props: {
            recipes: data.recipes
        }
    }
}

const Desserts = ({recipes}) => {
    return ( 
        <div>
            <h1>Desserts</h1>
            <PageLayout props = {recipes}/>
        </div>
     );
}
 
export default Desserts;