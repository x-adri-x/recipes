import Image from 'next/image'
import Link from 'next/link'

const Thumbnail = ({ item, asset }) => {
  const title = item.fields.title
  const contentType = item.sys.contentType.sys.id
  const slug = item.fields.slug

  return (
    <div className='flex flex-col items-center p-3'>
      <Link href={`/${contentType}/${slug}`} className='flex flex-col items-center'>
        <Image
          src={'https:' + asset.fields.file.url}
          alt={asset.fields.title}
          width='250'
          height='250'
          placeholder='blur'
          blurDataURL={asset.fields.file.url + '?w=10&q=10'}
          className='rounded-2xl'
        />
        <p className='text-lg md:text-[22px] text-center mt-3 text-black font-medium'>{title}</p>
      </Link>
    </div>
  )
}

export default Thumbnail
