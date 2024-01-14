import { useEffect, useState } from "react";
import { FaSearch, FaDiceThree } from "react-icons/fa";
import PreviewBox from './PreviewBox.jsx'
import { queryMaps } from './myUtility.js'


function QueryBox({ updateQueryMobResult, updateQueryItemResult }) {
  const [selected, setSelected] = useState('Mobs')
  const [input, setInput] = useState('')
  const [searchDropDown, setSearchDropDown] = useState({})
  const [searchRequest, setSearchRequest] = useState({})
  const [previewBoxIndex, setPreviewBoxIndex] = useState(0)

  useEffect(()=>{
    setPreviewBoxIndex(0)
  }, [searchDropDown])

  useEffect(() => {
    if (searchRequest.type === 'Mobs') {
      queryMobs(searchRequest.id)
    } else if (searchRequest.type === 'Items') {
      queryItems(searchRequest.id)
    }
  }, [searchRequest])

  useEffect(() => {
    if (input === "") return clearInput() // test
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

        let dropIdNameArr = [...dropItemSet].map(x => [x, data.data_item[x]]) // each unique item : ["4000019", {name: "xxx" , desc: "xxx"}]}
        .filter(x => x[0] != undefined && x[1] != undefined)  // data cleansing (MUST), undefined in raw data

        data = dropIdNameArr.map(x => {
          // data reformatting into array, without jv Object // ['"2000004"', 'Elixir']
          // console.log(x)
          return x[1].name ?
            [x[0], x[1].name] : // for consume/etc/Ins
            [x[0], x[1]]        // for Eqp
        })
        break;
    }
    data = data.filter(x => {
      //x[0] = id, x[1] = name
      return x[0].toLowerCase().includes(value) || x[1].toLowerCase().includes(value) // match Data to UserInput
    })
    selected === 'Mobs' ? data = { type: 'Mobs', data: data } : data = { type: 'Items', data: data }
    setSearchDropDown(data) // update searchable dropdown
    setPreviewBoxIndex(0) // update select index to 0 or error
  }, [input]) 

  const queryAndUpdate = (event) => {
    if (event.key !== "Enter") return; // only trigger when Enter event
    // --- unnecessary troll ---
    if (input.includes("waifu")) return (() => {
      alert('Looking for waifu ? Have you tried Tinder? oh wait, found for ya')
      window.open("", "MsgWindow", "width=400,height=400")
        .document.write(`
          <h1>Hi Here is your waifu</h1>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/330px-Cat_November_2010-1a.jpg"></img>
        `)
    })()
    // --- unnecessary troll ---
    if (selected === "Mobs" && searchDropDown.data.length >= 1) return queryMobs(searchDropDown.data[previewBoxIndex][0])
    if (selected === "Items" && searchDropDown.data.length >= 1) return queryItems(searchDropDown.data[previewBoxIndex][0])
    if (selected === "Mobs") return queryMobs(event.target.value);
    if (selected === "Items") return queryItems(event.target.value);
  }

  const handleArrowKeySelection = (event) => {
    // handle arrow key UP and DOWN only
    if(event.key !== "ArrowUp" &&  event.key !== "ArrowDown" ) return
    if(Object.keys(searchDropDown).length <= 0) return // if no dropdown, do nothing
    if(event.key !== "ArrowUp") return setPreviewBoxIndex(Math.min(previewBoxIndex + 1, searchDropDown.data.length - 1))
    if(event.key !== "ArrowDown") return setPreviewBoxIndex(Math.max(previewBoxIndex - 1, 0))
  }

  const queryMobs = (id) => {
    console.log(id)
    // from Mob Id, find the item it drops
    const data = JSON.parse(localStorage.getItem("data"));
    if (!data.data_Mob[id]) return alert("id not found") // end if not tound

    let name = data.data_Mob[id]
    let dropTable = data.data_MB[id]
    dropTable = dropTable.map(x => {
      let result = data.data_item[parseInt(x)]
      if (typeof result === "string") {
        // item isEqp, without description
        
        return {
          id: x,
          name: result,
          // data : fetch(`https://maplestory.io/api/GMS/64/item/${x}`).then(x => x.json) // test
        }
      }
      else {
        // item is Use/Consume/Etc with desciption
        return {
          id: x,
          name: result.name,
          desc: result.desc
        }
      }

    })
    // console.log(dropTable)
    let mapTable = queryMaps(id, data)
    clearInput()
    updateQueryMobResult({ id, name, dropTable, mapTable })
  }

  const queryItems = (id) => {
    console.log(id)
    // from Item Id, find the mob that drops it
    const data = JSON.parse(localStorage.getItem("data"));
    if (!data.data_item[id]) return alert("id not found") // end if not tound

    let name = data.data_item[id].name   // is Consume/Etc/Ins
    if (!name) name = data.data_item[id] // is Eqp.

    let desc = data.data_item[id].desc
    let dropTable = Object.entries(data.data_MB)
    dropTable = dropTable.filter(x => x[1].includes(id))

    dropTable = dropTable.map(x => {
      // x[0] = id of mob
      return {
        id: x[0],
        name: data.data_Mob[parseInt(x[0])],
      }
    })
    // console.log({ id, name, desc, dropTable })
    clearInput()
    updateQueryItemResult({ id, name, desc, dropTable })
  }

  const randomSearch = () => {
    // for fun :)
    // console.log('random search')
    const data = JSON.parse(localStorage.getItem("data"));
    let randomId = 0
    if(selected === "Mobs"){
      randomId = [...Object.keys(data.data_MB)].sort(() => Math.random() - 0.5).pop()

    } else if(selected === "Items") {
      let dropItemsList = Object.values(data.data_MB)
      let dropItemSet = new Set()
      dropItemsList.forEach(x => {
        x.forEach(y => dropItemSet.add(y)) // add all Item from MonsterBook, each as unique to Set
      })

      let validItemIdList = [...dropItemSet].map(x => [x, data.data_item[x]]) // each unique item : ["4000019", {name: "xxx" , desc: "xxx"}]}
      .filter(x => x[0] != undefined && x[1] != undefined)  // data cleansing (MUST), undefined in raw data
      .map(x => x[0])

      randomId = validItemIdList.sort(() => Math.random() - 0.5).pop()
    }
    
    // console.log(randomId)
    selected === "Mobs" ? queryMobs(randomId)
      : selected === "Items" ? queryItems(randomId)
      : null 
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
  }

  const sendSearchRequest = (data) => {
    // console.log(data)
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
        <FaSearch id="search-icon" style={{ color: "rgb(109, 147, 255)" }}  onClick={() => randomSearch()}/>
        <input value={input}
          onInput={(e) => handleInputChange(e.target.value)}
          onKeyPress={(e) => queryAndUpdate(e)}
          onKeyDown={(e) => handleArrowKeySelection(e)}
          placeholder="Search for a mob or item" />
      </div>
      <PreviewBox data={searchDropDown} sendSearchRequest={sendSearchRequest} previewBoxIndex={previewBoxIndex} />
    </>
  )
}




export default QueryBox