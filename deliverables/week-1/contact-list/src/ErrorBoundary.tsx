import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

// TODO: catch render errors from children and show a role="alert" fallback
// containing "Something went wrong". Right now it just renders children (no catching).
export class ErrorBoundary extends Component<Props> {
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // TODO
  }

  render() {
    return this.props.children
  }
}
