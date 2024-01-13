import { useState, useEffect } from 'react'
import { itemIdToImgUrl, attkSpeedToText } from './myUtility.js'

function ItemCard({ data, handleItemIconClick }) {
  // console.log(data)
  const [eqpData, setEqpData] = useState({})
  // console.log(eqpData)
  let strArr = [data.desc]
  if (data.desc) {
    strArr = data.desc.split("\\n")
  }

  useEffect(() => {
    if (data.desc !== undefined) return // defined == Eqp

    const fetchEqpData = async () => {
      // fetch api for eqp data for at least 3 times if fail
      for (let i = 0; i < 3; i++) {
        let x = {};
        try {
          x = await fetch(`https://maplestory.io/api/GMS/107/item/${data.id}`)
          x = await (x.json())
          // return setEqpData(x)
          let nextObj = {
            name: data.name,
            id: data.id,
            overallCategory: x.typeInfo.overallCategory.toUpperCase(),
            subCategory: x.typeInfo.subCategory.toUpperCase(),
            reqLevel: x.metaInfo.reqLevelEquip || 0,
            reqSTR: x.metaInfo.reqSTR || 0,
            reqDEX: x.metaInfo.reqDEX || 0,
            reqINT: x.metaInfo.reqINT || 0,
            reqLUK: x.metaInfo.reqLUK || 0,
            reqFAME: x.metaInfo.reqPOP || 0,
            reqJob: x.metaInfo.reqJob || 0,
            //
            slot: x.metaInfo.tuc || 0,
            attackSpeed: x.metaInfo.attackSpeed || 0,
            incWATT: x.metaInfo.incPAD || 0,
            incMATT: x.metaInfo.incMAD || 0,
            incACC: x.metaInfo.incACC || 0,
            incEVA: x.metaInfo.incEVA || 0,
            incSpeed: x.metaInfo.incSpeed || 0,
            incJUMP: x.metaInfo.incJUMP || 0,
            incWDEF: x.metaInfo.incPDD || 0,
            incMDEF: x.metaInfo.incMDD || 0,
            incHP: x.metaInfo.incMHP || 0,
            incMP: x.metaInfo.incMMP || 0,
            //
            incSTR: x.metaInfo.incSTR || 0,
            incDEX: x.metaInfo.incDEX || 0,
            incINT: x.metaInfo.incINT || 0,
            incLUK: x.metaInfo.incLUK || 0,
            //

          }
          // console.log(nextObj)
          setEqpData(nextObj)
          return;
        } catch (err) {
          continue // re fetch 
        }
      }
    }

    fetchEqpData()
  }, [])

  return (
    <div className="card">
      <div className="left">
        <h3>{data.name}</h3>
        {strArr.map((x, i) => <p key={i} dangerouslySetInnerHTML={{ __html: x }}></p>)}
      </div>
      <div className="right">
        <img src={itemIdToImgUrl(data.id)}
          alt="No image found"
          onClick={() => handleItemIconClick(data.id)}
        ></img>
        {eqpData.overallCategory === "EQUIP" && (
          <div className='itemDetail'>
            <h3>{eqpData.name}</h3>
            <div className='imgNReq'>
              <div className="col-1"><img src={itemIdToImgUrl(data.id)} alt="No image found"></img></div>
              <div className="col-2">
                <p>REQ LEV : {eqpData.reqLevel}</p>
                <p>REQ STR : {eqpData.reqSTR}</p>
                <p>REQ DEX : {eqpData.reqDEX}</p>
                <p>REQ INT : {eqpData.reqINT}</p>
                <p>REQ LUK : {eqpData.reqLUK}</p>
                <p>REQ FAM : {eqpData.reqFAME || '-'}</p>
              </div>
            </div>
            <div className='jobReq'>
              {jobReqToHtmlElem(eqpData.reqJob)}
            </div>
            <li>CATEGORY: {eqpData.subCategory}</li>
            {!!eqpData.attackSpeed && <li>ATTACK SPEED: {attkSpeedToText(eqpData.attackSpeed)} ({eqpData.attackSpeed})</li>}
            {!!eqpData.incSTR && <li>STR: <b>+{eqpData.incSTR}</b></li>}
            {!!eqpData.incDEX && <li>DEX: <b>+{eqpData.incDEX}</b></li>}
            {!!eqpData.incINT && <li>INT: <b>+{eqpData.incINT}</b></li>}
            {!!eqpData.incLUK && <li>LUK: <b>+{eqpData.incLUK}</b></li>}
            
            {!!eqpData.incHP && <li>HP: <b>+{eqpData.incHP}</b></li>}
            {!!eqpData.incMP && <li>MP: <b>+{eqpData.incMP}</b></li>}
            {!!eqpData.incWATT && <li>WEAPON ATTACK: <b>{eqpData.incWATT}</b></li>}
            {!!eqpData.incMATT && <li>MAGIC ATTACK: <b>{eqpData.incMATT}</b></li>}

            {!!eqpData.incWDEF && <li>WEAPON DEF: <b>{eqpData.incWDEF}</b></li>}
            {!!eqpData.incMDEF && <li>MAGIC DEF: <b>{eqpData.incMDEF}</b></li>}

            {!!eqpData.incACC && <li>ACCURACY: <b>{eqpData.incACC}</b></li>}
            {!!eqpData.incEVA && <li>AVOIDABILITY: <b>{eqpData.incEVA}</b></li>}
            {!!eqpData.incSpeed && <li>SPEED: {eqpData.incSpeed}</li>}
            {!!eqpData.incJUMP && <li>SPEED: {eqpData.incJUMP}</li>}
            
            <li>NUMBER OF UPGRADES AVAILABLE : <b>{eqpData.slot}</b></li>

          </div>
        )}
      </div>
    </div>
  )
}

function jobReqToHtmlElem(x){
  const lib = {
    "-1" : [-1],   //'BEGINNER',
    0 : [-1, 1, 2, 4, 8, 16],    // 'ALL',
    1 : [1],       // 'WARRIOR'
    2 : [2],       // 'MAGICIAN'
    4 : [4],       // 'BOWMAN'
    8 : [8],       // 'THIEF',
    9 : [1, 8],                 // ['WARRIOR','THIEF'],
    13 : [1, 4, 8],             // ['WARRIOR','BOWMAN', 'THIEF'],
    16 : [16]      // 'PIRATE',
  }

  x = lib[x]
  
  return(<>
    {
      <>
        <p className={x.includes(-1) ? "highlight" : null }>BEGINNER</p>
        <p className={x.includes(1) ? "highlight" : null }>WARRIOR</p>
        <p className={x.includes(2) ? "highlight" : null }>MAGICIAN</p>
        <p className={x.includes(4) ? "highlight" : null }>BOWMAN</p>
        <p className={x.includes(8) ? "highlight" : null }>THIEF</p>
        <p className={x.includes(16) ? "highlight" : null }>PIRATE</p>
      </>
    }
  </>)
  // <p>BEGINNER</p><p>WARRIOR</p><p>MAGICIAN</p><p>BOWMAN</p><p>THIEF</p><p>PIRATE</p>

}

export default ItemCard


