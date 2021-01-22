import React from 'react'
import { Input, InputLabel, FormControl, Select, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core/'
import { Campaign } from '../Campaign.type'
// import utils from '../../utils'
import CampaignHelp from './CampaignHelp'

type Props = {
  setCampaign: (campaign: Campaign) => void
  campaign: Campaign
}

const CampaignForm = (props: Props) => {
  return (
    <>
      <CampaignHelp />

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="name">{`name`}</InputLabel>
          <Input
            id="name"
            type="text"
            multiline
            value={props.campaign.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setCampaign({
                ...props.campaign,
                name: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="frequency">{`frequency`}</InputLabel>
          <Input
            id="frequency"
            type="text"
            value={props.campaign.frequency}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setCampaign({
                ...props.campaign,
                frequency: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="type">{`type`}</InputLabel>
          <Select
            id="type"
            value={props.campaign.type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setCampaign({
                ...props.campaign,
                type: e.target.value as Campaign['type'],
              })
            }>
            <MenuItem value={'MAIL_AWS'}>{`MAIL_AWS`}</MenuItem>
            <MenuItem value={'CREATE_HISTORIC'}>{`CREATE_HISTORIC`}</MenuItem>
            <MenuItem value={'SLACK'}>{`SLACK`}</MenuItem>
            <MenuItem value={'MAIL_POSTMARK'}>{`MAIL_POSTMARK`}</MenuItem>
            <MenuItem value={'SMS_TWILIO'}>{`SMS_TWILIO (WIP)`}</MenuItem>
          </Select>
        </FormControl>
      </div>

      {(props.campaign.type === 'MAIL_AWS' || props.campaign.type === 'MAIL_POSTMARK') && (
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="bcc">{`bcc`}</InputLabel>
            <Input
              id="bcc"
              type="text"
              multiline
              value={props.campaign.bcc}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setCampaign({
                  ...props.campaign,
                  bcc: e.target.value,
                })
              }
            />
          </FormControl>
        </div>
      )}

      {(props.campaign.type === 'MAIL_AWS' || props.campaign.type === 'MAIL_POSTMARK') && (
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="from">{`from`}</InputLabel>
            <Input
              id="from"
              type="text"
              multiline
              value={props.campaign.from}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setCampaign({
                  ...props.campaign,
                  from: e.target.value,
                })
              }
            />
          </FormControl>
        </div>
      )}
      {(props.campaign.type === 'MAIL_AWS' || props.campaign.type === 'MAIL_POSTMARK') && (
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="subject">{`subject`}</InputLabel>
            <Input
              id="subject"
              type="text"
              multiline
              value={props.campaign.subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setCampaign({
                  ...props.campaign,
                  subject: e.target.value,
                })
              }
            />
          </FormControl>
        </div>
      )}
      {(props.campaign.type === 'MAIL_AWS' ||
        props.campaign.type === 'MAIL_POSTMARK' ||
        props.campaign.type === 'SLACK' ||
        props.campaign.type === 'SMS_TWILIO') && (
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="description">{`description`}</InputLabel>
            <Input
              id="description"
              type="text"
              multiline
              value={props.campaign.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setCampaign({
                  ...props.campaign,
                  description: e.target.value,
                })
              }
            />
          </FormControl>
        </div>
      )}
      {(props.campaign.type === 'MAIL_AWS' ||
        props.campaign.type === 'MAIL_POSTMARK' ||
        props.campaign.type === 'SLACK' ||
        props.campaign.type === 'SMS_TWILIO') && (
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="bodyEmail">{`body`}</InputLabel>
            <Input
              id="bodyEmail"
              type="text"
              multiline
              value={props.campaign.bodyEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setCampaign({
                  ...props.campaign,
                  bodyEmail: e.target.value,
                })
              }
            />
          </FormControl>
        </div>
      )}

      {/* <div>
        <FormControl>
          <FormControlLabel
            label={`isSuspended`}
            control={
              <Checkbox
                checked={props.campaign.isSuspended}
                onChange={(e) =>
                  props.setCampaign({
                    ...props.campaign,
                    isSuspended: e.target.checked,
                  })
                }
              />
            }
          />
        </FormControl>
      </div> */}
      {/* <div>
        <FormControl>
          <FormControlLabel
            label={`unsubscribe`}
            control={
              <Checkbox
                checked={props.campaign.unsubscribe}
                onChange={(e) =>
                  props.setCampaign({
                    ...props.campaign,
                    unsubscribe: e.target.checked,
                  })
                }
              />
            }
          />
        </FormControl>
      </div> */}
      <div>
        <FormControl>
          <FormControlLabel
            label={`showUnsubscribe`}
            control={
              <Checkbox
                checked={props.campaign.showUnsubscribe}
                onChange={(e) =>
                  props.setCampaign({
                    ...props.campaign,
                    showUnsubscribe: e.target.checked,
                  })
                }
              />
            }
          />
        </FormControl>
      </div>
      <div style={{ height: '50px' }} />
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="campaignVariables">{`Variables`}</InputLabel>
          <Input
            id="campaignVariables"
            type="text"
            multiline
            value={props.campaign.campaignVariables}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setCampaign({
                ...props.campaign,
                campaignVariables: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      {/* 
      {utils.isJsonString(props.campaign.campaignVariables) ? (
        <Icon color="primary">done</Icon>
      ) : (
        <Icon className="secondary">report</Icon>
      )} */}
      <br />
    </>
  )
}

export default CampaignForm
