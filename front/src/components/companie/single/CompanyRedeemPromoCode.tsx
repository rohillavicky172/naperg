import React from 'react'
import SettingsCompaniePromoCodes from '../../promoCode/list/SettingsCompaniePromoCodes'
import RedeemPromoCode from '../../promoCode/RedeemPromoCode'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { Link } from 'react-router-dom'
import { Button, Paper } from '@material-ui/core'

type Props = {
  companieId: string
}

const CompanyRedeemPromoCode = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  return (
    <>
      <div className="paperOut">
        <h3>Promo Code</h3>
        <Paper className="paperIn">
          <RedeemPromoCode onUpdate={() => {}} companieId={props.companieId} />
        </Paper>
      </div>

      <SettingsCompaniePromoCodes companieId={props.companieId} />

      {context.me && context.me.role === 'ADMIN' && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>Admin</h3>
            <Link to={`/admin/promoCodes/?companieId=${props.companieId}`}>
              <Button variant="outlined">PromoCodes</Button>
            </Link>{' '}
            <Link to={`/admin/createPromoCode/${props.companieId}`}>
              <Button variant="outlined">Create promoCode</Button>
            </Link>
          </Paper>
        </div>
      )}
      {/* <BusinessLeadership companieId={props.companie.id} /> */}
    </>
  )
}

export default CompanyRedeemPromoCode
