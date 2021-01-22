export interface History {
  replace: (path: string) => void
  push: (path: string) => void
  goBack: () => void
}
