import PageLayout from "../../components/PageLayout";

export async function getStaticProps() {
    // const res = await fetch(`${process.env.DEV_HOST}/api/recipes/main`)
    // const data = await res.json()
    const recipes = 
    await fetch(`${process.env.CONTENTFUL_HOST}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries`
    + `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=main`)
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error('Failed to fetch data.')
        }
    })
    .catch(error => console.log(error))

    return {
        props: {
            recipes: recipes
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