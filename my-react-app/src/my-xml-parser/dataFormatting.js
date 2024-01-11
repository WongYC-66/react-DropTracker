import util from 'util'
import { parseItemJSON } from './utility.js';

export function legacyTextCheck(str){
    // check for '
    str = str.replaceAll("&apos;", "'")
    
    // check for #c
    str = str.replaceAll(/#c(.+)#/g, "<b>$1</b>")

    return str
}

export function MBdataFormatting(obj) {
    // for MonsterBook.img.xml ONLY
    // Create better data-structure
    const simpleData = {}
    const arrayData = obj.root.children

    arrayData.forEach(x => {
        let mobId = x.attributes.name
        let dropData = x.children[2].children
        let dropArray = dropData.map(obj => obj.attributes.value)

        //write to main
        simpleData[mobId] = dropArray
    })

    return simpleData
}

export function MobIdDataFormatting(obj) {
    // for Mob.img.xml ONLY
    // Create better data-structure
    const simpleData = {}
    const arrayData = obj.root.children
 
    arrayData.forEach(x => {
        let mobId = x.attributes.name
        let mobName = x.children[0].attributes.value
        mobName = legacyTextCheck(mobName)
        //write to main
        simpleData[mobId] = mobName
    })

    return simpleData
}

export function ConsumeItemIdDataFormatting(obj) {
    // for Consume.img.xml ONLY
    // Create better data-structure
    const simpleData = {}

    const arrayData = obj.root.children

    arrayData.forEach(x => {
        let itemId = x.attributes.name

        //write to main
        let resultObj = parseItemJSON(x)
        simpleData[itemId] = resultObj
    })
    return simpleData
}

export function EtcItemIdDataFormatting(obj) {
    // for Etc.img.xml ONLY
    // Create better data-structure
    const simpleData = {}

    const arrayData = obj.root.children[0].children
    arrayData.forEach(x => {
        let itemId = x.attributes.name

        //write to main
        let resultObj = parseItemJSON(x)
        simpleData[itemId] = resultObj
    })
    return simpleData
}

export function EqpItemIdDataFormatting(obj) {
    // for Eqp.img.xml ONLY
    // Create better data-structure
    const simpleData = {}
    const arrayData = obj.root.children[0].children
    arrayData.forEach(categoryArr => {
        categoryArr.children.forEach(x => {
            let itemId = x.attributes.name
            let itemName = x.children[0].attributes.value
            itemName = legacyTextCheck(itemName)
            //write to main
            simpleData[itemId] = itemName
        })
    })

    // console.log(simpleData)
    return simpleData
}

export function InsItemIdDataFormatting(obj) {
    // for Ins.img.xml ONLY
    // Create better data-structure
    const simpleData = {}

    const arrayData = obj.root.children
    // console.log(arrayData)
    arrayData.forEach(x => {
        let itemId = x.attributes.name

        //write to main
        let resultObj = parseItemJSON(x)
        simpleData[itemId] = resultObj
    })
    return simpleData
}


// module.exports = {
//     MBdataFormatting,
//     MobIdDataFormatting,
//     ConsumeItemIdDataFormatting,
//     EtcItemIdDataFormatting,
//     EqpItemIdDataFormatting,
// };