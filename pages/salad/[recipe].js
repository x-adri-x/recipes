import Recipe from '../../components/Recipe'

export async function getStaticPaths() {
    // const res = await fetch('/api/recipes/salad')
    // const data = await res.json()
    const data = 
    await fetch(`${process.env.CONTENTFUL_HOST}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries`
    + `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=salad`)
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error('Failed to fetch data.')
        }
    })
    .catch(error => console.log(error))

    const paths = data.items.map(recipe => {
        return {
            params: {recipe: recipe.fields.slug}
        }
    })
    
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const slug = context.params.recipe
    // const res = await fetch(`/api/recipe/${recipe}?content_type=salad`)
    // const data = await res.json()
    const recipe = 
    await fetch(`${process.env.CONTENTFUL_HOST}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries`
    + `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=salad&select=fields&fields.slug=${slug}`)
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
            recipe: recipe
        }
    }
}


const RecipeDetail = ({recipe}) => {

    return (
        <div>
            <h1>Recipe details</h1>
            <Recipe recipe = {recipe} />
        </div>
    );
}
 
export default RecipeDetail;