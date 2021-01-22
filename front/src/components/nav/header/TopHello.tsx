import React from 'react'
import MenuAvatar from './MenuAvatar'
// import { Link } from 'react-router-dom'
import { withContext } from '../../withContext'
import Button from '@material-ui/core/Button'
import { Context } from '../../Context.type'
import ImageTemplate from '../ImageTemplate'
import UseWindowDimensions from '../../UseWindowDimensions'
type State = {}

type Props = {
  context: Context
}

class TopHello extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        {this.props.context.me && this.props.context.me.id && (
          <>
            {isMobile ? (
              <Button onClick={() => this.props.context.toggleDrawerRight(true)}>
                <ImageTemplate format={'avatar'} nameFile={this.props.context.me.nameFile} />
              </Button>
            ) : (
              <MenuAvatar nameFile={this.props.context.me.nameFile} />
            )}
          </>
        )}
      </>
    )
  }
}

export default withContext(TopHello)
