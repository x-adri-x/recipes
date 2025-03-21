import Image from 'next/image'
import Heading from '@/components/Heading'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

const Recipe = (props) => {
  const fields = props.recipe.items[0].fields
  const method = fields.method.content
  const method_assets = method.filter((n) => n.nodeType == 'embedded-asset-block')
  if (method_assets.length > 0) {
    for (const asset of method_assets) {
      const id = asset.data.target.sys.id
      const asset_field = props.recipe.includes.Asset.filter((asset) => asset.sys.id == id)
      const fields = asset_field[0].fields
      asset.data.target = { ...asset.data.target, fields }
    }
  }
  const ingredientsSorted = fields?.ingredientsSorted?.content

  const options = {
    renderNode: {
      [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className='mb-4'>{children}</li>,
      [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
      [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
        <Image
          src={`https://${node.data.target.fields.file.url}`}
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
          alt=''
        />
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
          {node.content[0].value}
        </a>
      ),
    },
  }

  const bannerUrl = props.recipe.includes.Asset.filter((asset) => asset.sys.id == fields.banner.sys.id)
  const ingredients = fields.ingredients
    ? fields.ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient}</li>
      })
    : ingredientsSorted.map((n) => {
        return documentToReactComponents(n, options)
      })

  return (
    <div className='flex flex-col items-center px-6 bg-white text-slate-800 font-normal max-w-[960px] mx-auto border-x-[1px] border-x-gray-300'>
      <Heading title={fields.title} />
      <div className='p-6 border-t-2 border-black max-w-screen-sm'>
        <Image
          src={'https:' + bannerUrl[0].fields.file.url}
          alt={bannerUrl[0].fields.title}
          width={bannerUrl[0].fields.file.details.image.width}
          height={bannerUrl[0].fields.file.details.image.height}
        />
      </div>
      <div className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
        <div className='flex flex-col leading-8 my-4'>
          <h2 className='mb-4 text-lg font-bold'>Ingredients</h2>
          {ingredients}
        </div>
        <div>
          <h2 className='mb-4 text-lg font-bold mt-4'>Method</h2>
          {method.map((n) => documentToReactComponents(n, options))}
        </div>
      </div>
    </div>
  )
}

export default Recipe
