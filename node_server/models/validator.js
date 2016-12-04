module.exports = (model) => {
  const modelObj = require(`./schemas/${model}.json`)
  const entries = Object.keys(modelObj).map( (key) => {
    return [key, modelObj[key]]
  })

  return {
    validate: validate.bind(null, entries),
    extract: extract.bind(null, entries)
  }
}

function validate (entries, item, opts) {
  let includeOptional = false;

  // check options
  if (opts) {
    includeOptional = opts.includeOptional
  }

  if (!includeOptional) {
    entries = entries.filter(isRequired)
  } else {
    entries = entries.map(trimOptional)
  }

  return entries.every(isValid.bind(null, item))
}

function extract (entries, item, opts) {
  let includeOptional = false;

  // check options
  if (opts) {
    includeOptional = opts.includeOptional;
  }

  if (!includeOptional) {
    entries = entries.filter(isRequired)
  } else {
    entries = entries.map(trimOptional)
  }

  const clean = {}

  entries.forEach( (entry) => {
    const [key, value] = entry
    if (isValid(item, entry)) {
      clean[key] = item[key]
    } else {
      clean[key] = getDefault(entry)
    }
  })

  return clean
}

function isValid (item, entry) {
  const [modelProp, modelType] = entry

  if (item.hasOwnProperty(modelProp)) {
    switch (modelType) {
      case 'string':
        return typeof item[modelProp] === 'string'
               && item[modelProp] !== ''
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

function getDefault (entry) {
  const [prop, type] = entry
  switch (type) {
    case 'string':
      return ''
    case 'array':
    case 'array-nonempty':
      return []
    case 'number':
      return 0
    case 'object':
      return {}
  }
}

function isRequired ([prop]) {
  return prop.charAt(prop.length - 1) !== '?'
}

function trimOptional ([prop, type]) {
  return !isRequired(prop) ? [prop.slice(0, -1), type] : [prop, type]
}
