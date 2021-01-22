import React from 'react'
import Paper from '@material-ui/core/Paper'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">{`Loading...`}</Paper>
    </div>
  )
}

export default Loading
