function PreviewBox({ data, sendSearchRequest }) {
  // console.log(data)
  // return <></>
  return (
    <>
      { Object.keys(data).length > 1 && (
        <select className="previewGroup" size={data.data.length}>
          {data.data.map(x => {
            return <option
              value={x[0]}
              key = {x[0]}
              className="previewItem"
              onClick = {() => sendSearchRequest({type: data.type , id : x[0]})}
            > {x[1]}
            </option>

          })}
        </select>
      )}
    </>
  )
}

export default PreviewBox

