import { Icon } from '@material-ui/core'
import React from 'react'

type Props = {
  url: string
}

const SupportLink = (props: Props) => {
  return (
    <a target="_blanck" href={props.url}>
      <Icon className="link textSize11 iconAlignTextBottom">contact_support</Icon>
    </a>
  )
}

export default SupportLink
