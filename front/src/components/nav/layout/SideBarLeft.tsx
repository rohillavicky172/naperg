import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import MenuListAbout from '../header/topLeft/MenuListAbout'
import UseWindowDimensions from '../../UseWindowDimensions'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    sideBarLeft: {
      width: '250px',
    },
    close: {
      display: 'block',
      textAlign: 'right',
      margin: '12px;',
    },
  })
)

const SideBarLeft = () => {
  const classes = useStyles()

  const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = React.useContext(AppContext)
  return (
    <Drawer
      variant={'temporary'}
      className={!isMobile ? 'tintLeft' : ''}
      open={context.isSideBarOpenLeft}
      onClose={() => context.toggleDrawerLeft(false)}>
      <div className={classes.sideBarLeft}>
        <MenuItem onClick={() => context.toggleDrawerLeft(false)} className={classes.close}>
          <Icon>arrow_back</Icon>
        </MenuItem>
        <MenuListAbout />
      </div>
    </Drawer>
  )
}

export default SideBarLeft
