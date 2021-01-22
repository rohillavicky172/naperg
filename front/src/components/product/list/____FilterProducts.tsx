
import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Location } from '../../Location.type'

const queryString = require('query-string')

type State = {}

type Props = {
  baseURL: string,
  page: number,
  location: Location
}

class FilterProducts extends React.Component<Props, State> {
  onOrderBy(oderBy: string) {
    let url = ''
    let parsed = queryString.parse(this.props.location.search)

    parsed.orderBy = oderBy
    url = this.props.location.pathname + '?' + queryString.stringify(parsed)

    return url
  }
  render() {
    // const baseURL = this.props.match.path.replace(':page', '')
    const orderBy = queryString.parse(this.props.location.search).orderBy
    return (
      <>
        {orderBy === 'createdAt_DESC' ? (
          <Link to={this.onOrderBy('createdAt_ASC')}>
            <Button color="primary">
              <Icon>keyboard_arrow_up</Icon>createdAt
            </Button>
          </Link>
        ) : (
          <Link to={this.onOrderBy('createdAt_DESC')}>
            <Button color="primary">
              <Icon>keyboard_arrow_down</Icon>createdAt
            </Button>
          </Link>
        )}
        {orderBy === 'name_DESC' ? (
          <Link to={this.onOrderBy('name_ASC')}>
            <Button color="primary">
              <Icon>keyboard_arrow_up</Icon>name
            </Button>
          </Link>
        ) : (
          <Link to={this.onOrderBy('name_DESC')}>
            <Button color="primary">
              <Icon>keyboard_arrow_down</Icon>name
            </Button>
          </Link>
        )}
      </>
    )
  }
}

export default withRouter(FilterProducts)
