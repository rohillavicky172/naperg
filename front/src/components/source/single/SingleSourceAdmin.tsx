import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import DateComponent from '../../nav/DateComponent'
import { Link } from 'react-router-dom'
import { Source } from '../Source.type'
import DeleteSource from './DeleteSource'

type Props = {
  source: Source
}

const SingleSourceAdmin = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={12} className="">
            <h3>Admin</h3>
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
            {props.source.isDefaultSource ? 'Default' : ''}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={'/company/' + props.source.companie.id}>
              {props.source.companie.name}
            </Link>
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
            {props.source.plaidData && (
              <Link className="link" to={'/plaids?plaidDataId=' + props.source.plaidData.id}>
                PlaidData
              </Link>
            )}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {props.source.isDeleted && (
              <>
                Deleted logically on <DateComponent date={props.source.deletedAt} />{' '}
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <DeleteSource source={props.source} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleSourceAdmin
