import React from 'react'
import { Link } from 'react-router-dom'
import { Companie } from '../Companie.type'
import CompanieKPI from '../single/CompanieKPI'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import DateComponent from '../../nav/DateComponent'
import utils from '../../utils'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'
import SpoofUser from '../../user/single/action/spoofUser/SpoofUser'
import IsDeletedLogically from '../../nav/IsDeletedLogically'
import { Balance } from '../../balance/Balance.type'
import { Avatar } from '@material-ui/core'
// import ImageTemplate from '../../nav/ImageTemplate'

type Props = {
  companie: Companie
}

const CompanieListSingle = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <Link id={'linkToCompany'} className="link" to={`/company/${props.companie.id}?mode=admin`}>
          {props.companie.name}{' '}
        </Link>
        <IsValidated
          iconNotValidated={'clear'}
          icon={'done'}
          isValidated={props.companie.isVerified}
          textValidated={'Company Verified'}
          textNotValidated={'Company not Verified'}
        />
        {props.companie.typeCompanie === 'BUYER' && (
          <div>
            {props.companie.typeCompanie} {props.companie.balances.length > 1 && <div>ERROR</div>}
            <Tooltip title={`${props.companie.balances.length} Balance`}>
              <span>{props.companie.balances.length}B</span>
            </Tooltip>
            {props.companie.balances.map((balance: Balance) => (
              <>
                {!props.companie.isVerified && (
                  <IsValidated
                    iconNotValidated={'clear'}
                    icon={'attach_money'}
                    isValidated={balance.isEnabled}
                    textValidated={'Auto topup enabled'}
                    textNotValidated={'Auto topup NOT enabled'}
                  />
                )}
              </>
            ))}
          </div>
        )}
        {props.companie.typeCompanie === 'SELLER' && (
          <div>
            {props.companie.typeCompanie} {props.companie.sellerBalances.length === 0 && <div>ERROR</div>}
            {props.companie.sellerBalances.length} Balances
          </div>
        )}
        {props.companie.deletedLogically && <IsDeletedLogically title={'Company deleted'} />}{' '}
        {props.companie.website && (
          <Tooltip title={props.companie.website}>
            <a className="link" target="_blank" rel="noopener noreferrer" href={utils.getUniversalLink(props.companie.website)}>
              <Icon className="iconAlignText textSize8">link</Icon>
            </a>
          </Tooltip>
        )}
      </Grid>

      <Grid item xs={12} sm={2}>
        <DateComponent date={props.companie.createdAt} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CompanieKPI
          companieId={props.companie.id}
          users={props.companie.userRoleCompanies.length}
          invoices={props.companie.invoices.length}
          issuedCards={props.companie.issuedCards.length}
          payments={props.companie.sources.length}
          subscriptions={props.companie.subscriptions.length}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        {props.companie.userRoleCompanies.map((userRoleCompanie) => (
          <div key={userRoleCompanie.id}>
            <Link className="link" to={'/user/' + userRoleCompanie.user.id}>
              {userRoleCompanie.user.firstName} {userRoleCompanie.user.lastName}{' '}
              {userRoleCompanie.user.lastName === '' && `(${userRoleCompanie.user.email})`}
              <SpoofUser user={userRoleCompanie.user} />
            </Link>
          </div>
        ))}
      </Grid>
      <Grid item xs={12} sm={1}>
        {props.companie.nameFile && <Avatar src={utils.getUrlFileMedia(props.companie.nameFile)} />}

        {/* <img src={utils.getUrlFileMedia(props.companie.nameFile)} style={{ maxWidth: '40px' }} /> */}
        {/* <ImageTemplate format={'avatar'} nameFile={props.companie.nameFile} /> */}
      </Grid>
    </Grid>
  )
}

export default CompanieListSingle
