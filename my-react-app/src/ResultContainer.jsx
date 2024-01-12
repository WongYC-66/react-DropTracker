import { useState } from 'react';
import ItemCard from './ItemCard.jsx'
import MobCard from './MobCard.jsx'
import { queryItems, queryMobs, MobIdToImgUrl } from './myUtility.js'

function ResultContainer({ queryMob = {}, queryItem = {}, updateQueryMobResult, updateQueryItemResult }) {
  const [showMap, setShowMap] = useState(false)

  let hasResult = false
  if (queryMob.name) hasResult = true;

  let strArr = []

  if (queryItem.name) {
    hasResult = true;

    // format string
    if (queryItem.desc) {
      strArr = queryItem.desc.split("\\n")
    }
  }

  const handleMobHeaderIconClick = () => {
    setShowMap(() => !showMap)
  }

  const handleItemIconClick = (id) => {
    updateQueryMobResult({})
    queryItems(id, updateQueryItemResult)
  }

  const handleMobIconClick = (id) => {
    // console.log(id)
    updateQueryItemResult({})
    queryMobs(id, updateQueryMobResult)
  }


  // console.log(queryMob)
  // console.log(queryItem)


  return (
    <div id="result_container">

      {hasResult && queryMob.name && queryMob.dropTable.length >= 1 ?
        <>
          <div className="resultHeader">
            <h1>{queryMob.name}</h1>
            <img src={MobIdToImgUrl(queryMob.id)}
              alt="No image found"
              onClick={handleMobHeaderIconClick}
            ></img>
            {showMap && (<div className='mapDiv'>
              {queryMob.mapTable.map((x, i) => <a href={"https://bbb.hidden-street.net/map/mini-map/" + x.toLowerCase().replaceAll(/ :? */g, '-')}
                key={i}
                target="_blank" 
                dangerouslySetInnerHTML={{ __html: x }}></a>)}
            </div>)}
          </div>
          <h2> Items That This Mob Drops: </h2>
          <div>
            {queryMob.dropTable.map(x => <ItemCard key={x.id} data={x} handleItemIconClick={handleItemIconClick}/>)}
          </div>
        </>
        : hasResult && queryItem.name ?
          <>
            <div className="resultHeader">
              <div>
                <h1>{queryItem.name}</h1>
                {strArr.map((x, i) => <p key={i} dangerouslySetInnerHTML={{ __html: x }}></p>)}
              </div>
              <img src={`https://maplestory.io/api/SEA/198/item/${parseInt(queryItem.id)}/icon?resize=1.5`} alt="No image found"></img>
            </div>
            <h2> Mobs That Drop This Item: </h2>
            <div>
              {queryItem.dropTable.map(x => <MobCard key={x.id} data={x} handleMobIconClick={handleMobIconClick}/>)}
            </div>
          </>
          : hasResult && queryMob.name && queryMob.dropTable.length < 1 ?
            <>
              <div className="resultHeader">
                <h1>{queryMob.name}</h1>
                <img src={MobIdToImgUrl(queryMob.id)} alt="No image found"></img>
                {showMap && (<div className='mapDiv'>
                  {queryMob.mapTable.map((x, i) => <a href={"https://bbb.hidden-street.net/map/mini-map/" + x.toLowerCase().replaceAll(/ :? */g, '-')}
                    key={i}
                    target="_blank">{x}
                  </a>)}
                </div>)}
              </div>
              <h2> Items That This Mob Drops: </h2>
              <div>
                <p>This mob doesn't drop anything :(</p>
              </div>
            </>
            : <></>
      }


    </div>
  )
}

export default ResultContainer

