import data_fixMobImg from './data_fixMobImg.json' 
import data_fixItemImg from './data_fixItemImg.json' 
const data_MobIdImg = Object.fromEntries(data_fixMobImg.map(x => [Object.keys(x), Object.values(x)]))
const data_ItemIdImg = Object.fromEntries(data_fixItemImg.map(x => [Object.keys(x), Object.values(x)]))

// ---------------- utility-funciton -----------------------
export function queryMaps(id, data) {
    // to return Array of map name [["streetName : mapName"], ["Maple Road : Snail Hunting Ground I"] ]
    // console.log("running queryMaps")
    let mapList = data.data_MobMap[id]
    // console.log(mapList)
    mapList = mapList.map(mapId => {
        let mapInfo = data.data_Map[mapId]
        if (mapInfo === undefined) return ""// if undefined , format to empty string
        let streetName = mapInfo.streetName
        let mapName = mapInfo.mapName
        return `${streetName} : ${mapName}`
    }).filter(x => x) // filter out empty string
    // console.log(mapList)
    return mapList
}


export function queryItems(id, updateQueryItemResult) {
    // an copy from QueryBox Component above, to be exported to ResultContainer Component
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
            name: data.data_Mob[parseInt(x[0])]
        }
    })
    // console.log({ id, name, desc, dropTable })
    updateQueryItemResult({ id, name, desc, dropTable })
}


export const queryMobs = (id, updateQueryMobResult) => {
    // an copy from QueryBox Component above, to be exported to ResultContainer Component
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
                name: result
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
    let mapTable = queryMaps(id, data)
    updateQueryMobResult({ id, name, dropTable, mapTable })
}

export function mobIdToImgUrl(id) {
    // console.log(data_MobIdImg)
    console.log("running MobIdToImgUrl()")
    // console.log(id)
    let d = data_MobIdImg[id]
    if(d === undefined) return `https://maplestory.io/api/SEA/198/mob/${id}/render/stand`
    d = d[0]
    console.log(d)
    return `https://maplestory.io/api/${d.region}/${d.version}/mob/${id}/render/${d.animation}`
}

export function itemIdToImgUrl(id) {
    // console.log(data_MobIdImg)
    // console.log("running itemIdToImgUrl()")
    let d = data_ItemIdImg[id]
    // console.log(d)
    if(d === undefined) return `https://maplestory.io/api/SEA/198/item/${id}/icon?resize=1.5`
    d = d[0]
    // console.log(d)
    return `https://maplestory.io/api/${d.region}/${d.version}/item/${d.id || id}/icon?resize=1.5`
}

// ---------------- utility-funciton -----------------------