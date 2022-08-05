import Thumbnail from './Thumbnail'

const PageLayout = ({props}) => {
    
    const Assets = props.includes?.Asset
    const items = props.items
    
    return (
        <div className = 'page'>
            {items.map((item, index) => {
                const asset = Assets.filter(asset => asset.sys.id == item.fields.thumbnail.sys.id)[0]
                return <Thumbnail key = {index}  item = {item} asset = {asset} />
            })}
        </div>
     );
}
 
export default PageLayout;