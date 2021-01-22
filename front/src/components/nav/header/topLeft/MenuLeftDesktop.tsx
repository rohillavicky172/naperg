import Icon from '@material-ui/core/Icon'
import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import MenuListLeft from './MenuListLeft'
import './Style.css'
import CustomTooltip from '../../customTooltip/CustomTooltip'

type Props = {
  showCreateCompanie: boolean
}

const MenuLeftDesktop = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <CustomTooltip
        placementDesktop={'bottom-start'}
        type={'switchAccountsTooltip'}
        userId={context.me.id}
        text={`Switch accounts or create new ones`}>
        <Button
          id={'buttonSelectCompanie'}
          variant="outlined"
          color="primary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}>
          {context.userRoleCompanie && context.userRoleCompanie.companie.name}
          {context.userRoleCompanie.companie.typeCompanie === 'SELLER' && (
            <>
              <div className={'white'}>_</div>
              <div className="secondary">{`(Seller Station)`}</div>
            </>
          )}
          {anchorEl ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
        </Button>
      </CustomTooltip>

      <Menu
        className="menuAvatarList"
        classes={{ paper: 'paperMenuLeft' }}
        id={'buttonSelectCompanie'}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuListLeft showCreateCompanie={props.showCreateCompanie} onClose={handleClose} />
      </Menu>
    </div>
  )
}

export default MenuLeftDesktop
