import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { File } from '../../File.type'
import { Link } from 'react-router-dom'
import DateComponent from '../../../nav/DateComponent'
import ViewFilePrivate from '../../ViewFilePrivate'
import DownloadFile from '../../../nav/file/DownloadFile'
import utils from '../../../utils'
import DeleteFileAdmin from '../../DeleteFileAdmin'

type Props = {
  file: File
}

const SingleFileAdmin = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={4} className="">
            <div>
              {`Company: `}{' '}
              {props.file.companie && (
                <Link className="link" to={'/company/' + props.file.companie.id}>
                  {props.file.companie.name}
                </Link>
              )}
            </div>
            <div>
              {`Contract: `}{' '}
              {props.file.contract && (
                <Link className="link" to={'/contract/' + props.file.contract.id}>
                  {props.file.contract.title1}
                </Link>
              )}
            </div>
            <div>
              {`Invoice: `}{' '}
              {props.file.invoice && (
                <Link className="link" to={'/invoice/' + props.file.invoice.id}>
                  {utils.smallIdFormat(props.file.invoice.smallId)}
                </Link>
              )}
            </div>

            <div>
              {`User: `}{' '}
              {props.file.user && (
                <Link className="link" to={'/user/' + props.file.user.id}>
                  {props.file.user.firstName} {props.file.user.lastName}
                </Link>
              )}
            </div>

            <div>
              {`createdBy: `}{' '}
              {props.file.createdBy && (
                <Link className="link" to={'/user/' + props.file.createdBy.id}>
                  {props.file.createdBy.firstName} {props.file.createdBy.lastName}
                </Link>
              )}
            </div>
            <div>
              Subscription:{' '}
              {props.file.subscription && (
                <Link className="link" to={'/subscription/' + props.file.subscription.id}>
                  {props.file.subscription.product.name}
                </Link>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <div>
              {`shortNameFile: `}
              {props.file.shortNameFile}
            </div>
            <div>
              {`description: `}
              {props.file.description}
            </div>
            <div>
              {`Created At: `}
              <DateComponent date={props.file.createdAt} />
            </div>
            <div>isDeleted: {props.file.isDeleted ? 'true' : 'false'}</div>
            <div>typeFile: {props.file.typeFile}</div>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {/* {`Original product: `}{' '} */}
            {/* <Link className="link" to={'/product/' + props.file.product.id + '/' + props.file.product.name}>
              {props.file.product.name}
            </Link> */}

            <ViewFilePrivate type={props.file.type} nameFile={props.file.nameFile} />
            <DownloadFile file={props.file} />
            {/* {`Name of product: `} {props.file.productName}
            <br />
            {`Vendor's website: `} {props.file.website} */}
            <br />
            <DeleteFileAdmin fileId={props.file.id} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleFileAdmin
