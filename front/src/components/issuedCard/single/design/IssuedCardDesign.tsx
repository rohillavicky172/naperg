import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { IssuedCard } from '../../IssuedCard.type'
import CopyToClipboardIcon from '../CopyToClipboardIcon'
// import ImageTemplate from '../../../nav/ImageTemplate'
import NumberCardFormat from './NumberCardFormat'
import '../../Style.css'
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

class IssuedCardDesign extends React.Component<Props, State> {
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
    let issuedCardBG = 'constissuedCardVirtualBG'

    if (this.props.issuedCard.type === 'physical') {
      issuedCardBG = 'constissuedCardPhysicalBG'
    }
    if (this.props.issuedCard.issuedCardType === 'REWARD') {
      issuedCardBG = 'constissuedCardRewardBG'
    }

    return (
      <div
        className="issuedCardContainer"
        onMouseEnter={() => this.hoverOn('whiteBlue')}
        onMouseLeave={() => this.hoverOff('blue')}>
        <div className={`issuedCard ${issuedCardBG}`}>
          <Grid container>
            <Grid item xs={6} className="firstLine">
              <div className="nameCardDesign">{this.props.issuedCard.name}</div>
              {this.props.issuedCard.initProduct && (
                <div className="">
                  <img
                    className="logoProduct"
                    src={utils.getUrlFileMedia(this.props.issuedCard.initProduct.nameFile)}
                    alt="NachoCard"
                  />
                  {/* <ImageTemplate format="verySmall" nameFile={this.props.issuedCard.initProduct.nameFile} /> */}
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className="tac issuedCardNumber fs-block" data-private>
              {this.props.issuedCard.issuedCardStripe.number ? (
                <>
                  <NumberCardFormat number={this.props.issuedCard.issuedCardStripe.number} />{' '}
                  {this.props.showCopyToClipboard && (
                    <span onMouseEnter={() => this.hoverOn('white')} onMouseLeave={() => this.hoverOff('whiteBlue')}>
                      <CopyToClipboardIcon
                        issuedCard={this.props.issuedCard}
                        colorButtonCopyClipBoard={this.state.colorButtonCopyClipBoard}
                      />
                    </span>
                  )}
                </>
              ) : (
                <span>XXXX XXXX XXXX {this.props.issuedCard.last4}</span>
              )}
            </Grid>
          </Grid>
          <Grid container className="issuedCardThirdRow">
            <Grid item xs={8} className=" issuedCardExpiry">
              {'Expiry'} {utils.twoDigits(this.props.issuedCard.issuedCardStripe.exp_month)}/
              {this.props.issuedCard.issuedCardStripe.exp_year}
            </Grid>
            <Grid item xs={4} className=" issuedCardCVC">
              {'CVC'} {this.props.issuedCard.issuedCardStripe.cvc ? <>{this.props.issuedCard.issuedCardStripe.cvc}</> : <>XXX</>}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8} className="issuedCardName">
              {/* {this.props.issuedCard.issuedCardStripe.cardholder.billing.name} */}

              {!this.props.issuedCard.companie.isPersonal && <div>{this.props.issuedCard.companie.name}</div>}
            </Grid>
            {/* <Grid item xs={4} className="tar issuedCardVisa">
              <img src="/nachocard/visa_white.png" alt="Visa" className="issuedCardImageVisa" />
            </Grid> */}
          </Grid>
        </div>
      </div>
    )
  }
}

export default withContext(IssuedCardDesign)
