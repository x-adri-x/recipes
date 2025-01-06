import Image from 'next/image'
import Link from 'next/link'

const Thumbnail = ({ item, asset }) => {
  const title = item.fields.title
  const contentType = item.sys.contentType.sys.id
  const slug = item.fields.slug

  return (
    <div className='flex flex-col items-center '>
      <Link href={`/${contentType}/${slug}`}>
        <Image src={'https:' + asset.fields.file.url} alt={asset.fields.title} width='250' height='250' />
        <p className='text-sm text-center mt-3'>{title}</p>
      </Link>
    </div>
  )
}

export default Thumbnail
