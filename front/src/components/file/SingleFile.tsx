import React from 'react'
import Grid from '@material-ui/core/Grid'
import AdblockDetect from './AdblockDetect'
import { File } from './File.type'
import ViewFilePrivate from './ViewFilePrivate'
import DownloadFile from '../nav/file/DownloadFile'
import DeleteFile from './DeleteFile'
// import Button from '@material-ui/core/Button'
// import Icon from '@material-ui/core/Icon'
// import DeleteFile from './DeleteFile'

type Props = {
  file: File
  canDelete: boolean
  showDownload: boolean
}

const SingleFile = (props: Props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={2} className="marginAuto">
          <ViewFilePrivate type={props.file.type} nameFile={props.file.nameFile} />
        </Grid>
        <Grid item xs={12} sm={6} className="marginAuto">
          <div>{props.file.shortNameFile}</div>
          {props.file.description && <div>{props.file.description}</div>}
        </Grid>

        <Grid item xs={12} sm={4} className="marginAuto tar">
          {props.showDownload && (
            <AdblockDetect>
              <DownloadFile file={props.file} />
            </AdblockDetect>
          )}
          {props.canDelete && <DeleteFile fileId={props.file.id} />}
        </Grid>
      </Grid>
    </>
  )
}

export default SingleFile
