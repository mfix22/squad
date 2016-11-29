module.exports = (model) => {
  const modelObj = require(`./${model}.json`)
  const entries = Object.keys(modelObj).map( (key) => {
    return [key, modelObj[key]]
  })

  return {
    validate: validate.bind(null, entries),
    extract: extract.bind(null, entries)
  }
}

function validate (entries, item, opts) {
  const { includeOptional } = opts

  if (!includeOptional) {
    entries = entries.filter(isRequired)
  } else {
    entries = entries.forEach(trimOptional)
  }

  console.log('Is valid: ' + entries.every(isValid))
  return entries.every(isValid)
}

function extract (entries, item, opts) {
  const { includeOptional } = opts

  if (!includeOptional) {
    entries = entries.filter(isRequired)
  } else {
    entries = entries.forEach(trimOptional)
  }

  const validProps = new Set()
  entries.filter(isValid).forEach( ([prop]) => validProps.add(prop) )

  const clean = {}

  item.entries().forEach( ([key, value]) => {
    if (validProps.has(key))
      clean[key] = value
  })

  return clean
}

function isValid (entry, item) {
  const [prop, type] = entry

  if (item.hasOwnProperty(prop)) {
    switch (type) {
      case 'string':
        return typeof item[modelProp] === 'string'
               && item[modelProp] !== '';
      case 'array':
        return Array.isArray(item[modelProp])
      case 'array-nonempty':
        return Array.isArray(item[modelProp])
               && item[modelProp].length
      case 'number':
        return typeof item[modelProp] === 'number'
      case 'object':
        return typeof item[modelProp] === 'object'
    }
  }
  return false
}

function isRequired ([prop]) {
  return prop.charAt(prop.length - 1) === '?'
}

function trimOptional ([prop, type]) {
  return isOptional(prop) ? [prop.slice(0, -1), type] : [prop, type]
}
