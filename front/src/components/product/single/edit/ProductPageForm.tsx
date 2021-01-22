import React from 'react'
import UploadFile from '../../../nav/file/UploadFile'
import { FormControl, InputLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import { Product } from '../../Product.type'
import EditField from './wysiwyg/EditField'
import utils from '../../../utils'

type Props = {
  updateProductData: (product: Product) => void
  onFormValide: (isFormValide: boolean) => void
  product: Product
}

const ProductPageForm = (props: Props) => {
  const maxShortDescription = 120
  const maxName = 25
  const [nameValide, setNameValide] = React.useState(true)
  const [shortDescriptionValide, setShortDescriptionValide] = React.useState(true)
  const [sellerLinkValide, setSellerLinkValide] = React.useState(true)

  const isFormValide = () => {
    return Boolean(nameValide && shortDescriptionValide && props.product.name.length && sellerLinkValide)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="name">
              {`Product Name (as seen by buyers) `} ({props.product.name.length}/{maxName})
            </InputLabel>
            <Input
              id="name"
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                props.updateProductData({
                  ...props.product,
                  name: e.target.value,
                })

                setNameValide(e.target.value.length <= maxName ? true : false)

                props.onFormValide(isFormValide())
              }}
              error={!nameValide || !props.product.name.length}
              type="text"
              value={props.product.name}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="sellerLink">{`URL for Landing Page (when buyer clicks Subscribe)`}</InputLabel>
            <Input
              id="sellerLink"
              placeholder={'https://'}
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                props.updateProductData({
                  ...props.product,
                  sellerLink: e.target.value,
                })

                setSellerLinkValide(utils.isURL(e.target.value) || e.target.value.length === 0)

                props.onFormValide(isFormValide())
              }}
              error={!sellerLinkValide}
              type="text"
              value={props.product.sellerLink}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="shortDescription">
              {`Short Description - plain text only`} ({props.product.shortDescription.length}/{maxShortDescription})
            </InputLabel>
            <Input
              classes={{ root: 'width100per' }}
              id="shortDescription"
              multiline
              rowsMax="10"
              error={!shortDescriptionValide}
              value={props.product.shortDescription}
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                props.updateProductData({
                  ...props.product,
                  shortDescription: e.target.value,
                })

                setShortDescriptionValide(e.target.value.length <= maxShortDescription ? true : false)

                props.onFormValide(isFormValide())
              }}
            />
          </FormControl>
        </Grid>

        <br />
        <Grid item xs={12}>
          <h3>{`Detailed Description`}</h3>
          <EditField
            text={props.product.productDescription}
            onChange={(text) => {
              props.updateProductData({
                ...props.product,
                productDescription: text,
              })
              props.onFormValide(isFormValide())
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="paperOut">
            <Paper className="paperIn">
              <h4>{`Logo`}</h4>
              {'200x200px'}
              <UploadFile
                format="SQUARE"
                deleteImageText={`Delete image`}
                nameFile={props.product.nameFile}
                onSelectFile={(nameFile) => {
                  props.updateProductData({
                    ...props.product,
                    nameFile: nameFile,
                  })
                  props.onFormValide(isFormValide())
                }}
              />
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="paperOut">
            <Paper className="paperIn">
              <h4>{`Vertical Banner`}</h4>
              {'Half Page format Banner: 300x600px'}
              <UploadFile
                format={'BANNER_VERTICAL'}
                deleteImageText={`Delete image`}
                nameFile={props.product.nameFileBanner}
                onSelectFile={(nameFileBanner) => {
                  props.updateProductData({
                    ...props.product,
                    nameFileBanner: nameFileBanner,
                  })
                  props.onFormValide(isFormValide())
                }}
              />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductPageForm
