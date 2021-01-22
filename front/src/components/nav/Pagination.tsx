import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { useLocation } from 'react-router-dom'
import { Icon, Grid } from '@material-ui/core/'
import { Link } from 'react-router-dom'

const queryString = require('query-string')

type Props = {
  first: number
  page: number
  count: number
}

const Pagination = (props: Props) => {
  const location = useLocation()
  const getUrl = (direction: number) => {
    let url = ''
    let parsed = queryString.parse(location.search)

    parsed.page = props.page * 1 + direction
    url = location.pathname + '?' + queryString.stringify(parsed)

    return url
  }

  const goToPage = (page: number) => {
    let url = ''
    let parsed = queryString.parse(location.search)

    parsed.page = page
    url = location.pathname + '?' + queryString.stringify(parsed)

    return url
  }

  let first = props.first

  first = first ? first : props.count

  let totalPage = Math.ceil(props.count / first)

  return (
    <>
      {props.count > 0 && (
        <>
          <Grid container>
            <Grid xs={12} item sm={3} className="marginAuto">
              {props.count} {`Results`}
            </Grid>
            <Grid xs={12} item sm={9} className="marginAuto tac">
              {props.page * 1 - 1 <= 0 ? (
                <>
                  <IconButton size="small" disabled color="secondary">
                    <Icon>skip_previous</Icon>
                  </IconButton>

                  <IconButton size="small" disabled color="secondary">
                    <Icon>keyboard_arrow_left</Icon>
                  </IconButton>
                </>
              ) : (
                <>
                  <Link to={goToPage(1)}>
                    <IconButton size="small" color="secondary">
                      <Icon>skip_previous</Icon>
                    </IconButton>
                  </Link>
                  <Link to={getUrl(-1)}>
                    <IconButton size="small" color="secondary">
                      <Icon>keyboard_arrow_left</Icon>
                    </IconButton>
                  </Link>
                </>
              )}
              <span>
                {`Page: ${props.page}`} of {totalPage}
              </span>

              {totalPage > props.page * 1 ? (
                <>
                  <Link to={getUrl(1)}>
                    <IconButton size="small" color="secondary">
                      <Icon>keyboard_arrow_right</Icon>
                    </IconButton>
                  </Link>
                  <Link to={goToPage(totalPage)}>
                    <IconButton size="small" color="secondary">
                      <Icon>skip_next</Icon>
                    </IconButton>
                  </Link>
                </>
              ) : (
                <>
                  <IconButton size="small" disabled color="secondary">
                    <Icon>keyboard_arrow_right</Icon>
                  </IconButton>

                  <IconButton size="small" disabled color="secondary">
                    <Icon>skip_next</Icon>
                  </IconButton>
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Pagination
