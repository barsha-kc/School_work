const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.querySelector(".btn1")
const btn2 = document.querySelector(".btn2")
const btn3 = document.querySelector(".btn3")
const colorPanel = document.querySelector("#colorPanel")
const body = document.querySelector("body")
const colorCode = document.querySelector("#ColorCode");

btn.addEventListener('click', ChangeColor)
btn2.addEventListener('click', RandomColor)
btn3.addEventListener('click', RandomHex)

function ChangeColor() {
    console.log("hey you clicked me ")
    let index = Math.floor(colors.length * Math.random())
    console.log(index, colors[index])
    colorPanel.style.backgroundColor = colors[index]
    colorCode.innerHTML = colors[index]
}
function RandomColor() {
    let red = Math.floor(Math.random() * 255)
    let green = Math.floor(Math.random() * 255)
    let blue = Math.floor(Math.random() * 255)
    console.log(red, green, blue)
    let colorstring = "rgba(" + red + "," + green + "," + blue + ")"
    console.log(colorstring)
    colorPanel.style.backgroundColor = colorstring
    colorCode.innerHTML = colorstring
}

function RandomHex() {
    let red = Math.floor(Math.random() * 255)
    let green = Math.floor(Math.random() * 255)
    let blue = Math.floor(Math.random() * 255)
    console.log(red.toString(16))
    let colorstring = "#" + red.toString(16) + green.toString(16) + blue.toString(16)
    console.log(colorstring)
    colorPanel.style.backgroundColor = colorstring
    colorCode.innerHTML = colorstring
}