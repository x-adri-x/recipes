import PageLayout from "../../components/PageLayout";

export async function getStaticProps() {
    const res = await fetch(`${process.env.DEV_HOST}/api/recipes/salad`)
    const data = await res.json()

    return {
        props: {
            recipes: data.recipes
        }
    }
}

const Salad = ({recipes}) => {
    return ( 
        <div>
            <h1>Salads</h1>
            <PageLayout props = {recipes} />
        </div>
     );
}
 
export default Salad;