function ItemCard({data}) {
    // console.log(data)

    return (
      <div className="card">
        <div className="left">
            <h3>{data.name}</h3>
        </div>
        <div className="right">
            <img src={`https://maplestory.io/api/GMS/213/item/${parseInt(data.id)}/icon?resize=1.5`} alt="No image found"></img>
        </div>
      </div>
    )
  }
  
  export default ItemCard
  
