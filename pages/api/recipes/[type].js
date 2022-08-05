export default async function handler(req, res) {
    const { type } = req.query
    const recipes = await fetch(`${process.env.CONTENTFUL_HOST}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=${type}`)
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error('Failed to fetch data.')
        }
    })
    .catch(error => console.log(error))
    res.status(200).json({ recipes })
  }