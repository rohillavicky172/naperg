import React from 'react'
import { History } from '../../../History.type'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router'
import NotFound from '../../error/NotFound'
import Chip from '@material-ui/core/Chip'
import Error from '../../error/Error'
import Loading from '../../error/Loading'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { ISSUED_CARD_QUERY } from '../../../issuedCard/GraphQL'
// import ImageTemplate from '../../ImageTemplate'
// import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'
// import Avatar from '@material-ui/core/Avatar'

const queryString = require('query-string')

type State = {}

type Props = {
  variables: any
  history: History
  location: Location
  issuedCardQuery: any
}

class IssuedCardIdFilterQuery extends React.Component<Props, State> {
  onDelete = () => {
    let parsed = queryString.parse(this.props.location.search)
    delete parsed.issuedCardId
    delete parsed.page

    this.props.history.push('?' + queryString.stringify(parsed))
  }

  render() {
    if (this.props.issuedCardQuery.error) {
      return (
        <Error
          message={
            this.props.issuedCardQuery.error.graphQLErrors.length && this.props.issuedCardQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.issuedCardQuery.loading) {
      return <Loading />
    }
    if (!this.props.issuedCardQuery) {
      return <NotFound />
    }

    if (!this.props.issuedCardQuery.issuedCard) {
      return <NotFound />
    }

    return (
      <div className="margin2">
        <Chip
          avatar={<img alt={'avatar'} src={'/nachocard/visa_xxxx_square.png'} className="" />}
          label={this.props.issuedCardQuery.issuedCard.name}
          onDelete={this.onDelete}
          variant="outlined"
        />
      </div>
    )
  }
}

export default compose(
  graphql(ISSUED_CARD_QUERY, {
    name: 'issuedCardQuery',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withRouter
)(IssuedCardIdFilterQuery)
