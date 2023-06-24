decoder = {
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-"
}

const input = document.querySelector(".input")
const output = document.querySelector(".output")
const button = document.querySelector(".translateBtn")
const hiddenError = document.querySelector(".hidden")

function translate() {
    const morseCodeChars = [".", "-"]
    let inputText = input.value.trim()
    const isMorseCode = morseCodeChars.some(char => inputText.startsWith(char))

    inputText === "" ? hiddenError.style.display = "block" : hiddenError.style.display = "none"

    if (!isMorseCode) {
        inputText = inputText.toLowerCase()
        encodeInput(inputText)
    } else {
        decodeInput(inputText)
    }
}

function encodeInput(inputText) {
    const encodedArr = []
    console.log("chose encode input")

    for (var char of inputText) {
        console.log(char)
        if (["", " ", "/"].includes(char)) {
            encodedArr.push(" ")
        }
        else if (!Object.keys(decoder).includes(char)) {
            encodedArr.push("?")
        } else {
            encodedArr.push(decoder[char])
        }
    }
    const encodedText = encodedArr.join(" ")
    output.innerHTML = encodedText
}

function findKeyValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
}

function decodeInput(inputText) {
    const decodedArr = []
    const codeArray = inputText.split(" ")
    console.log("chose decode input")

    for (var code of codeArray) {
        if (["", " ", "/"].includes(code)) {
            decodedArr.push(" ")
        }
        else if (Object.values(decoder).includes(code)) {
            decodedArr.push(findKeyValue(decoder, code))
        } else {
            decodedArr.push("?")
        }
    }
    const decodedText = decodedArr.join("")
    output.innerHTML = decodedText

}

button.addEventListener("click", translate)

const copyBtn = document.querySelector(".copy-btn")

copyBtn.addEventListener("click", (e) => {
    e.preventDefault()
    output.select()
    navigator.clipboard.writeText(output.value)
        .then(() => {
            alert("Succesfully copied to clipboard!")
        })
        .catch((error) => {
            alert("Failed to copy text: ", error)
        })
})
