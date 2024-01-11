import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import PreviewBox from './PreviewBox.jsx'

function QueryBox({ updateQueryMobResult, updateQueryItemResult }) {
  const [selected, setSelected] = useState('Mobs')
  const [input, setInput] = useState('')
  const [searchDropDown, setSearchDropDown] = useState({})
  const [searchRequest, setSearchRequest] = useState({})

  useEffect(() => {
    if (searchRequest.type === 'Mobs') {
      queryMobs(searchRequest.id)
    } else if (searchRequest.type === 'Items') {
      queryItems(searchRequest.id)
    }
  }, [searchRequest])

  useEffect(() => {
    if(input === "") return clearInput() // test
    // update searchable Dropdown
    let data = JSON.parse(localStorage.getItem("data"));
    let value = input.toLowerCase()
    switch (selected) {
      case "Mobs":
        let mobIdList = Object.keys(data.data_MB)
        data = mobIdList.map(x => [x, data.data_Mob[x]]) // ['100100', 'Snail']
        break;

      case "Items":
        let dropItemsList = Object.values(data.data_MB)
        let dropItemSet = new Set()
        dropItemsList.forEach(x => {
          x.forEach(y => dropItemSet.add(y)) // add all Item from MonsterBook, each as unique to Set
        })

        let dropIdNameArr = [...dropItemSet].map(x => [x, data.data_item[x]])
          .filter(x => x[0] != undefined && x[1] != undefined)  // data cleansing

        data = dropIdNameArr.map(x => {
          // data reformatting into array, without jv Object // ['"2000004"', 'Elixir']
          return x[1].itemName
            ? [x[0], x[1].itemName]
            : [x[0], x[1]]
        })
        break;
    }

    data = data.filter(x => {
      //x[0] = id, x[1] = name
      return x[0].toLowerCase().includes(value) || x[1].toLowerCase().includes(value) // match Data to UserInput
    })
    selected === 'Mobs' ? data = { type: 'Mobs', data: data } : data = { type: 'Items', data: data }
    setSearchDropDown(data)

  }, [input])

  const queryAndUpdate = (event) => {

    if (event.key !== "Enter") return; // only trigger when Enter event
    if (selected === "Mobs") return queryMobs(event.target.value);
    if (selected === "Items") return queryItems(event.target.value);
  }

  const queryMobs = (id) => {
    const data = JSON.parse(localStorage.getItem("data"));
    // const id = event.target.value
    if (!data.data_Mob[id]) return alert("id not found") // end if not tound

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

  const queryItems = (id) => {
    const data = JSON.parse(localStorage.getItem("data"));
    // const id = event.target.value
    if (!data.data_item[id]) return alert("id not found") // end if not tound

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
    switch (option) {
      case 0:
        if (selected === 'Items') updateQueryItemResult({}) // reset 
        setSelected('Mobs')
        clearInput()
        break;
      case 1:
        if (selected === 'Mobs') updateQueryMobResult({}) // reset 
        setSelected('Items')
        clearInput()
        break;
    }
  }



  const handleInputChange = (value) => {
    setInput(value)
    return;
    // update searchable Dropdown
    let data = JSON.parse(localStorage.getItem("data"));
    value = value.toLowerCase()
    switch (selected) {
      case "Mobs":
        let mobIdList = Object.keys(data.data_MB)
        data = mobIdList.map(x => [x, data.data_Mob[x]]) // ['100100', 'Snail']
        break;

      case "Items":
        let dropItemsList = Object.values(data.data_MB)
        let dropItemSet = new Set()
        dropItemsList.forEach(x => {
          x.forEach(y => dropItemSet.add(y)) // add all Item from MonsterBook, each as unique to Set
        })

        let dropIdNameArr = [...dropItemSet].map(x => [x, data.data_item[x]])
          .filter(x => x[0] != undefined && x[1] != undefined)  // data cleansing

        data = dropIdNameArr.map(x => {
          // data reformatting into array, without jv Object // ['"2000004"', 'Elixir']
          return x[1].itemName
            ? [x[0], x[1].itemName]
            : [x[0], x[1]]
        })
        break;
    }

    data = data.filter(x => {
      //x[0] = id, x[1] = name
      return x[0].toLowerCase().includes(value) || x[1].toLowerCase().includes(value) // match Data to UserInput
    })
    selected === 'Mobs' ? data = { type: 'Mobs', data: data } : data = { type: 'Items', data: data }
    setSearchDropDown(data)
  }

  const sendSearchRequest = (data) => {
    setSearchRequest(data)  // {type: data.type , id : x[0]}
    clearInput()
  }

  const clearInput = () => {
    let x = document.querySelector("select")
    if (x) x.style.visibility = "hidden"
    setInput("")
    setSearchDropDown([])
    // console.log("clearing input")
  }

  // console.log(data)

  return (
    <>
      <div id="ButtonContainer"><p>Search by : </p>
        {selected === "Mobs"
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
      <div id="searchBarContainer">
        <FaSearch id="search-icon" style={{ color: "rgb(109, 147, 255)" }} />
        <input value={input} 
          onChange={(e) => handleInputChange(e.target.value)} 
          onKeyPress={() => queryAndUpdate(event)} 
          placeholder="Search for a mob or item"/>

      </div>
      <PreviewBox data={searchDropDown} sendSearchRequest={sendSearchRequest} />
    </>
  )
}

export default QueryBox