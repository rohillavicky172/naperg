export interface Query {
  query: string
  variables: object
}
export interface Client {
  resetStore: () => void
  query: (query: Query) => any
}
