function PreviewBox({ data, sendSearchRequest }) {
  // console.log(data)
  // return <></>
  return (
    <>
      {Object.keys(data).length >= 1 && (
        data.data.length === 1 ? (
          // only left 1
          <select value="me" className="previewGroup oneOptionOnly" size={data.data.length} onClick={() => sendSearchRequest({ type: data.type, id: data.data[0][0] })} >
            <option value="me" className="previewItem" onClick={() => sendSearchRequest({ type: data.type, id: data.data[0][0] })} >{ data.data[0][1] }</option>
          </select>
        ) : (
          // more than 1 preview result
          <select className="previewGroup" size={data.data.length} >
            {data.data.map(x => {
              return <option
                key={x[0]}
                className="previewItem"
                onClick={() => sendSearchRequest({ type: data.type, id: x[0] })}
              > {x[1]}
              </option>
            })}
          </select>
        )
      )}
    </>
  )
}

export default PreviewBox

