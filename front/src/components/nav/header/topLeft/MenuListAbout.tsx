import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import ToggleTestMode from '../ToggleTestMode'
import UserRoleCompanieMenuList from '../../../userRoleCompanie/list/UserRoleCompanieMenuList'

const MenuListAbout = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  return (
    <>
      <div onClick={() => context.toggleDrawerLeft(false)}>
        {context.me && context.me.id && (
          <UserRoleCompanieMenuList
            onClose={() => {}}
            variables={{
              where: {
                user: { id: context.me.id },
                isInvitationApproved: true,
                isDeleted: false,
                companie: {
                  deletedLogically: false,
                },
              },
            }}
          />
        )}
        <Link to={'/company/createCompany'}>
          <MenuItem>
            <Grid container>
              <Grid item xs={2} className=""></Grid>
              <Grid item xs={10} className="">
                {`+ Buyer Account`}
              </Grid>
            </Grid>
          </MenuItem>
        </Link>
      </div>
      {context.me && (context.me.role === 'ADMIN' || context.me.role === 'INFLUENCER' || context.me.role === 'SELLER') && (
        <>
          <div className="tac">
            <ToggleTestMode onClick={() => context.toggleDrawerLeft(false)} />
          </div>
        </>
      )}
    </>
  )
}

export default MenuListAbout
