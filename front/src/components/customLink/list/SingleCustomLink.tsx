import React from 'react'
import { Button, Grid, Paper } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'
import { CustomLink } from '../CustomLink.type'
import EditCustomLink from '../single/EditCustomLink'
import DeleteCustomLink from '../single/DeleteCustomLink'
import { Link } from 'react-router-dom'

type Props = {
  customLink: CustomLink
}

const SingleCustomLink = (props: Props) => {
  const [isEdit, setIsEdit] = React.useState(false)
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        {isEdit ? (
          <EditCustomLink customLink={props.customLink} onUpdate={() => setIsEdit(false)} onCancel={() => setIsEdit(false)} />
        ) : (
          <Grid container>
            <Grid item xs={12} sm={3} className="">
              <Link className="link" to={'/settings/' + props.customLink.user.id}>
                {props.customLink.user.firstName} {props.customLink.user.lastName}
              </Link>
              <div>
                <DateComponent date={props.customLink.createdAt} />
              </div>
            </Grid>
            <Grid item xs={12} sm={5} className="">
              <div>{props.customLink.anchor}</div>
              <div>{props.customLink.link}</div>
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              <Link className="link" to={'/product/' + props.customLink.product.id}>
                {props.customLink.product.name}
              </Link>
            </Grid>

            {/* <Grid item xs={12} sm={2} className="marginAuto">
              <Rating name="rating" value={props.customLink.rating} readOnly />
            </Grid> */}
            <Grid item xs={12} sm={2} className="tar">
              <Button color="primary" variant="outlined" onClick={() => setIsEdit(true)}>
                Edit
              </Button>{' '}
              <DeleteCustomLink customLink={props.customLink} />
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  )
}

export default SingleCustomLink
