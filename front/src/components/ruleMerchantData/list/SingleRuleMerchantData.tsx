import React from 'react'
import { Paper, Button, Grid } from '@material-ui/core'
import { RuleMerchantData } from '../RuleMerchantData.type'
import UpdateRuleMerchantData from '../UpdateRuleMerchantData'
import DeleteRuleMerchantData from '../DeleteRuleMerchantData'
import { Link } from 'react-router-dom'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'
import DateComponent from '../../nav/DateComponent'

type Props = {
  ruleMerchantData: RuleMerchantData
  onUpdate: () => void
}

const SingleRuleMerchantData = (props: Props) => {
  const [show, setShow] = React.useState(false)
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={12} className="">
            Created at: <DateComponent date={props.ruleMerchantData.createdAt} />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {props.ruleMerchantData.product.name} (
            <Link className="link" to={`/admin/product/${props.ruleMerchantData.productId}`}>
              {props.ruleMerchantData.productId}
            </Link>
            )
          </Grid>
          <Grid item xs={12} sm={4} className="">
            User:{' '}
            {props.ruleMerchantData.user && (
              <Link className="link" to={`/user/${props.ruleMerchantData.user.id}`}>
                {props.ruleMerchantData.user.firstName} {props.ruleMerchantData.user.lastName}
              </Link>
            )}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={`/adminInvoices/?ruleMerchantDataId=${props.ruleMerchantData.id}`}>
              Invoices
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={`/logs/?ruleMerchantDataId=${props.ruleMerchantData.id}`}>
              Logs
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.ruleMerchantData.isActive}
              textValidated={'Rule Active'}
              textNotValidated={'Rule not active'}
            />
          </Grid>
          <Grid item xs={12} sm={12} className="">
            {show ? (
              <>
                <UpdateRuleMerchantData
                  ruleMerchantData={props.ruleMerchantData}
                  onUpdate={(ruleMerchantData: RuleMerchantData) => {
                    setShow(false)
                    props.onUpdate()
                    // setRuleMerchantData(ruleMerchantData)
                  }}
                />
                <DeleteRuleMerchantData ruleMerchantData={props.ruleMerchantData} />
                <Button onClick={() => setShow(false)}>Cancel</Button>
              </>
            ) : (
              <>
                <Grid container>
                  <Grid item xs={12} sm={2} className="">
                    Name
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.nameRule}
                  </Grid>
                  <Grid item xs={12} sm={4} className="">
                    {props.ruleMerchantData.nameValue}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={2} className="">
                    category
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.categoryRule}
                  </Grid>
                  <Grid item xs={12} sm={4} className="">
                    {props.ruleMerchantData.categoryValue}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={2} className="">
                    network_id
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.network_idRule}
                  </Grid>
                  <Grid item xs={12} sm={4} className="">
                    {props.ruleMerchantData.network_idValue}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={2} className="">
                    country
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.countryRule}
                  </Grid>
                  <Grid item xs={12} sm={4} className="">
                    {props.ruleMerchantData.countryValue}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={2} className="">
                    City
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.cityRule}
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.cityValue}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={2} className="">
                    State
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.stateRule}
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.stateValue}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={2} className="">
                    Postal_code
                  </Grid>
                  <Grid item xs={12} sm={2} className="">
                    {props.ruleMerchantData.postal_codeRule}
                  </Grid>
                  <Grid item xs={12} sm={4} className="">
                    {props.ruleMerchantData.postal_codeValue}
                  </Grid>
                </Grid>
                <Button onClick={() => setShow(true)}>Edit</Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleRuleMerchantData
