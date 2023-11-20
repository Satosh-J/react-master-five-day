// UsersTable.tsx

import { FC } from "react";
import UserRow from "./UserRow";

interface UsersTableProps {
  users: User[]
}


const UsersTable: FC<UsersTableProps> = ({ users }) => {

  const handleDelete = (id: ID) => {
    console.log('Delete: ', id)
  }

  const handleEdit = (id: ID) => {
    console.log('Edit: ', id)
  }
  return (
    <div>
      <h1>Users</h1>
      <p>This component illustrates the utilization of component props in the React</p>
      <table
      >
        <thead>
          <tr>
            <td>No</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td colSpan={2}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={() => handleEdit(user.id)}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;