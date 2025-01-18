import PageLayout from '@/components/PageLayout'
import Heading from '@/components/Heading'

export async function getStaticProps() {
  const recipes = await fetch(
    `${process.env.CONTENTFUL_HOST}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries` +
      `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=soup`
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

const Soup = ({ recipes }) => {
  return (
    <div>
      <Heading title='Soups' />
      <PageLayout props={recipes} />
    </div>
  )
}

export default Soup
