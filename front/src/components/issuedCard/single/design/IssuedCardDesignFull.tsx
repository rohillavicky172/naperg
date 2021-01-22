import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { IssuedCard } from '../../IssuedCard.type'
import CopyToClipboardIcon from '../CopyToClipboardIcon'
import ImageTemplate from '../../../nav/ImageTemplate'
import './Style.css'
import utils from '../../../utils'
import UseWindowDimensions from '../../../UseWindowDimensions'

type State = {
  colorButtonCopyClipBoard: string
}

type Props = {
  context: Context
  issuedCard: IssuedCard
  showCopyToClipboard: boolean
}

class IssuedCardDesignFull extends React.Component<Props, State> {
  state = {
    colorButtonCopyClipBoard: UseWindowDimensions.isMobile() ? 'white' : 'blue',
  }

  hoverOn = (color: string) => {
    const isMobile = UseWindowDimensions.isMobile()
    if (isMobile) {
      color = 'white'
    }
    this.setState({ colorButtonCopyClipBoard: color })
  }

  hoverOff = (color: string) => {
    const isMobile = UseWindowDimensions.isMobile()
    if (isMobile) {
      color = 'white'
    }
    this.setState({ colorButtonCopyClipBoard: color })
  }

  render() {
    return (
      <div
        className="issuedCardContainerFull"
        onMouseEnter={() => this.hoverOn('whiteBlue')}
        onMouseLeave={() => this.hoverOff('blue')}>
        <img alt="NachoCard" className="aspect-ratio" src="/nachocard/blank_nachocard.png" />
        <div className="issuedCardFull">
          <Grid container>
            <Grid item xs={6} className="firstLineFull">
              <div className="">{this.props.issuedCard.name}</div>
              {this.props.issuedCard.initProduct && (
                <div className="logoProduct">
                  <ImageTemplate format="verySmall" nameFile={this.props.issuedCard.initProduct.nameFile} />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className="tac issuedCardNumberFull">
              {this.props.issuedCard.issuedCardStripe.number &&
                utils.numberCardFormat(this.props.issuedCard.issuedCardStripe.number)}{' '}
              {this.props.showCopyToClipboard && (
                <span onMouseEnter={() => this.hoverOn('white')} onMouseLeave={() => this.hoverOff('whiteBlue')}>
                  <CopyToClipboardIcon
                    issuedCard={this.props.issuedCard}
                    colorButtonCopyClipBoard={this.state.colorButtonCopyClipBoard}
                  />
                </span>
              )}
            </Grid>
          </Grid>
          <div className="issuedCardThirdRowFull">
            <Grid container>
              <Grid item xs={8} className=" issuedCardExpiry">
                {'Expiry'} {utils.twoDigits(this.props.issuedCard.issuedCardStripe.exp_month)}/
                {this.props.issuedCard.issuedCardStripe.exp_year}
              </Grid>
              <Grid item xs={4} className=" issuedCardCVC">
                {'CVC'} {this.props.issuedCard.issuedCardStripe.cvc && this.props.issuedCard.issuedCardStripe.cvc}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8} className="issuedCardNameFull">
                {this.props.issuedCard.user.firstName} {this.props.issuedCard.user.lastName}
                {!this.props.issuedCard.companie.isPersonal && <div>{this.props.issuedCard.companie.name}</div>}
              </Grid>
              {/* <Grid item xs={4} className="tar issuedCardVisa">
              <img src="/nachocard/visa_white.png" alt="Visa" className="issuedCardImageVisa" />
            </Grid> */}
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default withContext(IssuedCardDesignFull)
