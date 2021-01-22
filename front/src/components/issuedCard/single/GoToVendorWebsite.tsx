import React from 'react'
// import Paper from '@material-ui/core/Paper'
// import Grid from '@material-ui/core/Grid'
import { useMutation } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { IssuedCard } from '../IssuedCard.type'
// import ImageTemplate from '../../nav/ImageTemplate'
import { CREATE_LOG_MUTATION } from '../../log/GraphQL'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

type Props = {
  issuedCard: IssuedCard
}

const GoToVendorWebsite = (props: Props) => {
  const [createLog] = useMutation(CREATE_LOG_MUTATION)
  const { context }: { context: Context } = React.useContext(AppContext)

  if (!props.issuedCard.initProduct) return null
  if (!props.issuedCard.initProduct.sellerLink) return null

  return (
    <>
      {/* <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={1} className="marginAuto">
            <ImageTemplate format="verySmall" nameFile={props.issuedCard.initProduct.nameFile} />
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            <h3>{props.issuedCard.initProduct.name}</h3>
          </Grid>
          <Grid item xs={12} sm={6} className="marginAuto"> */}
      <a target="_blank" rel="noopener noreferrer" href={props.issuedCard.initProduct.sellerLink}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            createLog({
              variables: {
                data: {
                  testMode: context.testMode,
                  date: new Date(),
                  user: { connect: { id: context.me.id } },
                  companie: { connect: { id: context.userRoleCompanie.companie.id } },
                  issuedCard: { connect: { id: props.issuedCard.id } },
                  product: props.issuedCard.initProduct ? { connect: { id: props.issuedCard.initProduct.id } } : undefined,
                  event: 'GoToVendorWebsite',
                  message: `
                          GoToVendorWebsite_issuedCard |
                          frontEnd |
                          link clicked: ${props.issuedCard.initProduct ? props.issuedCard.initProduct.sellerLink : ''} | 
                          current url: ${window.location.href}
                          `,
                },
              },
            })
          }>
          Go to Vendor's Website
        </Button>
      </a>
      {/* </Grid>
        </Grid>
      </Paper>
    </div> */}
    </>
  )
}

export default GoToVendorWebsite
