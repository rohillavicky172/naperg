import * as React from 'react'
import { AppContext } from './AppContext'

export function withContext(Component: React.ComponentType<any>) {
  return function ContextComponent(props: any) {
    return <AppContext.Consumer>{contexts => <Component {...props} {...contexts} />}</AppContext.Consumer>
  }
}
