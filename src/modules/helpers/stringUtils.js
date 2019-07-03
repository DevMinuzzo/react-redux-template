export function cleanString(string, aditionalCharacters = []) {
  if(!string) return ''
  let result = string
  aditionalCharacters.forEach(el => {
    result = result.replace(new RegExp(el, 'gi'), '')
  })
  return result
    .replace(/\./g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/\-/g, '')
    .replace(/\ /g, '')
    .replace(/\//g, '')
    .replace(/\ /g, '')
    .replace(/\$/g, '')
    .replace(/\,/g, '')
    .replace(/\%/g, '')
    .replace(/\:/g, '')
    .trim()
}

export function stringNormalizer(string) {
  if (!string) return
  return string
    .replace(new RegExp('[àáâãäå]', 'gi'), 'a')
    .replace(new RegExp('æ', 'gi'), 'ae')
    .replace(new RegExp('ç', 'gi'), 'c')
    .replace(new RegExp('[èéêë]', 'gi'), 'e')
    .replace(new RegExp('[ìíîï]', 'gi'), 'i')
    .replace(new RegExp('ñ', 'gi'), 'n')
    .replace(new RegExp('[òóôõö]', 'gi'), 'o')
    .replace(new RegExp('œ', 'gi'), 'oe')
    .replace(new RegExp('[ùúûü]', 'gi'), 'u')
    .replace(new RegExp('[ýÿ]', 'gi'), 'y')
    .toUpperCase()
}

export function replaceURLWithHTMLLinks(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i
  return text.replace(exp,"<a href='$1'>$1</a>")
}