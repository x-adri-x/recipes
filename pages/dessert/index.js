import PageLayout from '../../components/PageLayout'

export async function getStaticProps() {
  const recipes = await fetch(
    `${process.env.CONTENTFUL_HOST}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries` +
      `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=dessert`
  )
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Failed to fetch data.')
      }
    })
    .catch((error) => console.log(error))

  return {
    props: {
      recipes: recipes,
    },
  }
}

const Desserts = ({ recipes }) => {
  return (
    <div>
      <h1 className='md:text-3xl text-xl font-medium uppercase text-center mb-6'>Desserts</h1>
      <PageLayout props={recipes} />
    </div>
  )
}

export default Desserts
