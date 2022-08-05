import PageLayout from "../../components/PageLayout";

export async function getStaticProps() {
    const res = await fetch(`${process.env.DEV_HOST}/api/recipes/soup`)
    const data = await res.json()

    return {
        props: {
            recipes: data.recipes
        }
    }
}

const Soup = ({recipes}) => {
    return ( 
        <div>
            <h1>Soup</h1>
            <PageLayout props = {recipes} />
        </div>
     );
}
 
export default Soup;