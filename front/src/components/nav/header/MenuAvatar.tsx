import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import ImageTemplate from '../ImageTemplate'
import MenuListRight from './MenuListRight'

type Props = {
  nameFile: string
}

export default function SimpleMenu(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div id="buttonAvatar">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <ImageTemplate format={'avatar'} nameFile={props.nameFile} />
      </Button>
      <Menu
        className="menuAvatarList"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuListRight onClose={handleClose} />
      </Menu>
    </div>
  )
}
