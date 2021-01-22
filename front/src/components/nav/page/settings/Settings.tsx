import React from 'react'
import { Tabs, Paper, Grid, Tab, Icon } from '@material-ui/core'
// import { Link } from 'react-router-dom'
import Addresses from '../../../addresse/list/Addresses'
import UserPhoneQuery from '../../../user/single/phone/UserPhoneQuery'
import AuthDevice2FAQuery from '../../../user/single/2fa/AuthDevice2FAQuery'
import UpdatePassword from '../../../user/auth/UpdatePassword'
import UserProfileDetails from '../../../user/single/profile/sectionDetails/UserProfileDetails'
import UserRoleCompanieAdminQuery from '../../../userRoleCompanie/list/UserRoleCompanieAdminQuery'
import UserProfileDetailsAdmin from '../../../user/single/profile/sectionDetails/UserProfileDetailsAdmin'
import Slacks from '../../../slack/Slacks'
import UserSocials from '../../../user/single/profile/sectionDetails/UserSocials'
import UserPhoto from '../../../user/single/profile/sectionDetails/UserPhoto'
import UserEmailContainer from '../../../user/single/profile/sectionDetails/UserEmailContainer'
import AuthDevicesSection from '../../../authDevice/list/AuthDevicesSection'
import CreateSellerCompanie from '../../../companie/single/CreateSellerCompanie'
import CreateAffiliateCompanie from '../../../companie/single/affiliate/CreateAffiliateCompanie'
import TotpPage from '../../../user/single/phone/totp/TotpPage'
import UseWindowDimensions from '../../../UseWindowDimensions'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import UpdateGravatarProfile from '../../../user/single/profile/sectionDetails/UpdateGravatarProfile'
import UpdateMetadataProfile from '../../../user/single/profile/sectionDetails/UpdateMetadataProfile'
import UserRoleCompanieQuery from '../../../userRoleCompanie/list/UserRoleCompanieQuery'
import SubscribeEmailSettings from '../../../user/single/profile/sectionDetails/subscribeEmail/SubscribeEmailSettings'
import ManageFile from '../../../file/ManageFile'
import UserRoleCompanieReviewQuery from '../../../userRoleCompanie/list/userRoleCompanieReview/UserRoleCompanieReviewQuery'

const queryString = require('query-string')

type Props = {
  userId: string
}

