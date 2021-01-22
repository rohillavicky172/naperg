import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { CATEGORIES_PRODUCTS_QUERY } from '../GraphQL'
import { CategorieProduct } from '../../categorieProduct/CategorieProduct.type'
import { Paper } from '@material-ui/core'

type Props = {
  variables: any
  onClick: (categorie: CategorieProduct) => void
}

const CategorieProductAutocompleteQuery = (props: Props) => {
  const { loading, error, data } = useQuery(CATEGORIES_PRODUCTS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.categorieProductsConnection) return <NotFound />

  return (
    <div className="content">
      {data.categorieProductsConnection.edges.map((categorieProductNode) => (
        <div className="cursor paperOut" key={categorieProductNode.node.id}>
          <Paper className="paperIn" onClick={() => props.onClick(categorieProductNode.node)}>
            {categorieProductNode.node.name}
          </Paper>
        </div>
      ))}
    </div>
  )
}

export default CategorieProductAutocompleteQuery
