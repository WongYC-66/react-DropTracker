import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import QueryBox from './QueryBox.jsx'
import ResultContainer from './ResultContainer.jsx'
//

import data_MB from '../data/data_MB.json'
import data_Mob from '../data/data_Mob.json'
import data_Consume from '../data/data_Consume.json'
import data_Eqp from '../data/data_Eqp.json'
import data_Etc from '../data/data_Etc.json'
import data_Ins from '../data/data_Ins.json'
import data_MobMap from '../data/data_Mob_MapOnly.json'
import data_Map from '../data/data_Map.json'

function App() {
  
  const [queryMob, setQueryMob] = useState({})
  const [queryItem, setQueryItem] = useState({})

  useEffect(() => {
    const data_item = {...data_Consume, ...data_Eqp, ...data_Etc, ...data_Ins}
    const data = {data_MB, data_Mob, data_item , data_MobMap, data_Map}

    localStorage.setItem("data", JSON.stringify(data));
  }, []);

  const updateQueryMobResult = (result) => {
    setQueryMob(result)
  }

  const updateQueryItemResult = (result) => {
    setQueryItem(result)
  }

  return (
    <div id="container">
      <header>
        <a href="#"><h1 >An Unofficial <img width="300px" src="/MR_logo.webp" alt="MapleRoyals"></img>Drop Tracker</h1></a>
        <h3>Game Version : 89 </h3>
      </header>

      <main>
        <QueryBox updateQueryMobResult={updateQueryMobResult} updateQueryItemResult={updateQueryItemResult} />
        <ResultContainer queryMob={queryMob} queryItem={queryItem} updateQueryMobResult={updateQueryMobResult} updateQueryItemResult={updateQueryItemResult}/>
      </main>

      <footer>
        <p>This website not affiliated, associated, authorized, endorsed by, or in any way officially connected with MapleRoyals.</p>
        <p>The drop data used for this website was taken from the Monster Book data in the Data folder of the MapleRoyals client. This website simply displays this data.</p>
        <br/>
        <p>Images were taken from <a href="https://maplestory.io/">maplestory.io</a></p>
        <p>Inspired by and Credited to : <a href="https://royals-drops.herokuapp.com/#/search/mobs/100100">Shanmango</a> </p>
        <p>Created by: ScottY5C</p>
      </footer>
      
    </div>
  )
}

export default App
