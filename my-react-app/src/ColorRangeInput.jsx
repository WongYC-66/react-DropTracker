import { useEffect, useState } from "react"

function ColorRangeInput({ queryMob, queryItem }) {

  const [colorTheme, setColorTheme] = useState("light")

  useEffect(() => {
    console.log(colorTheme)

    let d = document
    let w = window
    let x = null

    if (colorTheme === "light") {
      let color1 = `rgba(200, 200, 200, 0.75)`
      let color2 = `rgb(220, 220, 220)`
      let color3 = `rgb(255, 255, 255, 0.75)`
      let color4 = `rgba(245, 245, 245)`
      let color5 = `rgba(0, 0, 0, 1)`
      let color6 = `rgb(109, 147, 255)`
      let color7 = `rgb(255, 255, 255)`
      let color8 = `rgb(99, 157, 249)`

      d.querySelector("body").style.background = `#FFFFFF url("/ludi.jpg") center / cover no-repeat`
      d.querySelector("header").style.background = `rgba(255,255,255,0.75) url("/ship.jpeg") top no-repeat`
      d.querySelector("main").style.background = color3
      d.querySelector("footer").style.background = color1
      d.querySelector("footer").style.color = color5
      d.querySelector("header>a>h1").style.color = color4
      d.querySelector("header>h3").style.color = color4
      d.querySelector("#ButtonContainer>p").style.color = color5
      d.querySelector("#searchBarContainer svg").style.color = color6
      d.querySelector("#result_container").style.backgroundColor = color7
      d.querySelector("#result_container").style.color = color5
      d.querySelector("#result_container").style.border = `1px solid darkgray`
      d.querySelectorAll(".card:nth-child(odd)").forEach(x => {
        x.style.backgroundColor = color2
      })
      d.querySelectorAll(".card:nth-child(even)").forEach(x => {
        x.style.backgroundColor = color3
      })
      d.querySelectorAll("button").forEach(x => {
        x.style.backgroundColor = color4
        x.style.color = color5
        if (x.classList.contains("selected")) x.style.backgroundColor = color8
        if (x.classList.contains("selected")) x.style.color = color7
      })
      return

    } else if (colorTheme === "dark") {
      let color1 = `rgb(21,32,43)`
      let color2 = `rgb(25,39,52)`
      let color3 = `rgb(34,48,60)`
      let color4 = `rgba(245,245,245, 0.75)`
      let color5 = `rgba(136,153,172)`

      d.querySelector("body").style.background = color1
      d.querySelector("main").style.background = color2
      d.querySelector("header").style.background = color1
      d.querySelector("footer").style.background = color1
      d.querySelector("footer").style.color = color5
      d.querySelector("header>a>h1").style.color = color5
      d.querySelector("header>h3").style.color = color5
      d.querySelector("#ButtonContainer>p").style.color = color5
      d.querySelector("#searchBarContainer svg").style.color = color5
      d.querySelector("#result_container").style.backgroundColor = color3
      d.querySelector("#result_container").style.color = color5
      d.querySelector("#result_container").style.border = "none"
      d.querySelectorAll(".card:nth-child(odd)").forEach(x => {
        x.style.backgroundColor = color2
      })
      d.querySelectorAll(".card:nth-child(even)").forEach(x => {
        x.style.backgroundColor = color3
      })
      d.querySelectorAll("button").forEach(x => {
        x.style.backgroundColor = color2
        x.style.color = color4
        if (x.classList.contains("selected")) x.style.backgroundColor = color5
      })

    } else if (colorTheme === "pink") {
      let color1 = `rgb(216,143,225)`
      let color2 = `rgb(240,170,227)`
      let color3 = `rgb(255,179,237)`
      let color4 = `rgba(245,245,245, 0.8)`
      let color5 = `rgba(231,98,186, 1)`

      d.querySelector("body").style.background = color1
      d.querySelector("main").style.background = color2
      d.querySelector("header").style.background = color1
      d.querySelector("footer").style.background = color1
      d.querySelector("footer").style.color = color3
      d.querySelector("header>a>h1").style.color = color5
      d.querySelector("header>h3").style.color = color5
      d.querySelector("#ButtonContainer>p").style.color = color5
      d.querySelector("#searchBarContainer svg").style.color = color5
      d.querySelector("#result_container").style.backgroundColor = color3
      d.querySelector("#result_container").style.color = color5
      d.querySelector("#result_container").style.border = "none"
      d.querySelectorAll(".card:nth-child(odd)").forEach(x => {
        x.style.backgroundColor = color2
      })
      d.querySelectorAll(".card:nth-child(even)").forEach(x => {
        x.style.backgroundColor = color3
      })
      d.querySelectorAll("button").forEach(x => {
        x.style.backgroundColor = color2
        x.style.color = color4
        if (x.classList.contains("selected")) x.style.backgroundColor = color5
      })

    }

  }, [colorTheme, queryMob, queryItem])


  const handleInputChange = (value) => {
    console.log(value)
    switch (value) {
      case "0": // dayMode
        return setColorTheme('light')
      case "1": // nightMode
        return setColorTheme('dark')
      case "2": // pinkMode
        return setColorTheme('pink')
    }
  }

  return (
    <div>
      <input
        type="range"
        id="colorSlider"
        name="colorSlider"
        className="slider"
        min="0"
        max="2"
        defaultValue="0"
        onInput={(e) => handleInputChange(e.target.value)}
      />
    </div>)
}
export default ColorRangeInput
