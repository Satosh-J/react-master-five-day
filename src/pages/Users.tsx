import { useState } from 'react'
import UserProfile from "../components/UserProfile"
import UsersTable from "../components/UsersTable"

const users = [
  {
    "id": 18,
    "first_name": "Cherlyn",
    "last_name": "Kleingrub",
    "email": "ckleingrubh@nps.gov",
    "phone": "915-736-0167",
  },
  {
    "id": 19,
    "first_name": "Stan",
    "last_name": "Aasaf",
    "email": "saasafi@gnu.org",
    "phone": "903-560-9509",
  },
  {
    "id": 20,
    "first_name": "Penelope",
    "last_name": "Raggitt",
    "email": "praggittj@mayoclinic.com",
    "phone": "563-943-2235",
  }
]

function UsersPage() {

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
  }

  return (
    <>
      <UsersTable
        users={users}
        onUserSelect={handleUserSelect}
      />
      {
        selectedUser &&
        <UserProfile
          user={selectedUser}
        />
      }
    </>
  )
}

export default UsersPage
