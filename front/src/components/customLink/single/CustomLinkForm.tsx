import React from 'react'
import { Input, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core/'
import { CustomLink } from '../CustomLink.type'

type Props = {
  setCustomLink: (customLink: CustomLink) => void
  customLink: CustomLink
}

const CustomLinkForm = (props: Props) => {
  return (
    <>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="type">{`type`}</InputLabel>
          <Select
            id="type"
            value={props.customLink.anchor}
            onChange={(e: any) =>
              props.setCustomLink({
                ...props.customLink,
                anchor: e.target.value,
              })
            }>
            <MenuItem value={'SUPPORT'}>{`SUPPORT`}</MenuItem>
            <MenuItem value={'PRIVACY_POLICY'}>{`PRIVACY_POLICY`}</MenuItem>
            <MenuItem value={'DOCUMENTATION'}>{`DOCUMENTATION`}</MenuItem>
            <MenuItem value={'TERMS_OF_SERVICE'}>{`TERMS_OF_SERVICE`}</MenuItem>
            <MenuItem value={'TERMS_AND_CONDITIONS'}>{`TERMS_AND_CONDITIONS`}</MenuItem>
            <MenuItem value={'PRICING'}>{`PRICING`}</MenuItem>
            <MenuItem value={'FAQ'}>{`FAQ`}</MenuItem>
            <MenuItem value={'BLOG'}>{`BLOG`}</MenuItem>
            <MenuItem value={'CONTACT'}>{`CONTACT`}</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="link">{`link`}</InputLabel>
          <Input
            id="link"
            type="text"
            multiline
            value={props.customLink.link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setCustomLink({
                ...props.customLink,
                link: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
    </>
  )
}

export default CustomLinkForm
