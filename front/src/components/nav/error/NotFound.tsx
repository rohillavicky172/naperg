
import React from 'react'
import { Link } from 'react-router-dom'
// import HeadTags from '../HeadTags'

type Props = {}

type State = {}

class NotFound extends React.Component<Props, State> {
  render() {
    return (
      <div className="tac">
        {/* <HeadTags notSearchable={true} title={`Nor Founded.`} description={`404 error page`} /> */}
        <h2>{`404 Error!`}</h2>
        <br />
        <Link to="/">{`Home`}</Link>
      </div>
    )
  }
}

export default NotFound