const Settings = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const history = useHistory()
  const location = useLocation()
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
                  <Icon className={mode === 'profile' ? 'secondary' : ''}>accessibility_new</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Profile'}
              value={'profile'}
            />

            {context.me.role === 'ADMIN' && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'userRoleCompanieAdmin' ? 'secondary' : ''}>location_city</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'My companies (admin)'}
                value={'userRoleCompanieAdmin'}
              />
            )}

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'social' ? 'secondary' : ''}>device_hub</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Social'}
              value={'social'}
            />

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'updatePassword' ? 'secondary' : ''}>vpn_key</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Password'}
              value={'updatePassword'}
            />

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'updatePhone' ? 'secondary' : ''}>perm_phone_msg</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Phone'}
              value={'updatePhone'}
            />

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'updateEmail' ? 'secondary' : ''}>email</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Email'}
              value={'updateEmail'}
            />

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
            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  {mode === 'slack' ? (
                    <img src={'/logo/slack/slack-secondary.png'} width={'24px'} alt="Slack logo" />
                  ) : (
                    <img src={'/logo/slack/slack-grey.png'} width={'24px'} alt="Slack logo" />
                  )}

                  {/* <Icon className={mode === 'slack' ? 'secondary' : ''}>message</Icon> */}
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Slack'}
              value={'slack'}
            />

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'devices' ? 'secondary' : ''}>screen_lock_portrait</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Devices'}
              value={'devices'}
            />
            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'security' ? 'secondary' : ''}>security</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Security'}
              value={'security'}
            />

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'userRoleCompanieReview' ? 'secondary' : ''}>star_rate</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Reviews'}
              value={'userRoleCompanieReview'}
            />

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'shippingAddress' ? 'secondary' : ''}>house</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : 'Shipping'}
              value={'shippingAddress'}
            />

            <Tab
              classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
              icon={
                <>
                  <Icon className={mode === 'createSellerCompanie' ? 'secondary' : ''}>work</Icon>
                  <span className="white">___</span>
                </>
              }
              label={isMobile ? '' : '+ Seller Act.'}
              value={'createSellerCompanie'}
            />

            {context.me.role === 'ADMIN' && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'createAffiliateCompanie' ? 'secondary' : ''}>work</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : '+ Affiliate Act. (Admin)'}
                value={'createAffiliateCompanie'}
              />
            )}

            {context.me.role === 'ADMIN' && (
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={mode === 'profileAdmin' ? 'secondary' : ''}>pan_tool</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Admin'}
                value={'profileAdmin'}
              />
            )}

            {/* <Link to={'/company/' + context.userRoleCompanie.companie.id}>
              <Tab
                classes={{ root: 'rootTabSettings', wrapper: 'tabSettings' }}
                icon={
                  <>
                    <Icon className={''}>domain</Icon>
                    <span className="white">___</span>
                  </>
                }
                label={isMobile ? '' : 'Company Profile'}
              />
            </Link> */}
          </Tabs>
        </Grid>

        <Grid item xs={10} sm={11} md={10} lg={10} xl={11} className="">
          <div className="paperOut">
            <div className="paperOut">
              {mode === 'profile' && (
                <>
                  <h3>{`Profile`}</h3>

                  <UserPhoto userId={props.userId} />
                  <UserProfileDetails userId={props.userId} />
                  <div className="paperOut">
                    <Paper className="paperIn">
                      <h4>Identity Verification</h4>
                      <p className="tal">
                        Please upload a govt. issued photo-ID (passport, drivers license, etc.) that shows your date of birth. If
                        your ID has two sides, upload images of both sides. (PDF, JPG or PNG)
                      </p>
                      <ManageFile userId={props.userId} showDownload onCreate={() => {}} typeFile={'IDENTITY_DOCUMENT'} />
                    </Paper>
                  </div>
                  {context.me.role === 'ADMIN' && (
                    <div className="paperOut">
                      <Paper className="paperIn">
                        <h4>Admin</h4>
                        <UpdateGravatarProfile userId={props.userId} /> <UpdateMetadataProfile userId={props.userId} />
                      </Paper>
                    </div>
                  )}
                </>
              )}
              {context.me.role === 'ADMIN' && <>{mode === 'profileAdmin' && <UserProfileDetailsAdmin userId={props.userId} />}</>}

              {mode === 'social' && <UserSocials userId={props.userId} />}
              {mode === 'userRoleCompanieAdmin' && (
                <>
                  <h3>My companies ( Admin)</h3>
                  <UserRoleCompanieAdminQuery
                    page={1}
                    showPagination={false}
                    variables={{
                      where: {
                        user: {
                          id: props.userId,
                        },
                        isInvitationApproved: true,
                        isDeleted: false,
                        companie: {
                          deletedLogically: false,
                        },
                      },
                      orderBy: 'createdAt_DESC',
                    }}
                  />
                </>
              )}
              {mode === 'userRoleCompanieReview' && (
                <UserRoleCompanieReviewQuery
                  variables={{
                    where: {
                      user: {
                        id: props.userId,
                      },
                      isInvitationApproved: true,
                      isDeleted: false,
                      companie: {
                        deletedLogically: false,
                      },
                    },
                    orderBy: 'createdAt_DESC',
                  }}
                />
              )}

              {mode === 'totp' && (
                <>
                  <TotpPage userId={props.userId} />
                </>
              )}

              {mode === 'shippingAddress' && (
                <Addresses
                  title={'Shipping address'}
                  canDelete={false}
                  canCreateIfMoreThanOne={false}
                  type="SHIPPING"
                  userId={context.me.id}
                  variables={{
                    where: {
                      user: {
                        id: props.userId,
                      },
                      companie: {
                        id: context.userRoleCompanie.companie.id,
                      },
                      type: 'SHIPPING',
                    },
                  }}
                />
              )}
              {mode === 'updateEmail' && <UserEmailContainer userId={props.userId} />}
              {mode === 'updatePassword' && <UpdatePassword />}
              {mode === 'updatePhone' && <UserPhoneQuery userId={props.userId} />}
              {mode === 'devices' && <AuthDevicesSection userId={props.userId} />}
              {mode === 'security' && <AuthDevice2FAQuery userId={props.userId} />}
              {mode === 'createSellerCompanie' && <CreateSellerCompanie userId={props.userId} />}
              {mode === 'createAffiliateCompanie' && <CreateAffiliateCompanie userId={props.userId} />}

              {mode === 'notifications' && (
                <>
                  <SubscribeEmailSettings userId={props.userId} />
                  {context.userRoleCompanie.companie.typeCompanie === 'BUYER' && (
                    <UserRoleCompanieQuery
                      variables={{
                        where: {
                          user: {
                            id: props.userId,
                          },

                          isInvitationApproved: true,
                          isDeleted: false,
                          companie: {
                            deletedLogically: false,
                            id: context.userRoleCompanie.companie.id,
                          },
                        },
                        orderBy: 'createdAt_DESC',
                      }}
                    />
                  )}
                </>
              )}

              {mode === 'slack' && (
                <>
                  <h3>
                    Slack Integration for {context.me.firstName} {context.me.lastName} ({context.userRoleCompanie.companie.name})
                  </h3>

                  <Slacks />
                </>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Settings
