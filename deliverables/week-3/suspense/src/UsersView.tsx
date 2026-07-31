import { fetchUsers, User } from "./api"
import { Component, Suspense, use, useState, type ErrorInfo, type ReactNode } from "react"
import styles from "./UsersView.module.css"

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
    <ul className={styles.list}>
      {users.map(user => {
        return <li className={styles.item} key={user.id}>
                 <p className={styles.name}>{user.name}</p>
                </li>
      })}
    </ul>
  )
}

export function UsersView() {
  const [attempt, setAttempt] = useState(0)

  function handleClick() {
    setAttempt(prevValue => prevValue + 1)
    cached = null
  }

  const fallback = (<div className={styles.alert} role="alert">
                      <p className={styles.alertText}>Something went wrong</p>
                      <button className={styles.retry} onClick={handleClick}>Try again</button>
                   </div>)
  return (
    <div className={styles.view}>
      <ErrorBoundary key={attempt} fallback={fallback}>
        <Suspense fallback={<p className={styles.loading}>Loading…</p>}>
          <Users/>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
