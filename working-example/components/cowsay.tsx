import React from 'react'
import cowsay from 'cowsay-browser'

const typedcowsay: any = cowsay

type TCowsayHi = {
  text?: string
}

function CowsayHi(props: TCowsayHi) {
  return (
    <pre>
      {typedcowsay.say({ text: `${props.text}` })} <br />
    </pre>
  )
}

CowsayHi.defaultProps = {
  text: 'Hi from cowsay!',
}

export default CowsayHi
