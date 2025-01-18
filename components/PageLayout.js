import Thumbnail from '@/components/Thumbnail'

const PageLayout = ({ props }) => {
  const Assets = props.includes?.Asset
  const items = props.items

  return (
    <div className='grid lg:grid-cols-5 min-[820px]:grid-cols-4 min-[440px]:grid-cols-3 grid-cols-2 gap-3'>
      {items.map((item, index) => {
        const asset = Assets.filter((asset) => asset.sys.id == item.fields.thumbnail.sys.id)[0]
        return <Thumbnail key={index} item={item} asset={asset} />
      })}
    </div>
  )
}

export default PageLayout
