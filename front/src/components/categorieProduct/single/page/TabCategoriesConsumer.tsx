import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'react-router'
import { Match } from '../../../Match.type'
import { History } from '../../../History.type'
// import '../Style.css'

type State = {
  urlName: string
}

type Props = {
  match: Match
  history: History
}

class TabCategoriesConsumer extends React.Component<Props, State> {
  state = {
    urlName: ''
  }

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.match.params.urlName !== prevProps.match.params.urlName) {
      this.setState({ urlName: this.props.match.params.urlName })
    }
  }

  componentDidMount = () => {
    this.setState({ urlName: this.props.match.params.urlName })
  }

  handleChange = (event, selected) => {
    this.props.history.push('/marketplaceConsumer/' + selected)
  }

  render() {
    return (
      <Paper className="headerCategories">
        <Tabs centered value={this.state.urlName} indicatorColor="primary" textColor="primary" onChange={this.handleChange}>
          <Tab className="tabHeaderCategories" value={'featuredConsumer'} label="FEATURED PRODUCTS" />
          <Tab className="tabHeaderCategories" value={'all'} label="CATEGORIES" />
        </Tabs>
      </Paper>
    )
  }
}

export default withRouter(TabCategoriesConsumer)
