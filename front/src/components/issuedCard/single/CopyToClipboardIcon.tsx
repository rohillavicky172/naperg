import React from 'react'
import Icon from '@material-ui/core/Icon'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { IssuedCard } from '../IssuedCard.type'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import '../Style.css'
import CustomTooltip from '../../nav/customTooltip/CustomTooltip'

type State = {}

type Props = {
  context: Context
  colorButtonCopyClipBoard: string
  issuedCard: IssuedCard
}

class CopyToClipboardIcon extends React.Component<Props, State> {
  onCopy = () => {
    this.props.context.openSnackBar(true, 'Copied to clipboard', 'message', 2000)
  }

  render() {
    return (
      <>
        {this.props.issuedCard.issuedCardStripe.number && (
          <span className={this.props.colorButtonCopyClipBoard + ' cursor'}>
            <CustomTooltip
              placementDesktop={'right-start'}
              type={'copyClipboardIssuedCardTooltip'}
              userId={this.props.context.me.id}
              text={`Copy the 16 digit number to clipboard, and pay your vendor with this credit card. All charges will show up in your Transactions tab.`}>
              {/* <Tooltip title="Copy to clipboard"> */}
              <CopyToClipboard text={this.props.issuedCard.issuedCardStripe.number} onCopy={this.onCopy}>
                <Icon classes={{ root: 'iconCopyToClipboard' }}>file_copy</Icon>
                {/* </Tooltip> */}
              </CopyToClipboard>
            </CustomTooltip>
          </span>
        )}
      </>
    )
  }
}

export default withContext(CopyToClipboardIcon)
