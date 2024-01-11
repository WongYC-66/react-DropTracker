function MobCard({data}) {
    // console.log(data)
    let strArr = [data.desc]
    if(data.desc){
        strArr = data.desc.split("\\n")
    }
    
    return (
      <div className="card">
        <div className="left">
            <h3>{data.name}</h3>
            {strArr.map( (x, i) => <p key = {i}>{x}</p> )}
        </div>
        <div className="right">
            <img src={`https://maplestory.io/api/SEA/198/mob/${data.id}/render/stand`} alt="No image found"></img>
        </div>
      </div>
    )
  }
  
  export default MobCard
  
