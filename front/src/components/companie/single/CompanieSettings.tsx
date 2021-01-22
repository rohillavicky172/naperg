import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'
import Icon from '@material-ui/core/Icon'
import SingleCompanie from './SingleCompanie'
import CompanieImage from './image/CompanieImage'
import MarketplaceAgreement from '../../contract/MarketplaceAgreement'
import BusinessLeadership from './BusinessLeadership'
import SingleCompanieAdmin from './SingleCompanieAdmin'
import { Context } from '../../Context.type'
import { useHistory, useLocation } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import Addresses from '../../addresse/list/Addresses'
import CompanieAccountType from './CompanieAccountType'
import { Companie } from '../Companie.type'
import ProductOwner from '../../product/single/el/ProductOwner'
import UseWindowDimensions from '../../UseWindowDimensions'
import AddProductToSeller from '../../product/single/AddProductToSeller'
import CompanyRedeemPromoCode from './CompanyRedeemPromoCode'
// import { Link } from 'react-router-dom'
const queryString = require('query-string')

type Props = {
  companie: Companie
}
const CompanieSettings = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const location = useLocation()
  const history = useHistory()
  const handleChange = (object, value) => {
    let parsed = queryString.parse(location.search)
    parsed.mode = value
    history.replace('?' + queryString.stringify(parsed))
  }

  const isMobile = UseWindowDimensions.isMobile()
  const parsed = queryString.parse(location.search)
  let mode = parsed.mode ? parsed.mode : 'profile'
  return (
    <div className="">
      <Grid container>
        <Grid item xs={2} sm={1} md={2} lg={2} xl={1} className="">
          <Tabs orientation="vertical" value={mode} onChange={handleChange} aria-label="Settings">
            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'profile' ? 'secondary' : ''}>domain</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Profile'}
              value={'profile'}
            />

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'address' ? 'secondary' : ''}>where_to_vote</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Address'}
              value={'address'}
            />
            {/* {props.companie.typeCompanie === 'BUYER' && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'notifications' ? 'secondary' : ''}>notifications</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Notifications'}
                value={'notifications'}
              />
            )} */}

            {!props.companie.isPersonal && context.userRoleCompanie.permissions.includes('canSeeBeneficialOwnership') && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'beneficialOwnership' ? 'secondary' : ''}>outlined_flag</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Beneficial Ownership'}
                value={'beneficialOwnership'}
              />
            )}

            {props.companie.typeCompanie === 'BUYER' && context.userRoleCompanie.permissions.includes('canRedeemPromoCode') && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'promoCode' ? 'secondary' : ''}>local_offer</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Promo Code'}
                value={'promoCode'}
              />
            )}

            {!props.companie.isPersonal && props.companie.typeCompanie === 'BUYER' && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'accountType' ? 'secondary' : ''}>vpn_key</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Account Type'}
                value={'accountType'}
              />
            )}

            {props.companie.typeCompanie === 'SELLER' && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'marketplaceAgreement' ? 'secondary' : ''}>text_snippet</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Marketplace Agreement'}
                value={'marketplaceAgreement'}
              />
            )}
            {context.me.role === 'ADMIN' && (
              <>
                {props.companie.typeCompanie === 'SELLER' && (
                  <Tab
                    classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                    icon={
                      <>
                        <Icon className={mode === 'addProductToSeller' ? 'secondary' : ''}>insert_photo</Icon>
                        <span className="white">___</span>
                      </>
                    }
                    label={isMobile ? '' : 'Add product'}
                    value={'addProductToSeller'}
                  />
                )}
              </>
            )}

            {context.me.role === 'ADMIN' && (
              <Tab
                id="securityIcon"
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'admin' ? 'secondary' : ''}>security</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Admin'}
                value={'admin'}
              />
            )}

            {context.me.role === 'ADMIN' && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'productOwner' ? 'secondary' : ''}>insert_photo</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Product Owner (Admin)'}
                value={'productOwner'}
              />
            )}
            {/* <Link to={'/settings/' + context.me.id}>
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={''}>accessibility_new</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'User Profile'}
              />
            </Link> */}
          </Tabs>
        </Grid>
        <Grid item xs={10} sm={11} md={10} lg={10} xl={11} className="">
          <div className="paperOut">
            <div className="paperOut">
              {mode === 'profile' && (
                <>
                  <div className="paperOut">
                    <h3>Profile</h3>
                  </div>

                  {context.me.role === 'ADMIN' && <CompanieImage companieId={props.companie.id} />}
                  <SingleCompanie companieId={props.companie.id} />
                </>
              )}

              {mode === 'beneficialOwnership' && (
                <>
                  {context.userRoleCompanie.permissions.includes('canSeeBeneficialOwnership') && (
                    <>
                      {!props.companie.isPersonal && (
                        <>
                          <div className="paperOut">
                            <h3>Beneficial Ownership</h3>
                          </div>

                          <BusinessLeadership companieId={props.companie.id} />
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {mode === 'promoCode' && <CompanyRedeemPromoCode companieId={props.companie.id} />}
              {mode === 'accountType' && <CompanieAccountType companie={props.companie} />}
              {mode === 'marketplaceAgreement' && <MarketplaceAgreement companie={props.companie} />}
              {mode === 'addProductToSeller' && <AddProductToSeller companie={props.companie} />}

              {mode === 'address' && (
                <>
                  <div className="paperOut">
                    <h3>Addresses</h3>
                  </div>
                  <Addresses
                    title={'Billing address'}
                    canDelete={false}
                    canCreateIfMoreThanOne={false}
                    type="BILLING"
                    userId={context.me.id}
                    variables={{
                      where: {
                        companie: {
                          id: props.companie.id,
                        },
                        type: 'BILLING',
                      },
                    }}
                  />
                  <Addresses
                    title={props.companie.isPersonal ? 'Home address' : 'Business address'}
                    canDelete={false}
                    canCreateIfMoreThanOne={false}
                    type="MAILING"
                    userId={context.me.id}
                    variables={{
                      where: {
                        companie: {
                          id: props.companie.id,
                        },
                        type: 'MAILING',
                      },
                    }}
                  />
                </>
              )}
              {context.me.role === 'ADMIN' && (
                <>
                  {mode === 'admin' && (
                    <>
                      <div className="paperOut">
                        <h3>Company Admin</h3>
                      </div>
                      <SingleCompanieAdmin companieId={props.companie.id} />
                    </>
                  )}
                </>
              )}

              {context.me.role === 'ADMIN' && <>{mode === 'productOwner' && <ProductOwner companieId={props.companie.id} />}</>}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default CompanieSettings
