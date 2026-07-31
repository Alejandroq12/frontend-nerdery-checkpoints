import { fetchUsers, User } from "./api"
import { Component, Suspense, use, useState, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}
interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Error loading user data: ${error}`, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

let cached: Promise<User[]> | null = null

function getUsers(): Promise<User[]> {
  if (cached === null) cached = fetchUsers()
  return cached
}


function Users(): ReactNode {
  const users = use(getUsers())

  return (
    <>
      {users.map(user => {
        return <div key={user.id}>
                 <p>{user.name}</p>
                </div>
      })}
    </>
  )
}

export function UsersView() {
  const [attempt, setAttempt] = useState(0)

  function handleClick() {
    setAttempt(prevValue => prevValue + 1)
    cached = null
  }

  const fallback = (<div role="alert">
                      <p>Something went wrong</p>
                      <button onClick={handleClick}>Try again</button>
                   </div>)
  return (
    <ErrorBoundary key={attempt} fallback={fallback}>
      <Suspense fallback={<p>Loading…</p>}>
        <Users/>
      </Suspense>
    </ErrorBoundary>
  )
}
