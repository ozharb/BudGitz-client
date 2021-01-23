import React from 'react'
import './AppButton.css'

export default function AppButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['AppButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

AppButton.defaultProps ={
  tag: 'a',
}
