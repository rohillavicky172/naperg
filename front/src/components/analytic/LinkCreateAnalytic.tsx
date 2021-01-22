import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// import { useLocation } from 'react-router-dom'

export const MUTATION = gql`
  mutation CreateAnalytic($data: AnalyticCreateInput!) {
    createAnalytic(data: $data) {
      id
    }
  }
`

interface Props {
  productId: string

  urlTo: string

  children: any
}

const LinkCreateAnalytic = (props: Props) => {
  // const location = useLocation()
  const { context }: { context: Context } = React.useContext(AppContext)

  const [createAnalytic] = useMutation(MUTATION)

  return (
    <a
      itemProp="sameAs"
      rel="noopener noreferrer"
      target="_blank"
      href={props.urlTo}
      onClick={() => {
        createAnalytic({
          variables: {
            data: {
              productId: props.productId,
              url: window.location.href,
              origin: window.location.origin,
              urlTo: props.urlTo,
              companieId: context.userRoleCompanie.companie.id,
              type: 'CLICK_EXTERNE',
            },
          },
        })
      }}>
      {props.children}
    </a>
  )
}

export default LinkCreateAnalytic
