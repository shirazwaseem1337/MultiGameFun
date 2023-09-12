const inputstring = "javascriptloops"
const vowels = ["a", "e", "i", "o", "u"]

const specificCharsArray = [];
const remainingCharsArray = [];

function vowelsAndConsonants(inputstring) {
    for
        (var i = 0; i < inputstring.length; i++) {
        const character = inputstring[i]
        if (vowels.includes(character)) {
            specificCharsArray.push(character)
        }
        else {
            remainingCharsArray.push(character)
        }
    }
    const outputArr = specificCharsArray.concat(remainingCharsArray)
    const outputString = outputArr.join("\n")
    console.log(outputString)
}



vowelsAndConsonants(inputstring)
