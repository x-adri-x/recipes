import PageLayout from '@/components/PageLayout'
import Heading from '@/components/Heading'
import { useQuery } from '@tanstack/react-query'

// export async function getStaticProps() {
//   const recipes = await fetch(
//     `${process.env.CONTENTFUL_HOST}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries` +
//       `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=main`
//   )
//     .then((response) => {
//       if (response.ok) {
//         return response.json()
//       } else {
//         throw new Error('Failed to fetch data.')
//       }
//     })
//     .catch((error) => console.log(error))

//   return {
//     props: {
//       recipes: recipes,
//     },
//   }
// }

const MainCourse = ({ recipes }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['recipes', 'main'],
    queryFn: fetchData,
    initialData: recipes,
  })
  const fetchData = async () => {
    const result = await fetch(
      `${process.env.CONTENTFUL_HOST}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries` +
        `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=main`
    ).then((response) => response.json())

    return result
  }

  if (isLoading) return <div>Loading...</div>
  if (error)
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    )

  return (
    <>
      <Heading title='Main Course Recipes' />
      <PageLayout props={data?.recipes} />
    </>
  )
}

export default MainCourse
