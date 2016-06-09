import React from 'react'
const newlineRegex = /(\r\n|\n\r|\r|\n)/g

export default function nl2br(str) {
  if (typeof str !== 'string') {
    return ''
  }

  return str.split(newlineRegex).map((line, index) => {
    if (line.match(newlineRegex)) {
      return React.createElement('br', { key: index })
    } else {
      return line
    }
  })
}
