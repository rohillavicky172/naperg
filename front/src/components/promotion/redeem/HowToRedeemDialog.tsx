import React from 'react'
import { IssuedCard } from '../../issuedCard/IssuedCard.type'
import { Dialog, Grid, DialogContent, DialogActions, Button, Icon, IconButton } from '@material-ui/core'
import ViewField from '../../product/single/edit/wysiwyg/ViewField'
import GoToVendorWebsite from '../../issuedCard/single/GoToVendorWebsite'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import ImageTemplate from '../../nav/ImageTemplate'
import { Promotion } from '../Promotion.type'

// const useStyles = makeStyles(() =>
//   createStyles({
//     dialogContentRedeem: {
//       zIndex: 99999,
//     },
//   })
// )

type Props = {
  promotion: Promotion
  issuedCard: IssuedCard
}

const HowToRedeemDialog = (props: Props) => {
  // const classes = useStyles()
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const isNewCard = parsed.isNewCard === 'true'
  const [show, setShow] = React.useState(isNewCard ? true : false)

  return (
    <>
      <Dialog
        classes={{ root: 'dialogContentRedeem' }}
        // classes={{ root: classes.dialogContentRedeem }}
        open={show}
        maxWidth={'xs'}
        fullWidth={false}
        onClose={() => setShow(false)}>
        <DialogContent>
          <Grid container>
            <Grid item xs={8} className="tal">
              <Grid container>
                <Grid item xs={4} className="marginAuto">
                  <h3>{props.promotion.product.name}</h3>
                </Grid>
                <Grid item xs={4} className="marginAuto">
                  <ImageTemplate format="verySmall" nameFile={props.promotion.product.nameFile} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} className="tar">
              <IconButton onClick={() => setShow(false)}>
                <Icon>close</Icon>
              </IconButton>
            </Grid>
          </Grid>

          <div className="primary">
            <h3>Reward Details</h3>
            <div>{props.promotion.text1}</div>
            <div>{props.promotion.text2}</div>
            <div className="italic">{props.promotion.text3}</div>
          </div>
          <div style={{ height: '20px' }} />
          <h3>How to redeem</h3>
          {props.promotion.typeRedeem === 'LINK_NOT_REQUIRED' && (
            <div>
              <p>
                NOTE: This reward is only available to <span className="italic fontWeight18">new users</span>.
              </p>
              <p>
                To redeem this reward, go to the vendor's website by clicking on the button "Go to Vendor's Website" below. Sign
                up on their website as a regular customer. When asked for a credit card, enter the card you created on this
                page.That's it! Your rewards will show up automatically in your NachoNacho account.
              </p>
            </div>
          )}
          {props.promotion.typeRedeem === 'LINK_REQUIRED' && (
            <div>
              <p>
                NOTE: This reward is only available to <span className="italic fontWeight18">new users</span>.
              </p>
              <p>
                To redeem this reward, go to the vendor's website by clicking on the button "Go to Vendor's Website" below. Sign
                up on their website as a regular customer. When asked for a credit card, enter the card you created on this page.
                That's it! Your rewards will show up automatically in your NachoNacho account.
              </p>
              <p>
                IMPORTANT: Make sure you click on the "Go to Vendor's Website" button below to set up your account. Clicking on
                that link is necessary for the vendor's verification. You will not get your rewards if you don't click on it.
              </p>
            </div>
          )}
          {props.promotion.typeRedeem === 'CUSTOM_FIELD' && <ViewField text={props.promotion.howToRedeem} />}
        </DialogContent>

        <DialogActions>
          <GoToVendorWebsite issuedCard={props.issuedCard} />
          <Button onClick={() => setShow(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div className="primary">
        <h3>Reward Details</h3>
        <div>{props.promotion.text1}</div>
        <div>{props.promotion.text2}</div>
        <div className="italic">{props.promotion.text3}</div>
      </div>
      <br />
      <Button variant="contained" color="secondary" onClick={() => setShow(true)}>{`How to Redeem`}</Button>
    </>
  )
}

export default HowToRedeemDialog
