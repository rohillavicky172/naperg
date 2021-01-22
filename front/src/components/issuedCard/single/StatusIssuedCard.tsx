import React from 'react'
import { flowRight as compose } from 'lodash'
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Location } from '../../Location.type'
import { IssuedCard } from '../IssuedCard.type'
import { withRouter } from 'react-router'
import UpdateStatusIssuedCard from '../action/UpdateStatusIssuedCard'
import CustomTooltip from '../../nav/customTooltip/CustomTooltip'

type State = {
  anchorEl: any
}

type Props = {
  context: Context
  issuedCard: IssuedCard
  location: Location
}

class StatusIssuedCard extends React.Component<Props, State> {
  state = {
    anchorEl: null,
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state

    const isMyCard = this.props.context.me.id === this.props.issuedCard.user.id

    return (
      <>
        {this.props.issuedCard.status !== 'canceled' && (
          <>
            {((this.props.context.userRoleCompanie.permissions.includes('canCancelMyIssuedCards') && isMyCard) ||
              (this.props.context.userRoleCompanie.permissions.includes('canCancelIssuedCardsInCompanie') && !isMyCard)) && (
              <>
                <CustomTooltip
                  placementDesktop={'left-start'}
                  type={'actionIssuedCardTooltip'}
                  userId={this.props.context.me.id}
                  text={`Suspend or cancel your NachoCard`}>
                  <Button
                    variant="outlined"
                    color="primary"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}>
                    {this.props.issuedCard.status === 'inactive' ? <>{`Suspended`}</> : <>{`Active`}</>}
                  </Button>
                </CustomTooltip>
                <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} keepMounted onClose={this.handleClose}>
                  {/* <ToggleActiveIssuedCard onUpdated={this.handleClose} issuedCard={this.props.issuedCard}/> */}
                  {this.props.issuedCard.status === 'active' && (
                    <UpdateStatusIssuedCard
                      onClick={this.handleClose}
                      type="MenuItem"
                      status={`inactive`}
                      text={'Suspend NachoCard'}
                      issuedCard={this.props.issuedCard}
                    />
                  )}
                  {this.props.issuedCard.status === 'inactive' && (
                    <UpdateStatusIssuedCard
                      onClick={this.handleClose}
                      type="MenuItem"
                      status={`active`}
                      text={'Reactivate Nachocard'}
                      issuedCard={this.props.issuedCard}
                    />
                  )}
                  <MenuItem>
                    <Link to={'/cancelIssuedCard/' + this.props.issuedCard.id}>{`Cancel NachoCard`}</Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </>
        )}
      </>
    )
  }
}

export default compose(withContext, withRouter)(StatusIssuedCard)
