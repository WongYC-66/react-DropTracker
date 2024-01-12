import { itemIdToImgUrl } from './myUtility.js'

function ItemCard({data, handleItemIconClick}) {
    // console.log(data)
    let strArr = [data.desc]
    if(data.desc){
        strArr = data.desc.split("\\n")
    }
    // console.log(data)

    return (
      <div className="card">
        <div className="left">
            <h3>{data.name}</h3>
            {strArr.map( (x, i) => <p key = {i}  dangerouslySetInnerHTML={{ __html: x }}></p> )}
        </div>
        <div className="right">
            <img src={itemIdToImgUrl(data.id)} 
            alt="No image found"
            onClick = {()=>handleItemIconClick(data.id)}
            ></img>
        </div>
      </div>
    )
  }
  
  export default ItemCard
  
