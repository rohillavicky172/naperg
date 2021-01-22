import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { IssuedCard } from '../IssuedCard.type'
import '../Style.css'
import utils from '../../utils'
import DateComponent from '../../nav/DateComponent'
import PaymentMethodFormatIssuedCard from '../../card/single/PaymentMethodFormatIssuedCard'
import IssuedCardDesignSmall from './IssuedCardDesignSmall'

type Props = {
  issuedCard: IssuedCard
}

const SingleIssuedCardList = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  return (
    <Grid container>
      <Grid item xs={11} className="">
        <Grid container>
          <Grid item xs={12} sm={2} className="marginAuto">
            <IssuedCardDesignSmall issuedCard={props.issuedCard} />
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            {`"${props.issuedCard.name}"`}
            <br />
            {props.issuedCard.issuedCardStripe && utils.mappingStatusIssuedCard(props.issuedCard.issuedCardStripe.status)}
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            <DateComponent date={props.issuedCard.createdAt} />
          </Grid>
          <Grid item xs={12} sm={4} className="marginAuto">
            {props.issuedCard.issuedCardStripe && (
              <PaymentMethodFormatIssuedCard showIcon={false} source={props.issuedCard.issuedCardStripe} />
            )}
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            {props.issuedCard.user.firstName} {props.issuedCard.user.lastName}
            {context.me.role === 'ADMIN' && (
              <>
                <br />({props.issuedCard.companie.name})
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} className="marginAuto">
        <Grid item xs={12} sm={1} className="marginAuto">
          <Icon>arrow_forward_ios</Icon>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SingleIssuedCardList
