import ItemCard from './ItemCard.jsx'
import MobCard from './MobCard.jsx'

function ResultContainer({ queryMob = {}, queryItem = {} }) {
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
  console.log(queryMob)
  // console.log(queryItem)


  return (
    <div id="result_container">

      {hasResult && queryMob.name && queryMob.dropTable.length >= 1?
        <>
          <div className="resultHeader">
            <h1>{queryMob.name}</h1>
            <img src={`https://maplestory.io/api/SEA/198/mob/${queryMob.id}/render/stand`} alt="No image found"></img>
          </div>
          <h2> Items That This Mob Drops: </h2>
          <div>
            {queryMob.dropTable.map(x => <ItemCard key={x.id} data={x} />)}
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
              {queryItem.dropTable.map(x => <MobCard key={x.id} data={x} />)}
            </div>
          </>
          : hasResult && queryMob.name && queryMob.dropTable.length < 1 ?
            <>
              <div className="resultHeader">
                <h1>{queryMob.name}</h1>
                <img src={`https://maplestory.io/api/SEA/198/mob/${queryMob.id}/render/stand`} alt="No image found"></img>
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

