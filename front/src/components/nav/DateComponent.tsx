import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
// var parse = require('date-fns/parse')
// var format = require('date-fns/format')
import { formatISO } from 'date-fns'
import { format } from 'date-fns'
type Props = {
  date: Date
  // label: string
  // context: Context,
  formatString?: string
}

const DateComponent = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)
  const [showNotAdmin, setShowNotAdmin] = useState(true)

  if (!props.date) {
    return null
  }
  return (
    <>
      {(context.me && context.me.role) === 'ADMIN' && !showNotAdmin ? (
        <div>
          <strong className="cursor" onClick={() => setShowNotAdmin(true)}>
            <Icon className="textSize7">access_time</Icon> (admin)
          </strong>
          <br />
          <pre>
            - LocaTime: {formatISO(new Date(props.date)).toString()}
            <br />- ZuluTime: {props.date.toString()}
          </pre>
        </div>
      ) : (
        <>
          {props.formatString && format(new Date(props.date), props.formatString)}
          {!props.formatString && format(new Date(props.date), 'MMM dd, yyyy')}
          {context.me && context.me.role === 'ADMIN' && (
            <span onClick={() => setShowNotAdmin(false)}>
              <Tooltip title={formatISO(new Date(props.date))}>
                <Icon className="cursor black textSize7">access_time</Icon>
              </Tooltip>
            </span>
          )}
        </>
      )}
    </>
  )
}

export default DateComponent
