import Recipe from '../../components/Recipe'

export async function getStaticPaths() {
    const res = await fetch(`http://recipes-e1wavqmzd-x-adri-x.vercel.app/api/recipes/dessert`)
    const data = await res.json()

    const paths = data.recipes.items.map(recipe => {
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
    const recipe = context.params.recipe
    const res = await fetch(`http://recipes-e1wavqmzd-x-adri-x.vercel.app/api/recipe/${recipe}?content_type=dessert`)
    const data = await res.json()

    return {
        props: {
            recipe: data.recipe
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