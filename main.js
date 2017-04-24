let decodeBits = function(bits){
  bits = bits.replace(/^0+|0+$/g, '')
  let transmisisonRate = getTransmissionRate(bits)
  let result = ''
  let prev = 1
  let count = 0
  
  for (let i = 0; i < bits.length; i++) {
    let bit = Number(bits[i])
    if (bit === prev) count++
    else {
      result += addMorseCode(transmisisonRate, prev, count)
      count = 1
      prev = bit
    }
    
    if (i === bits.length - 1) {
     result += addMorseCode(transmisisonRate, prev, count)
    }
  }
  return result
}

let addMorseCode = function (transmisisonRate, prev, count) {
  if (prev === 1) return (count / transmisisonRate === 1) ? '.' : '-'
  else if (prev === 0) {
    if (count / (transmisisonRate * 3) === 1) return ' '
    else if (count / (transmisisonRate * 7) === 1) return '   '
    else return ''
  }
}

let getTransmissionRate = function (bits) {
  let regex = /(1+)(0+)?/g
  let ones = new Set()
  let zeros = new Set()
  
  match = regex.exec(bits)
  while (match != null) {
    ones.add(match[1].length)
    if(match[2]) zeros.add(match[2].length)
    match = regex.exec(bits)
  }
  
  return Math.min(Math.min.apply(null , [...ones]), Math.min.apply(null , [...zeros]))
}

let decodeMorse = function(morseCode){    
    morseCode = morseCode.trim()
    let words = morseCode.split('   ')
    let translation = words.map(word => word.split(' ').map(ch => MORSE_CODE[ch]))
    return translation.map(word => word.join('')).join(' ')
}
