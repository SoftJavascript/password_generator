const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')



const randomFunc = {
  lower: getRamdomLower,
  upper: getRamdomUpper,
  number: getRamdomNumber,
  symbol: getRamdomSymbol
}

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password =resultEl.innerText
  if (!password) { return }

  textarea.value =password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert(`Password copied to clipboard!`)
})

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked

  // console.log((length, hasLower, hasUpper, hasNumber, hasSymbol));
  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)

})

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = ''
  const typesCount = lower + upper + number + symbol
  let typesArrprevious = [{lower}, {upper}, {number}, {symbol}, {lower}, {upper}, {lower}, {upper}]
  var typesArr = [];

  function randomArray(typesArrprevious, typesArr) {
    if (length <= 6) {
      typesArr = createRandomArr(typesArrprevious.slice(0, 6));
      return typesArr;
    } else {
      typesArr = createRandomArr(typesArrprevious.slice(0, 6));
      for (let index = 0; index < 4; index++) {
        typesArrprevious = [...typesArrprevious, ...typesArrprevious]
        typesArrprevious = createRandomArr(typesArrprevious)
      }
      typesArr = [...typesArr, ...typesArrprevious]
      return typesArr
    }
  }

  
  typesArr = randomArray(typesArrprevious, typesArr)
  console.log(typesArr);

  var trueArr = [];

 function keepOnlyTrue(typesArr) {
  for (let value of Object.values(typesArr)) {
    var valueArr = value;
    var trueOrFalse = Object.values(value)[0]
    if(trueOrFalse === true){
      trueArr.push(valueArr)
    } 
  }
  return(trueArr)
 }

  if(typesCount === 0){
    return ''
  }

  for (let i = 0; i < length; i += typesCount) {
    keepOnlyTrue(typesArr).forEach(type => {
      console.log(typesArr);
      const funcName = Object.keys(type)[0]
      console.log(funcName);
      generatedPassword += randomFunc[funcName]()
    })
  }
  const finalPassword = generatedPassword.slice(0, length)
  return createRandomArr(finalPassword)
}

function getRamdomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRamdomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRamdomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRamdomSymbol() {
  const symbols = ':/;.,?=+`%ù$*€^¨-_)°!(&'
  return symbols[Math.floor(Math.random() * symbols.length)]
}

function createRandomArr(arr) {
  var i, j, tmp;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
  }
  return arr;
}