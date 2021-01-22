import React from 'react'

import { AppContext } from '../AppContext'
import { Context } from '../Context.type'

import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const MUTATION = gql`
  mutation CreateTrackingLink($data: TrackingLinkCreateInput!) {
    createTrackingLink(data: $data) {
      id
    }
  }
`

interface Props {
  origin: string
  productId: string
  link: string
  children: any
}

const TrackingLink = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const [createTrackingLink] = useMutation(MUTATION)

  return (
    <>
      <a
        itemProp="sameAs"
        rel="noopener noreferrer"
        target="_blank"
        href={props.link}
        onClick={() => {
          createTrackingLink({
            variables: {
              data: {
                link: props.link,
                origin: props.origin,
                product: {
                  connect: {
                    id: props.productId,
                  },
                },
                companie: {
                  connect: {
                    id: context.userRoleCompanie.companie.id,
                  },
                },
              },
            },
          })
        }}>
        {props.children}
      </a>
    </>
  )
}

export default TrackingLink
