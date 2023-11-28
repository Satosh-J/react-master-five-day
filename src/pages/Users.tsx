import UserProfile from "../components/UserProfile"
import UsersTable from "../components/UsersTable"
import { UserProvider } from '../UserContext'

function UsersPage() {

  return (
    <UserProvider>
      <UsersTable />
      <UserProfile />
    </UserProvider>
  )
}

export default UsersPage
