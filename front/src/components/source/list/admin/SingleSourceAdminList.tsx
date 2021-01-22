import React from 'react'
import Grid from '@material-ui/core/Grid'
import DateComponent from '../../../nav/DateComponent'
import { Link } from 'react-router-dom'
import { Source } from '../../Source.type'
import PaymentMethodFormatSource from '../../../card/single/PaymentMethodFormatSource'
import RetrieveSourceInStripe from './RetrieveSourceInStripe'
import IsValidated from '../../../user/single/profile/sectionDetails/IsValidated'

type Props = {
  source: Source
}

const SingleSourceAdminList = (props: Props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} className="">
          <PaymentMethodFormatSource showIcon={true} source={props.source} />
          {props.source.nickname && <>{`"${props.source.nickname}"`}</>}
        </Grid>
        <Grid item xs={12} sm={4} className="">
          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.source.isDefaultSource}
            textValidated={'Default source'}
            textNotValidated={'Not Default source'}
          />
        </Grid>
        <Grid item xs={12} sm={4} className="">
          account_holder_name: {props.source.account_holder_name}
        </Grid>
        <Grid item xs={12} sm={4} className="">
          routing_number: {props.source.routing_number}
        </Grid>
        <Grid item xs={12} sm={4} className="">
          status: {props.source.status}
        </Grid>
        <Grid item xs={12} sm={4} className="">
          customer: {props.source.customer}
        </Grid>
        <Grid item xs={12} sm={4} className="">
          externalId: {props.source.externalId}
        </Grid>
        <Grid item xs={12} sm={4} className="">
          object: {props.source.object}
        </Grid>

        <Grid item xs={12} sm={4} className="">
          <Link className="link" to={'/company/' + props.source.companie.id}>
            {props.source.companie.name}
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} className="">
          {props.source.user && (
            <Link className="link" to={'/user/' + props.source.user.id}>
              {props.source.user.firstName} {props.source.user.lastName}
            </Link>
          )}
        </Grid>
        <Grid item xs={12} sm={4} className="">
          <Link className="link" to={'/paymentSource/' + props.source.companie.id}>
            Payment ({props.source.companie.name})
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} className="">
          <DateComponent date={props.source.createdAt} />
        </Grid>
        <Grid item xs={12} sm={4} className="">
          {props.source.plaidData ? (
            <Link className="link" to={'/plaids?plaidDataId=' + props.source.plaidData.id}>
              PlaidData ({props.source.plaidData.verificationStatus ? props.source.plaidData.verificationStatus : 'simpleAuth'})
            </Link>
          ) : (
            <>Simple Stripe</>
          )}
        </Grid>
        <Grid item xs={12} sm={4} className="">
          {/* <DeleteSource sourceId={props.source.id} /> */}
          {props.source.isDeleted ? 'Deleted' : ''}
        </Grid>
        <Grid item xs={12} sm={12} className="">
          <RetrieveSourceInStripe source={props.source} />
        </Grid>
      </Grid>
    </>
  )
}

export default SingleSourceAdminList
