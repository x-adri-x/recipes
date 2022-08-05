import PageLayout from "../../components/PageLayout";

export async function getStaticProps() {
    const res = await fetch(`${process.env.DEV_HOST}/api/recipes/main`)
    const data = await res.json()

    return {
        props: {
            recipes: data.recipes
        }
    }
}

const MainCourse = ({recipes}) => {
    return ( 
        <div>
            <h1>Main Course</h1>
            <PageLayout props = {recipes} />
        </div>
     );
}
 
export default MainCourse;