import React from 'react'
import { withContext } from '../withContext'
import FullStory from 'react-fullstory'
import { FULLSTORY } from '../../config/config'
import { Context } from '../Context.type'
import { FullStoryAPI } from 'react-fullstory'
import { shutdown } from 'react-fullstory'
type State = {}

type Props = {
  context: Context
}

class FullstoryChild extends React.Component<Props, State> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.context.me !== prevProps.context.me) {
      this.identify()
    }
  }
  componentDidMount() {
    this.identify()
  }

  identify = () => {
    if (!this.props.context.me.id) {
      return
    }

    if (
      this.props.context.me.id === 'cjz8wsyb56cqd0948ij7droci' ||
      this.props.context.me.id === 'cjtuf164l1dol074829pmgizk' ||
      this.props.context.me.id === 'cjsqo9wrx6kcx0848zj7sdy95' ||
      this.props.context.me.id === 'cjtc2rjx20evs0748z88oxrq8' ||
      this.props.context.me.id === 'cjjt9s9iw037f0748raxmnnde' ||
      this.props.context.me.id === 'cjtgcf5k50kth0748ycyixj6m'
    ) {
      shutdown()
      return
    }

    if (process.env.REACT_APP_ENV !== 'production') {
      shutdown()
      return
    }

    FullStoryAPI('identify', this.props.context.me.id, {
      displayName: this.props.context.me.firstName + ' ' + this.props.context.me.lastName,
      email: this.props.context.me.email,
      firstName: this.props.context.me.firstName,
      lastName: this.props.context.me.lastName,
    })
  }

  render() {
    if (!FULLSTORY.ORG_ID) {
      return null
    }
    return <FullStory org={FULLSTORY.ORG_ID} />
  }
}

export default withContext(FullstoryChild)
