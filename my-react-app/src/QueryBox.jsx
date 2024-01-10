import { useState } from "react";

function QueryBox({ updateQueryMobResult, updateQueryItemResult }) {
  const [ selected , setSelected ] = useState('Mobs')

  const queryAndUpdate = (event) => {
    if(event.key !== "Enter") return; // only trigger when Enter event
    if(selected === "Mobs") return queryMobs(event) ;
    if(selected === "Items") return queryItems(event) ;
  }

  const queryMobs = (event) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const id = event.target.value
    if(! data.data_Mob[id]) return console.error("id not found") // end if not tound
    
    let name = data.data_Mob[id]
    let dropTable = data.data_MB[id]

    dropTable = dropTable.map(x => {
      let result = data.data_item[parseInt(x)]
      if (typeof result === "string") {
        // item isEqp, without description
        return {
          id: x,
          name: result
        }
      }
      else {
        // item is Use/Consume/Etc with desciption
        return {
          id: x,
          name: result.itemName,
          desc: result.itemDesc
        }
      }

    })
    clearInput()
    updateQueryMobResult({ id, name, dropTable })
  }

  const queryItems = (event) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const id = event.target.value
    if(! data.data_item[id]) return console.error("id not found") // end if not tound
    
    let name = data.data_item[id].itemName
    let desc = data.data_item[id].itemDesc
    let dropTable = Object.entries(data.data_MB)
    dropTable = dropTable.filter(x => x[1].includes(id))

    dropTable = dropTable.map(x => {
        // x[0] = id of mob
        return {
          id: x[0],
          name: data.data_Mob[parseInt(x[0])]
        }
    })
    // console.log({id, name, dropTable})
    clearInput()
    updateQueryItemResult({ id, name, desc, dropTable })
  }

  const toggleSelected = (option) => {
    switch(option){
      case 0:
        if(selected === 'Items') updateQueryItemResult({}) // reset 
        setSelected('Mobs')
        clearInput()
        break;
      case 1:
        if(selected === 'Mobs') updateQueryMobResult({}) // reset 
        setSelected('Items')
        clearInput()
        break;
      default:
        break
    }
  }

  const clearInput = () => {
    document.querySelector('input').value = ''
  }

  return (
    <>
      <div>Search by : 
        { selected === "Mobs" 
        ? <>
            <button onClick={() => toggleSelected(0)} className="selected" >Mobs</button>
            <button onClick={() => toggleSelected(1)}>Items</button> 
          </>
        : <>
            <button onClick={() => toggleSelected(0)}>Mobs</button>
            <button onClick={() => toggleSelected(1)} className="selected">Items</button> 
          </>
        }
      </div>
      <div>
        <input onKeyPress={()=>queryAndUpdate(event)} placeholder="Search for a mob or item"></input>
      </div>
    </>
  )
}

export default QueryBox
