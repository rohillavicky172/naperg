import React from 'react'
import { Dialog, DialogContent, DialogActions, Button, Grid } from '@material-ui/core/'

const CampaignHelp = () => {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <Dialog maxWidth={'md'} fullWidth={true} open={show} onClose={() => setShow(false)}>
        <DialogContent>
          <h2>Help</h2>
          <div>
            <Grid container>
              <Grid item xs={12} sm={12} className="">
                <h3>Frequency CRON Format</h3>
              </Grid>
              <Grid item xs={12} sm={6} className="">
                <a target="_blanck" href="https://crontab.guru/">
                  <Button color="primary" variant="outlined">
                    cronmaker.com
                  </Button>
                </a>
              </Grid>
              <Grid item xs={12} sm={6} className="">
                <a target="_blanck" href="https://www.freeformatter.com/sql-formatter.html">
                  <Button color="primary" variant="outlined">
                    Format SQL
                  </Button>
                </a>
              </Grid>
              <Grid item xs={12} sm={12} className="">
                <pre>
                  {`
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

`}
                </pre>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} className="">
                <h3>Keywords</h3>
              </Grid>
              <Grid item xs={6} sm={6} className="">
                <h3>Details</h3>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{firstName}}`}</pre>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{lastName}}`}</pre>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{email}}`}</pre>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{campaignId}}`}</pre>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{companieName}}`}</pre>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{resetPasswordToken}}`}</pre>
              </Grid>
            </Grid>
            {/* <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{now}}`}</pre>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{now}}`}</pre>
              </Grid>
            </Grid> */}
            {/* <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{now-365}}`}</pre>
              </Grid>
              <Grid item xs={6} sm={6} className="marginAuto">
                Now minus 365 days
              </Grid>
            </Grid> */}
            {/* <Grid container>
              <Grid item xs={6} sm={6} className="">
                <pre>{`{{now-1}}`}</pre>
              </Grid>
            </Grid> */}

            <br />
            <h3>Link reset password</h3>
            <pre className="bgGrey">
              {`https://app.nachonacho.com/resetPassword?mode=invitationAdmin&resetPasswordToken={{resetPasswordToken}}&email={{email}}&firstName={{firstName}}&lastName={{lastName}}`}
            </pre>

            <br />
            <h3>SQL Examples</h3>
            <h4>Basis User with Date</h4>
            <pre className="bgGrey">
              {`
select
* 
from
(
   select
      count(CampaignHistoric.id) as countCampaignHistorict,
      User.id,
      User.email,
      User.firstName,
      User.lastName,
      User.isSuspended,
      User.unsubscribe 
   from
      User 
      left join
         CampaignHistoric 
         on CampaignHistoric.userId = User.id 
         and CampaignHistoric.campaignId = "{{campaignId}}"
   WHERE
      User.isSuspended = false 
      and User.unsubscribe = false
      and signupType="FORM"
      AND createdAt BETWEEN DATE_SUB(NOW(), INTERVAL 10 DAY) AND DATE_SUB(NOW(), INTERVAL 2 DAY);
   group by
      User.id 
) as a 
where
countCampaignHistorict = 0 


              `}
            </pre>
            <h4>Basis with company</h4>
            <pre className="bgGrey">
              {`

-- no sources


SELECT
   u.userId,
   u.email,
   u.firstName,
   u.lastName,
   urc.id AS UserRoleCompanieID,
   Companie.id as companieId,
   Companie.name as companieName 
FROM
   (
      -- j table: get all users where a user received an email within all campaign in a window period
      select
         j.* 
      from
         (
            select
               v.*,
               count(CampaignHistoric.id) as countCampaignHistorictUserLevel 
            from
               (
                  -- a table: get all users where a user never received an email withing the campaign
                  select
                     a.* 
                  from
                     (
                        select
                           count(CampaignHistoric.id) as countCampaignHistorict,
                           User.id as userId,
                           User.email,
                           User.firstName,
                           User.lastName,
                           User.isSuspended,
                           User.unsubscribe 
                        from
                           User 
                           left join
                              CampaignHistoric 
                              on CampaignHistoric.userId = User.id 
                              and CampaignHistoric.campaignId = "{{campaignId}}" 
                        WHERE
                           User.isSuspended = false 
                           and User.unsubscribe = false 
                        group by
                           User.id 
                     )
                     as a 
                  where
                     countCampaignHistorict = 0 
               )
               as v 
               left join
                  CampaignHistoric 
                  on CampaignHistoric.userId = v.userId 
                  and CampaignHistoric.createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY) 
            group by
               v.userId 
         )
         as j 
      where
         j.countCampaignHistorictUserLevel = 0 
   )
   as u 
   JOIN
      UserRoleCompanie as urc 
      ON u.userId = urc.userId 
      AND urc.id = 
      (
         -- y table: select the companie per user where this companie has 0 sources 
         Select
            y.userRoleCompanieId 
         from
            (
               SELECT
                  UserRoleCompanie.id as userRoleCompanieId,
                  count(Source.id) as sourceCount 
               FROM
                  UserRoleCompanie 
                  LEFT join
                     Companie 
                     on Companie.id = UserRoleCompanie.companieId 
                  LEFT join
                     Source 
                     on Source.companieId = Companie.id 
               where
                  UserRoleCompanie.userId = u.userId 
                  AND Companie.isPersonal = false 
               group by
                  UserRoleCompanie.id,
                  Companie.id,
                  u.userId 
               order by
                  Companie.createdAt ASC 
            )
            as y 
         where
            y.sourceCount = 0 Limit 1 
      )
   LEFT JOIN
      Companie 
      ON urc.companieId = Companie.id 		
      


              `}
            </pre>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShow(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="outlined" color="primary" onClick={() => setShow(true)}>{`Help`}</Button>
    </>
  )
}

export default CampaignHelp
