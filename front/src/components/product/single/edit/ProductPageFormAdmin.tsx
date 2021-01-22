import React from 'react'
import UploadFile from '../../../nav/file/UploadFile'
import { Checkbox, FormControl, FormControlLabel, InputLabel, Slider } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { Product } from '../../Product.type'
import EditField from './wysiwyg/EditField'

import utils from '../../../utils'

type Props = {
  updateProductData: (product: Product) => void
  onFormValide: (isFormValide: boolean) => void
  product: Product
}

const ProductPageFormAdmin = (props: Props) => {
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
            <InputLabel htmlFor="subName">subName</InputLabel>
            <Input
              id="subName"
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                props.updateProductData({
                  ...props.product,
                  subName: e.target.value,
                })
                props.onFormValide(isFormValide())
              }}
              type="text"
              value={props.product.subName}
            />
          </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="textButton">textButton</InputLabel>
            <Input
              id="textButton"
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                props.updateProductData({
                  ...props.product,
                  textButton: e.target.value,
                })
                props.onFormValide(isFormValide())
              }}
              type="text"
              value={props.product.textButton}
            />
          </FormControl>
        </Grid> */}

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
              <FormControl className="width100per">
                <InputLabel htmlFor="altNameFile">{`altNameFile (leave empty to get the productName)`}</InputLabel>
                <Input
                  id="altNameFile"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.updateProductData({
                      ...props.product,
                      altNameFile: e.target.value,
                    })

                    props.onFormValide(isFormValide())
                  }}
                  type="text"
                  value={props.product.altNameFile}
                />
              </FormControl>
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
                    nameFileBanner,
                  })
                  props.onFormValide(isFormValide())
                }}
              />
              <FormControl className="width100per">
                <InputLabel htmlFor="altNameFileBanner">{`altNameFileBanner`}</InputLabel>
                <Input
                  id="altNameFileBanner"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.updateProductData({
                      ...props.product,
                      altNameFileBanner: e.target.value,
                    })

                    props.onFormValide(isFormValide())
                  }}
                  type="text"
                  value={props.product.altNameFileBanner}
                />
              </FormControl>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="paperOut">
            <Paper className="paperIn">
              <h4>{`Preview og:Image`}</h4>
              {'1200x630px'}
              <UploadFile
                format={'1200_630'}
                deleteImageText={`Delete image`}
                nameFile={props.product.previewOgImage}
                onSelectFile={(previewOgImage) => {
                  props.updateProductData({
                    ...props.product,
                    previewOgImage,
                  })
                  props.onFormValide(isFormValide())
                }}
              />
            </Paper>
          </div>
        </Grid>
      </Grid>

      <div style={{ height: '50px' }} />
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Admin</h3>
          <Grid item xs={6}>
            levelBtoB ({props.product.levelBtoB}%)
            <Slider
              value={props.product.levelBtoB}
              onChange={(event: any, newValue: number | number[]) => {
                props.updateProductData({
                  ...props.product,
                  levelBtoB: Number(newValue),
                })
                props.onFormValide(isFormValide())
              }}
              marks={[
                { value: 5, label: 'Consumer' },
                { value: 95, label: 'BtoB' },
              ]}
              valueLabelDisplay="auto"
              step={2}
              min={0}
              max={100}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={'Select'}>
              <InputLabel htmlFor="visibility">{`Visibility`}</InputLabel>
              <Select
                id="visibility"
                value={props.product.visibility}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.updateProductData({
                    ...props.product,
                    visibility: e.target.value,
                  })
                  props.onFormValide(isFormValide())
                }}>
                <MenuItem value={'HIDDEN'}>{`HIDDEN`}</MenuItem>
                <MenuItem value={'PUBLIC'}>{`PUBLIC`}</MenuItem>
                <MenuItem value={'ORPHAN'}>{`ORPHAN`}</MenuItem>
                {/* <MenuItem value={'CREATED_BY_ISSUED_CARD'}>{`CREATED_BY_ISSUED_CARD`}</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl className={'Select'}>
              <InputLabel htmlFor="typeProduct">{`typeProduct`}</InputLabel>
              <Select
                id="typeProduct"
                value={props.product.typeProduct}
                onChange={(e: React.ChangeEvent<{ value: 'BTOB' | 'CONSUMER' | 'BTOB_AND_CONSUMER' }>) => {
                  props.updateProductData({
                    ...props.product,
                    typeProduct: e.target.value,
                  })
                  props.onFormValide(isFormValide())
                }}>
                <MenuItem value={'BTOB'}>{`BTOB`}</MenuItem>
                <MenuItem value={'CONSUMER'}>{`CONSUMER`}</MenuItem>
                <MenuItem value={'BTOB_AND_CONSUMER'}>{`BTOB_AND_CONSUMER`}</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                label={`showMarketplace`}
                control={
                  <Checkbox
                    checked={props.product.showMarketplace}
                    onChange={(e) => {
                      props.updateProductData({
                        ...props.product,
                        showMarketplace: e.target.checked,
                      })
                      props.onFormValide(isFormValide())
                    }}
                  />
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                label={`showShowcase`}
                control={
                  <Checkbox
                    checked={props.product.showShowcase}
                    onChange={(e) => {
                      props.updateProductData({
                        ...props.product,
                        showShowcase: e.target.checked,
                      })

                      props.onFormValide(isFormValide())
                    }}
                  />
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={'Select'}>
              <InputLabel htmlFor="productFrequency">{`productFrequency`}</InputLabel>
              <Select
                id="productFrequency"
                value={props.product.productFrequency}
                onChange={(e: React.ChangeEvent<{ value: 'SUBSCRIPTION' | 'ONE_OFF' }>) => {
                  props.updateProductData({
                    ...props.product,
                    productFrequency: e.target.value,
                  })
                  props.onFormValide(isFormValide())
                }}>
                <MenuItem value={'ONE_OFF'}>{`One Off`}</MenuItem>
                <MenuItem value={'SUBSCRIPTION'}>{`Subscription`}</MenuItem>
                {/* <MenuItem value={'RECURRING'}>{`RECURRING`}</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={'Select'}>
              <InputLabel htmlFor="creationType">{`creationType`}</InputLabel>
              <Select
                id="creationType"
                value={props.product.creationType}
                onChange={(
                  e: React.ChangeEvent<{ value: 'CREATED_BY_USER' | 'CREATED_BY_ADMIN' | 'CREATED_BY_ISSUED_CARD' }>
                ) => {
                  props.updateProductData({
                    ...props.product,
                    creationType: e.target.value,
                  })
                  props.onFormValide(isFormValide())
                }}>
                <MenuItem value={'CREATED_BY_USER'}>{`CREATED_BY_USER`}</MenuItem>
                <MenuItem value={'CREATED_BY_ADMIN'}>{`CREATED_BY_ADMIN`}</MenuItem>
                <MenuItem value={'CREATED_BY_ISSUED_CARD'}>{`CREATED_BY_ISSUED_CARD`}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor="urlName">{`URL Name: No spaces (admin)`}</InputLabel>
              <Input
                id="urlName"
                onChange={(e) => {
                  props.updateProductData({
                    ...props.product,
                    urlName: e.target.value,
                  })
                  props.onFormValide(isFormValide())
                }}
                type="text"
                value={props.product.urlName}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor="privateData">{`privateData`}</InputLabel>
              <Input
                id="privateData"
                classes={{ root: 'width100per' }}
                multiline
                value={props.product.privateData}
                onChange={(e) => {
                  props.updateProductData({
                    ...props.product,
                    privateData: e.target.value,
                  })
                  props.onFormValide(isFormValide())
                }}
              />
            </FormControl>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default ProductPageFormAdmin
