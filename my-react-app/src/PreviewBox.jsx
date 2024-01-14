function PreviewBox({ data, sendSearchRequest, previewBoxIndex }) {
  console.log(previewBoxIndex)

  function handleSelection(id) {
    // console.log(id)
    sendSearchRequest({ type: data.type, id: id })
  }
  // console.log(data)

  return (
    <>
      {(Object.keys(data).length >= 1 && data.data.length >= 1) && (
        <select className="previewGroup" size={data.data.length}
          onChange={e => handleSelection(e.target.value)}
          onSubmit={e => handleSelection(e.target.value)}
          value={data.data[previewBoxIndex][0]}>
          {data.data.map((x, i) => {
            return <option
              value={x[0]}
              key={x[0]}
              className="previewItem"
              onClick={e => handleSelection(x[0])}
            > {x[1]}
            </option>
          })}

        </select>
      )}
    </>
  )
}



export default PreviewBox

