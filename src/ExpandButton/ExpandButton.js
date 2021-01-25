import React from 'react'
import './ExpandButton.css'

export default function ExpandButton(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['ExpandButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

ExpandButton.defaultProps ={
  tag: 'a',
}
