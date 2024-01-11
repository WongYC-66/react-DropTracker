function MobCard({data}) {
    // console.log(data)
    
    return (
      <div className="card">
        <div className="left">
            <h3>{data.name}</h3>
        </div>
        <div className="right">
            <img src={`https://maplestory.io/api/SEA/198/mob/${data.id}/render/stand`} alt="No image found"></img>
        </div>
      </div>
    )
  }
  
  export default MobCard
  
