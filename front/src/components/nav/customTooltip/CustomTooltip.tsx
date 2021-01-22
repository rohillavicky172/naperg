import React, { useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Error from '../error/Error'
import NotFound from '../error/NotFound'
import Loading from '../error/Loading'
import { useQuery } from '@apollo/react-hooks'
import CloseOnboardingNotice from './CloseOnboardingNotice'
import gql from 'graphql-tag'
import './Style.css'
import UseWindowDimensions from '../../UseWindowDimensions'

export const USER_QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      inviteMembersTooltip
      createIssuedCardsTooltip
      switchAccountsTooltip
      createIssuedCardTooltip
      actionIssuedCardTooltip
      spendingLimitIssuedCardTooltip
      expiryDateIssuedCardTooltip
      copyClipboardIssuedCardTooltip
    }
  }
`

type Props = {
  userId: string
  placementDesktop: 'left-start' | 'right-start' | 'bottom' | 'bottom-start'
  type: string
  children: any
  text: string
}

const CustomTooltip = (props: Props) => {
  // const { context }: { context: Context } = React.useContext(AppContext)

  const [open, setOpen] = React.useState(false)
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { where: { id: props.userId } },
  })

  useEffect(() => {
    if (data && data.user) {
      if (data.user[props.type] === true) {
        setTimeout(() => {
          setOpen(true)
        }, 1200)
      }
    }
  }, [data, props.type])
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <Tooltip
      arrow
      placement={isMobile ? 'bottom-start' : props.placementDesktop}
      classes={{ popperArrow: 'popperArrowBanner', tooltip: 'tooltipBanner', arrow: 'arrowBanner' }}
      open={data.user[props.type] === false ? false : open}
      title={
        <React.Fragment>
          <div style={{ pointerEvents: 'all' }} className="">
            <div className="innerTooltipBanner">
              <div className="marginAuto ">
                <p className="textSize9 textTooltip">
                  <CloseOnboardingNotice userId={props.userId} type={props.type} /> {props.text}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      }>
      {props.children}
    </Tooltip>
  )
}

export default CustomTooltip
